import {logAmplitudeEvent as logDekoratoren} from "@navikt/nav-dekoratoren-moduler";

import {logWarning} from "./loggerUtils";

export const logAmplitudeEvent = (eventName: string, eventData?: Record<string, unknown>) => {
    try {
        logDekoratoren({
            origin: "sosialhjelpsoknad",
            eventName,
            eventData: {...eventData, skjemaId: "sosialhjelpsoknad"},
        });
    } catch (error) {
        logWarning(`Kunne ikke logge til Amplitude: ${error}`);
    }
};
