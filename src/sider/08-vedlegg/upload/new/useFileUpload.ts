import {FileObject} from "@navikt/ds-react";
import {useMutation} from "@tanstack/react-query";
import {logger} from "@navikt/next-logger";
import {Upload} from "tus-js-client";
import digisosConfig from "../../../../lib/config.ts";

export const uploadFile = (file: File, contextId: string, soknadId: string, kategori: string): Promise<void> =>
    new Promise((resolve, reject) => {
        const upload = new Upload(file, {
            endpoint: `${digisosConfig.uploadBaseURL}/tus/files`,
            retryDelays: [0, 1000, 3000, 5000],
            metadata: {
                filename: file.name,
                contextId,
                navEksternRefId: soknadId,
                kategori,
            },
            uploadSize: file.size,
            onSuccess: () => resolve(),
            onError: (error: unknown) => {
                logger.error(`Upload failed: ${error}`);
                reject(error);
            },
        });
        upload.start();
    });

export const useFileUpload = (contextId: string, soknadId: string, kategori: string) =>
    useMutation({
        mutationFn: (file: FileObject) => uploadFile(file.file, contextId, soknadId, kategori),
    });
