import {DocumentState} from "./types";
import getLogger from "@log/logger.ts";

const BASE_PATH = "/sosialhjelp/soknad/api/upload-api";

export const eventstreamUrl = (contextId: string): string => `${BASE_PATH}/status/${contextId}`;

/**
 * Opens an SSE connection to the upload service and dispatches state updates.
 * Returns a cleanup function that closes the connection.
 */
export const openEventChannel = (url: string, onUpdate: (payload: Partial<DocumentState>) => void): (() => void) => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data) as Partial<DocumentState> & {heartbeat?: unknown};
            if ("heartbeat" in data) return;
            onUpdate(data);
        } catch (e) {
            getLogger().error(`Failed to parse SSE message: ${e}`);
        }
    };

    eventSource.onerror = () => {
        // EventSource will automatically reconnect on error.
        // The server sends full state on each message, so no state is lost.
    };

    return () => {
        eventSource.close();
    };
};
