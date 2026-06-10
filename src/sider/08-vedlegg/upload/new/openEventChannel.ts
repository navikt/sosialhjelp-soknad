import {logger} from "@navikt/next-logger";
import config from "../../../../lib/config.ts";

export type UploadStatus = "PROCESSING" | "FAILED" | "COMPLETE" | "PENDING";

export type UploadState = {
    originalFilename: string;
    finalFilename?: string;
    id: string;
    // Finished upload mellomlager-id
    filId?: string;
    validations?: ValidationCode[];
    url?: string;
    status: UploadStatus;
    size?: number;
};

export enum ValidationCode {
    FILE_TOO_LARGE = "FILE_TOO_LARGE",
    INVALID_FILENAME = "INVALID_FILENAME",
    POSSIBLY_INFECTED = "POSSIBLY_INFECTED",
    FILETYPE_NOT_SUPPORTED = "FILETYPE_NOT_SUPPORTED",
    ENCRYPTED_PDF = "ENCRYPTED_PDF",
    INVALID_PDF = "INVALID_PDF",
    TOO_MANY_FILES = "TOO_MANY_FILES",
    TOTAL_TOO_LARGE = "TOTAL_TOO_LARGE",
}

export type DocumentState = {
    submissionId?: string;
    error?: string;
    uploads?: UploadState[];
    validations?: ValidationCode[];
};
const isUpdateMessage = (payload: unknown): payload is DocumentState => {
    return typeof payload === "object" && payload !== null && !Object.hasOwn(payload, "heartbeat");
};

const INITIAL_RETRY_DELAY_MS = 1000;
const MAX_RETRY_DELAY_MS = 30000;

const eventstreamUrl = (contextId: string) => `${config.uploadBaseURL}/status/${contextId}` as const;

export const openEventChannel = (contextId: string, onUpdate: (payload: Partial<DocumentState>) => void) => {
    let eventSource: EventSource;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let closed = false;
    let retryDelayMs = INITIAL_RETRY_DELAY_MS;

    const connect = () => {
        eventSource = new EventSource(eventstreamUrl(contextId));

        eventSource.onopen = () => {
            logger.debug(`upload status channel opened`);
            retryDelayMs = INITIAL_RETRY_DELAY_MS;
        };

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data) as DocumentState;
                if (isUpdateMessage(data)) onUpdate(data);
            } catch (e) {
                logger.error(e);
            }
        };

        eventSource.onerror = (event) => {
            logger.debug(`upload status channel error, reconnecting in ${retryDelayMs}ms: ${event}`);
            eventSource.close();
            if (!closed) {
                reconnectTimer = setTimeout(() => {
                    retryDelayMs = Math.min(retryDelayMs * 2, MAX_RETRY_DELAY_MS);
                    connect();
                }, retryDelayMs);
            }
        };
    };

    connect();

    return () => {
        closed = true;
        if (reconnectTimer !== null) clearTimeout(reconnectTimer);
        eventSource.close();
    };
};
