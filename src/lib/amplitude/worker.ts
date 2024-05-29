import {logAmplitudeEvent} from "../utils/amplitude";

type AmplitudePayload = {eventName: string; eventData?: Record<string, unknown>};

onmessage = ({data: {eventData, eventName}}: MessageEvent<AmplitudePayload>) => {
    logAmplitudeEvent(eventName, eventData).then();
};
