import {logAnalyticsCustomEvent} from "@navikt/nav-dekoratoren-moduler";

export function umamiTrack(eventName: string, data?: Record<string, unknown>) {
    return logAnalyticsCustomEvent({eventName, origin: "sosialhjelp-soknad", eventData: data});
}
