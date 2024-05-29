import {logAmplitudeEvent} from "@navikt/nav-dekoratoren-moduler";
import {logWarning} from "../utils/loggerUtils";

type AmplitudePayload = {
    eventName: string;
    eventData?: Record<string, unknown>;
};

onmessage = ({data: {eventData, eventName}}: MessageEvent<AmplitudePayload>) => {
    logAmplitudeEvent({
        origin: "sosialhjelpsoknad",
        eventName,
        eventData: {...eventData, skjemaId: "sosialhjelpsoknad"},
    })
        .catch((error) => {
            logWarning(`Kunne ikke logge til Amplitude: ${error}`).then();
        })
        .then();
};
