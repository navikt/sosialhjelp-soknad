import {Upload, UploadOptions} from "tus-js-client";
import {FileObject} from "@navikt/ds-react";
import getLogger from "@log/logger.ts";

const UPLOAD_API_BASE = "/sosialhjelp/soknad/api/upload-api";

export const getTusUploader = ({
    contextId,
    file,
    soknadId,
    onProgress,
    onSuccess,
    onUploadUrlAvailable,
}: {
    contextId: string;
    file: FileObject;
    soknadId: string;
} & Pick<UploadOptions, "onUploadUrlAvailable" | "onProgress" | "onSuccess">): Upload => {
    const uploadOptions = (rawFile: File): UploadOptions => ({
        endpoint: `${UPLOAD_API_BASE}/tus/files`,
        retryDelays: [0, 1000, 3000, 5000],
        metadata: {
            filename: rawFile.name,
            contextId,
            navEksternRefId: soknadId,
        },
        uploadSize: rawFile.size,
        onError: (error: unknown) => getLogger().error(`Upload failed: ${error}`),
        onUploadUrlAvailable,
        onProgress,
        onSuccess,
    });

    return new Upload(file.file, uploadOptions(file.file));
};
