import {logger} from "@navikt/next-logger";
import {DocumentState} from "./useDocumentState.ts";
import {UPLOAD_API_BASE} from "./config.ts";

export const eventstreamUrl = (soknadId: string, vedleggType: string) =>
    `${UPLOAD_API_BASE}/status/${soknadId}/${vedleggType}` as const;

const isUpdateMessage = (payload: any): payload is DocumentState => {
    return !Object.hasOwn(payload, "heartbeat");
};

export const openEventChannel = (url: string, onUpdate: (payload: Partial<DocumentState>) => void) => {
    const eventSource = new EventSource(url);

    eventSource.onopen = (event) => {
        logger.info(`upload status channel opened`, event);
    };

    eventSource.onmessage = (event) => {
        logger.info(`upload status channel message`, event);
        try {
            const data = JSON.parse(event.data) as DocumentState;
            if (isUpdateMessage(data)) onUpdate(data);
        } catch (e) {
            console.log(e);
        }
    };

    eventSource.onerror = (event) => {
        logger.warn(`upload status channel error`, event);
    };
    return () => eventSource.close();
};
