import {init, track, setTransport} from "@amplitude/analytics-browser";

export const initAmplitude = () => {
    init("default", undefined, {
        serverUrl: "https://amplitude.nav.no/collect-auto",
        ingestionMetadata: {
            sourceName: window.location.toString(),
        },
    });
};

window.addEventListener("pagehide", () => {
    setTransport("beacon");
});

export const logAmplitudeEvent = async (eventName: string, eventData?: Record<string, unknown>) => {
    track(eventName, eventData);
};
