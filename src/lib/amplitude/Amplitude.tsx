// import {logAmplitudeEvent as logAmplitudeMedDekorator} from "@navikt/nav-dekoratoren-moduler";
// import {logWarning} from "../log/loggerUtils";

export const logAmplitudeEvent = async (_eventName: string, _eventData?: Record<string, unknown>) => {
    return;
    // logAmplitudeMedDekorator({
    //     origin: "sosialhjelpsoknad",
    //     eventName,
    //     eventData: {...eventData, skjemaId: "sosialhjelpsoknad"},
    // }).catch((error) => logWarning(`Kunne ikke logge til Amplitude: ${error}`));
};
