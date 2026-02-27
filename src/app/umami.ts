import {logAnalyticsEvent} from "@navikt/nav-dekoratoren-moduler";

function sanitizeEventData(data?: Record<string, unknown>): Record<string, unknown> | undefined {
    if (!data) return undefined;

    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
        if (typeof value === "number") {
            sanitized[key] = Number.isInteger(value) ? value.toString() : value.toFixed(0);
        } else {
            sanitized[key] = value;
        }
    }

    return sanitized;
}

export function umamiTrack(eventName: string, data?: Record<string, unknown>) {
    return logAnalyticsEvent({eventName, origin: "sosialhjelp-soknad", eventData: sanitizeEventData(data)});
}
