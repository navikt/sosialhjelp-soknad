import * as amplitude from "@amplitude/analytics-browser";
import {logger} from "@navikt/next-logger";

export const initAmplitude = () => {
    if (amplitude) {
        const identify = new amplitude.Identify()
            .set("skjermbredde", window.screen.width)
            .set("skjermhoyde", window.screen.height)
            .set("vindusbredde", window.innerWidth)
            .set("vindushoyde", window.innerHeight);

        amplitude.identify(identify);

        amplitude.init("default", {
            serverUrl: "https://amplitude.nav.no/collect-auto",
            ingestionMetadata: {
                sourceName: buildLocationString(),
            },
            autocapture: {
                attribution: true,
                fileDownloads: false,
                formInteractions: false,
                pageViews: true,
                sessions: true,
                elementInteractions: false,
            },
        });
    }
};

export const logAmplitudeEvent = async (eventName: string, eventData?: Record<string, unknown>) =>
    amplitude
        ? amplitude.logEvent(eventName, {
              ...eventData,
              skjemaId: "sosialhjelpsoknad",
              platform: buildLocationString(),
              origin: "sosialhjelpsoknad",
              originVersion: eventData?.originVersion || "unknown",
          }).promise
        : logger.info("Amplitude not initialized");

const buildLocationString = () => {
    const {origin, pathname, hash} = window.location;
    return `${origin}${pathname}${hash}`;
};
