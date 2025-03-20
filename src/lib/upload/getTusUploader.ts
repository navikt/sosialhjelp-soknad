import {VedleggFrontendTypeMinusUferdig} from "../../locales/nb/dokumentasjon.ts";
import {logger} from "@navikt/next-logger";
import {Upload, UploadOptions} from "tus-js-client";
import {TUSD_ENDPOINT} from "./config.ts";

type TusUploaderOptions = {
    soknadId: string;
    vedleggType: VedleggFrontendTypeMinusUferdig;
    file: File;
    onProgress: (bytesUploaded: number, bytesTotal: number) => void;
    /**
     *  tus-js-client calls this when it has received a URL from the server, meaning uploader.url is guaranteed to be set.
     */
    onUploadUrlAvailable: () => void;
    onSuccess: () => void;
};

export const getTusUploader = ({
    soknadId,
    vedleggType,
    file,
    onProgress,
    onSuccess,
    onUploadUrlAvailable,
}: TusUploaderOptions) => {
    const uploadOptions = (file: File): UploadOptions => ({
        endpoint: TUSD_ENDPOINT,
        retryDelays: [0, 1000, 3000, 5000],
        chunkSize: 1000000,
        metadata: {filename: file.name, soknadId, vedleggType},
        uploadSize: file.size,
        onError: (error: any) => logger.error("Upload failed", error),
        // uploadId kan deriveres fra URL, så vi bruker denne som en callback for en primærnøkkel
        onUploadUrlAvailable,
        onProgress,
        onSuccess,
    });

    return new Upload(file, uploadOptions(file));
};
