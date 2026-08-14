import * as R from "remeda";
import {FileObject} from "@navikt/ds-react";
import {useState} from "react";
import {DokumentasjonDtoType} from "../../../generated/new/model";
import {useDocumentContext} from "./DocumentContext.tsx";
import {uploadFile} from "./tusUpload.ts";
import {UploadStatus} from "./openEventChannel.ts";

const isFolder = (f: FileObject) => f.file.size === 0 && f.file.type === "";

interface UseVedleggUploadParams {
    contextId: string;
    soknadId: string;
    kategori: DokumentasjonDtoType;
}

export const useVedleggUpload = ({contextId, soknadId, kategori}: UseVedleggUploadParams) => {
    const {uploads, validations, dispatch} = useDocumentContext();
    const [filesAdded, setFilesAdded] = useState(0);
    const [folderDropError, setFolderDropError] = useState(false);

    const hasPendingOrProcessing = uploads.some((u) => u.status === "PENDING" || u.status === "PROCESSING");

    const converted = uploads.some(
        (upload) => !!upload.finalFilename && upload.finalFilename !== upload.originalFilename
    );

    const onSelect = (files: FileObject[]) => {
        const [folders, valid] = R.partition(files, (f) => isFolder(f));

        setFolderDropError(folders.length > 0);

        if (valid.length === 0) return;
        setFilesAdded(valid.length);
        setTimeout(() => setFilesAdded(0), 500);

        dispatch({
            type: "ADD_UPLOADS",
            uploads: valid.map((f) => {
                const correlationId = uploadFile(f.file, contextId, soknadId, kategori);
                return {
                    id: correlationId,
                    correlationId,
                    originalFilename: f.file.name,
                    size: f.file.size,
                    status: "PENDING" as UploadStatus,
                };
            }),
        });
    };

    const onRemove = (correlationId: string) => {
        dispatch({type: "REMOVE_UPLOAD", correlationId});
    };

    return {uploads, validations, filesAdded, folderDropError, onSelect, onRemove, hasPendingOrProcessing, converted};
};
