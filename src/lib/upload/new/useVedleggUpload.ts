import * as R from "remeda";
import {FileObject} from "@navikt/ds-react";
import {useCallback, useEffect, useRef, useState} from "react";
import {DokumentasjonDtoType} from "../../../generated/model";
import {useDocumentContext} from "./DocumentContext.tsx";
import {uploadFile as tusUploadFile} from "./tusUpload.ts";
import {UploadState, UploadStatus} from "./openEventChannel.ts";
import {uploadFile as syncUploadFile} from "./api/uploadFile.ts";
import {deleteFile} from "./api/deleteFile.ts";

const isFolder = (f: FileObject) => f.file.size === 0 && f.file.type === "";

export const MAX_CONCURRENT_UPLOADS = 2;

interface UseVedleggUploadParams {
    contextId: string;
    soknadId: string;
    kategori: DokumentasjonDtoType;
}

/** En rad som bare finnes i klienten: ikke lagret hos serveren ennå. */
const isPlaceholder = (u: UploadState) => !u.filId && !!u.correlationId && u.id === u.correlationId;

export const useVedleggUpload = ({contextId, soknadId, kategori}: UseVedleggUploadParams) => {
    const {uploads, validations, dispatch, mode} = useDocumentContext();
    const [filesAdded, setFilesAdded] = useState(0);
    const [folderDropError, setFolderDropError] = useState(false);
    const [activeRequests, setActiveRequests] = useState(0);

    // Filene må leve til opplastingen er vellykket, slik at "Prøv igjen" kan sende samme fil på nytt.
    const filesRef = useRef(new Map<string, File>());
    const queueRef = useRef<string[]>([]);
    const inFlightRef = useRef(new Set<string>());
    const removedInFlightRef = useRef(new Set<string>());
    const paramsRef = useRef({contextId, soknadId, kategori});
    useEffect(() => {
        paramsRef.current = {contextId, soknadId, kategori};
    });

    const placeholderFor = (correlationId: string, status: UploadStatus, extra?: Partial<UploadState>): UploadState => {
        const file = filesRef.current.get(correlationId);
        return {
            id: correlationId,
            correlationId,
            originalFilename: file?.name ?? "",
            size: file?.size,
            converted: false,
            status,
            ...extra,
        };
    };

    const startNextRef = useRef<() => void>(() => undefined);
    const startNext = useCallback(() => startNextRef.current(), []);
    const pump = useCallback(() => {
        while (inFlightRef.current.size < MAX_CONCURRENT_UPLOADS && queueRef.current.length > 0) {
            const correlationId = queueRef.current.shift()!;
            const file = filesRef.current.get(correlationId);
            if (!file) continue;
            inFlightRef.current.add(correlationId);
            setActiveRequests(inFlightRef.current.size);
            const params = paramsRef.current;

            void syncUploadFile({
                file,
                contextId: params.contextId,
                soknadId: params.soknadId,
                kategori: params.kategori,
                correlationId,
            })
                .then(async (result) => {
                    const removed = removedInFlightRef.current.delete(correlationId);
                    if (result.kind === "success") {
                        filesRef.current.delete(correlationId);
                        if (removed) {
                            // Brukeren fjernet raden mens forespørselen pågikk: rydd opp på serveren.
                            await deleteFile(result.upload.id).catch(() => undefined);
                        } else {
                            dispatch({type: "UPLOAD_RESULT", correlationId, upload: result.upload});
                        }
                        return;
                    }
                    if (removed) {
                        filesRef.current.delete(correlationId);
                        return;
                    }
                    if (result.kind === "retryable") {
                        dispatch({
                            type: "UPLOAD_RESULT",
                            correlationId,
                            upload: placeholderFor(correlationId, "RETRYABLE_FAILED"),
                        });
                    } else if (result.kind === "forbidden") {
                        filesRef.current.delete(correlationId);
                        dispatch({type: "CLEAR"});
                    } else {
                        const validations = result.kind === "validation" ? result.validations : undefined;
                        const upload = placeholderFor(correlationId, "FAILED", {validations});
                        filesRef.current.delete(correlationId);
                        dispatch({type: "UPLOAD_RESULT", correlationId, upload});
                    }
                })
                .finally(() => {
                    inFlightRef.current.delete(correlationId);
                    setActiveRequests(inFlightRef.current.size);
                    startNextRef.current();
                });
        }
    }, [dispatch]);
    useEffect(() => {
        startNextRef.current = pump;
    }, [pump]);

    const hasPendingOrProcessing =
        uploads.some((u) => u.status === "PENDING" || u.status === "PROCESSING") || activeRequests > 0;

    const converted = uploads.some((upload) => upload.converted);

    const onSelect = (files: FileObject[]) => {
        const [folders, valid] = R.partition(files, (f) => isFolder(f));

        setFolderDropError(folders.length > 0);

        if (valid.length === 0) return;
        setFilesAdded(valid.length);
        setTimeout(() => setFilesAdded(0), 500);

        if (mode === "sync") {
            const added = valid.map((f) => {
                const correlationId = crypto.randomUUID();
                filesRef.current.set(correlationId, f.file);
                queueRef.current.push(correlationId);
                return placeholderFor(correlationId, "PENDING");
            });
            dispatch({type: "ADD_UPLOADS", uploads: added});
            startNext();
            return;
        }

        dispatch({
            type: "ADD_UPLOADS",
            uploads: valid.map((f) => {
                const correlationId = tusUploadFile(f.file, contextId, soknadId, kategori);
                return {
                    id: correlationId,
                    correlationId,
                    originalFilename: f.file.name,
                    size: f.file.size,
                    converted: false,
                    status: "PENDING" as UploadStatus,
                };
            }),
        });
    };

    const onRemove = (correlationId: string) => {
        dispatch({type: "REMOVE_UPLOAD", correlationId});
    };

    /**
     * Sync-modus: sletter en rad. Lagrede rader slettes på serveren først (kaster ved feil, raden beholdes).
     * Plassholdere har ingenting på serveren; pågår forespørselen, ryddes den opp når den er ferdig.
     */
    const onDelete = async (upload: UploadState): Promise<void> => {
        const correlationId = upload.correlationId;
        if (!correlationId) return; // Legacy-dokumenter slettes ikke via sync-API
        if (isPlaceholder(upload)) {
            queueRef.current = queueRef.current.filter((id) => id !== correlationId);
            if (inFlightRef.current.has(correlationId)) removedInFlightRef.current.add(correlationId);
            else filesRef.current.delete(correlationId);
            dispatch({type: "REMOVE_UPLOAD", correlationId});
            return;
        }
        await deleteFile(upload.id);
        dispatch({type: "REMOVE_UPLOAD", correlationId});
    };

    const retryUpload = (correlationId: string) => {
        if (!filesRef.current.has(correlationId)) return;
        if (inFlightRef.current.has(correlationId) || queueRef.current.includes(correlationId)) return;
        dispatch({type: "UPLOAD_RESULT", correlationId, upload: placeholderFor(correlationId, "PENDING")});
        queueRef.current.push(correlationId);
        startNext();
    };

    return {
        uploads,
        validations,
        filesAdded,
        folderDropError,
        onSelect,
        onRemove,
        onDelete,
        retryUpload,
        mode,
        hasPendingOrProcessing,
        converted,
    };
};
