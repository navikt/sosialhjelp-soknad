import {FileObject} from "@navikt/ds-react";
import {useEffect} from "react";
import FileUploadItem from "./FileUploadItem.tsx";
import {useFileUpload} from "./useFileUpload.ts";

interface Props {
    file: FileObject;
    contextId: string;
    soknadId: string;
    kategori: string;
    /** True once the server has confirmed this file (it appears in documentState). Hide the optimistic row then. */
    confirmed: boolean;
}

/**
 * Renders an optimistic "PENDING" row for a single file while its upload mutation is in flight.
 * Once the server confirms the upload via the SSE channel (confirmed=true), this component renders nothing
 * and the real FileUploadItem from documentState takes over.
 */
const PendingFileUpload = ({file, contextId, soknadId, kategori, confirmed}: Props) => {
    const {mutate, isPending} = useFileUpload(contextId, soknadId, kategori);

    useEffect(() => {
        mutate(file);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (confirmed || !isPending) return null;

    return (
        <FileUploadItem
            key={`optimistic-${file.file.name}`}
            uploadId={`optimistic-${file.file.name}`}
            originalFilename={file.file.name}
            size={file.file.size}
            status="PENDING"
        />
    );
};

export default PendingFileUpload;
