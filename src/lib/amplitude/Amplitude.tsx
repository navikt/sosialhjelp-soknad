import amplitude from "amplitude-js";
import {logger} from "@navikt/next-logger";

const buildPlatformField = () => {
    const {origin, pathname, hash} = window.location;
    return `${origin}${pathname}${hash}`;
};

export const initAmplitude = () => {
    const userProps = {
        skjermbredde: window.screen.width,
        skjermhoyde: window.screen.height,
        vindusbredde: window.innerWidth,
        vindushoyde: window.innerHeight,
    };

    amplitude.getInstance("sosialhjelpsoknad").init("default", "", {
        apiEndpoint: "amplitude.nav.no/collect-auto",
        saveEvents: false,
        includeUtm: true,
        includeReferrer: true,
        transport: "beacon",
        platform: buildPlatformField(),
    });

    amplitude.getInstance("sosialhjelpsoknad").setUserProperties(userProps);
};

export const logAmplitudeEvent = async (eventName: string, eventData?: Record<string, unknown>) => {
    return new Promise((resolve) => {
        amplitude.getInstance("sosialhjelpsoknad").logEvent(
            eventName,
            {
                ...eventData,
                skjemaId: "sosialhjelpsoknad",
                platform: buildPlatformField(),
                origin: "sosialhjelpsoknad",
                originVersion: eventData?.originVersion || "unknown",
            },
            resolve,
            logger.warn
        );
    });
};
