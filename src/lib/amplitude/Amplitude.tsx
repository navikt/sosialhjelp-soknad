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
            serverUrl: "https://amplitude.nav.no/collect",
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

export async function logAmplitudeEvent(eventName: string, eventData?: Record<string, unknown>) {
    if (amplitude) {
        const platform = buildLocationString();
        const result = await amplitude.logEvent(eventName, {
            ...eventData,
            skjemaId: "sosialhjelpsoknad",
            platform,
            origin: "sosialhjelpsoknad",
            originVersion: eventData?.originVersion || "unknown",
        }).promise;
        if (result.code !== 200) {
            logger.warn(result, "Got non-200 code from amplitude.logEvent");
        }
    }
}

const buildLocationString = () => {
    const {origin, pathname, hash} = window.location;
    return `${origin}${pathname}${hash}`;
};
