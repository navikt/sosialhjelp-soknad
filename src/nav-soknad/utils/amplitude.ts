import amplitude from "amplitude-js";

export const initAmplitude = () => {
    if (amplitude) {
        amplitude.getInstance().init("default", "", {
            apiEndpoint: "amplitude.nav.no/collect-auto",
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
        });
    }
};

export function logAmplitudeEvent(eventName: string, eventData?: Record<string, unknown>): void {
    setTimeout(() => {
        try {
            if (amplitude) {
                amplitude.getInstance().logEvent(eventName, eventData);
            }
        } catch (error) {
            console.error(error);
        }
    });
}

export const createSkjemaEventData = () => ({
    skjemaId: "sosialhjelpsoknad",
    skjemanavn: "Soknad om økonomisk sosialhjelp",
});
