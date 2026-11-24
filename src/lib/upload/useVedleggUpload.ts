import * as R from "remeda";
import {FileObject} from "@navikt/ds-react";
import {useRef, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DokumentasjonDtoType} from "../../generated/model";
import {useDocumentContext} from "./DocumentContext.tsx";
import {uploadFile as tusUploadFile} from "./tusUpload.ts";
import {UploadState, UploadStatus} from "./openEventChannel.ts";
import {uploadFile as syncUploadFile} from "./api/uploadFile.ts";
import {deleteFile} from "./api/deleteFile.ts";

const isFolder = (f: FileObject) => f.file.size === 0 && f.file.type === "";

interface UseVedleggUploadParams {
    contextId: string;
    soknadId: string;
    kategori: DokumentasjonDtoType;
}

const isPlaceholder = (u: UploadState) => !u.filId && !!u.correlationId && u.id === u.correlationId;

type UploadVariables = {correlationId: string; file: File};

const syncUploadKey = (contextId: string) => ["sync-upload", contextId] as const;

export const useVedleggUpload = ({contextId, soknadId, kategori}: UseVedleggUploadParams) => {
    const {uploads, validations, dispatch, mode} = useDocumentContext();
    const queryClient = useQueryClient();
    const [filesAdded, setFilesAdded] = useState(0);
    const [folderDropError, setFolderDropError] = useState(false);
    const mutationKey = syncUploadKey(contextId);
    const cancelled = useRef(new Set<string>());

    const {mutate} = useMutation({
        mutationKey,
        mutationFn: ({correlationId, file}: UploadVariables) =>
            syncUploadFile({file, contextId, soknadId, kategori, correlationId}),
        onSuccess: async (result, {correlationId}) => {
            if (cancelled.current.delete(correlationId)) {
                if (result.kind === "success") await deleteFile(result.upload.id).catch(() => undefined);
                return;
            }
            switch (result.kind) {
                case "success":
                    dispatch({type: "UPLOAD_RESULT", correlationId, upload: result.upload});
                    break;
                case "validation":
                    dispatch({
                        type: "UPLOAD_RESULT",
                        correlationId,
                        upload: {status: "FAILED", validations: result.validations},
                    });
                    break;
                case "retryable":
                    dispatch({type: "UPLOAD_RESULT", correlationId, upload: {status: "RETRYABLE_FAILED"}});
                    break;
                case "forbidden":
                    dispatch({type: "CLEAR"});
                    break;
                case "failed":
                    dispatch({type: "UPLOAD_RESULT", correlationId, upload: {status: "FAILED"}});
                    break;
            }
        },
        onError: (_error, {correlationId}) => {
            if (cancelled.current.delete(correlationId)) return;
            dispatch({type: "UPLOAD_RESULT", correlationId, upload: {status: "RETRYABLE_FAILED"}});
        },
    });

    const hasPendingOrProcessing = uploads.some((u) => u.status === "PENDING" || u.status === "PROCESSING");

    const converted = uploads.some((upload) => upload.converted);

    const onSelect = (files: FileObject[]) => {
        const [folders, valid] = R.partition(files, (f) => isFolder(f));

        setFolderDropError(folders.length > 0);

        if (valid.length === 0) return;
        setFilesAdded(valid.length);
        setTimeout(() => setFilesAdded(0), 500);

        if (mode === "sync") {
            const started = valid.map(({file}) => ({correlationId: crypto.randomUUID(), file}));
            dispatch({
                type: "ADD_UPLOADS",
                uploads: started.map(({correlationId, file}) => ({
                    id: correlationId,
                    correlationId,
                    originalFilename: file.name,
                    size: file.size,
                    converted: false,
                    status: "PENDING" as UploadStatus,
                })),
            });
            started.forEach((variables) => mutate(variables));
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

    const onDelete = async (upload: UploadState): Promise<void> => {
        const correlationId = upload.correlationId;
        if (!correlationId) return;
        if (isPlaceholder(upload)) {
            cancelled.current.add(correlationId);
            dispatch({type: "REMOVE_UPLOAD", correlationId});
            return;
        }
        await deleteFile(upload.id);
        dispatch({type: "REMOVE_UPLOAD", correlationId});
    };

    const retryUpload = (correlationId: string) => {
        const variables = queryClient.getMutationCache().find<unknown, Error, UploadVariables>({
            mutationKey,
            predicate: (m) => (m.state.variables as UploadVariables | undefined)?.correlationId === correlationId,
        })?.state.variables;
        if (!variables) {
            dispatch({type: "UPLOAD_RESULT", correlationId, upload: {status: "FAILED"}});
            return;
        }
        dispatch({type: "UPLOAD_RESULT", correlationId, upload: {status: "PENDING"}});
        mutate(variables);
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
