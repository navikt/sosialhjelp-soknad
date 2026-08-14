import {logger} from "@navikt/next-logger";
import {Upload} from "tus-js-client";
import digisosConfig from "../../config.ts";

export const uploadFile = (file: File, contextId: string, soknadId: string, kategori: string): string => {
    const correlationId = crypto.randomUUID();
    const upload = new Upload(file, {
        endpoint: `${digisosConfig.uploadBaseURL}/tus/files`,
        retryDelays: [0, 1000, 3000, 5000],
        metadata: {
            filename: file.name,
            contextId,
            navEksternRefId: soknadId,
            kategori,
            correlationId,
        },
        uploadSize: file.size,
        onError: (error: unknown) => logger.error(`Upload failed: ${error}`),
    });
    upload.start();
    return correlationId;
};
