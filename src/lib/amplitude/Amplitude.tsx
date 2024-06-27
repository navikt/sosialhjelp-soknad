import {logAmplitudeEvent as logAmplitudeMedDekorator} from "@navikt/nav-dekoratoren-moduler";
import {logWarning} from "../log/loggerUtils";

export const logAmplitudeEvent = async (eventName: string, eventData?: Record<string, unknown>) => {
    try {
        await logAmplitudeMedDekorator({
            origin: "sosialhjelpsoknad",
            eventName,
            eventData: {...eventData, skjemaId: "sosialhjelpsoknad"},
        });
    } catch (error) {
        await logWarning(`Kunne ikke logge til Amplitude: ${error}`);
    }
};
