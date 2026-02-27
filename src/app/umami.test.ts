import {describe, it, expect, vi} from "vitest";
import {umamiTrack} from "./umami";
import * as dekoratorModuler from "@navikt/nav-dekoratoren-moduler";

vi.mock("@navikt/nav-dekoratoren-moduler", () => ({
    logAnalyticsEvent: vi.fn(),
}));

describe("umamiTrack", () => {
    it("should convert number to string", () => {
        const mockLogAnalyticsEvent = vi.mocked(dekoratorModuler.logAnalyticsEvent);

        umamiTrack("Test Event", {steg: 8, isKortSoknad: true});

        expect(mockLogAnalyticsEvent).toHaveBeenCalledWith({
            eventName: "Test Event",
            origin: "sosialhjelp-soknad",
            eventData: {
                steg: "8", // Should be string, not number
                isKortSoknad: true,
            },
        });
    });

    it("should keep strings as strings", () => {
        const mockLogAnalyticsEvent = vi.mocked(dekoratorModuler.logAnalyticsEvent);

        umamiTrack("Test Event", {steg: "4", isKortSoknad: false});

        expect(mockLogAnalyticsEvent).toHaveBeenCalledWith({
            eventName: "Test Event",
            origin: "sosialhjelp-soknad",
            eventData: {
                steg: "4",
                isKortSoknad: false,
            },
        });
    });

    it("should convert decimal numbers to rounded strings without decimals", () => {
        const mockLogAnalyticsEvent = vi.mocked(dekoratorModuler.logAnalyticsEvent);

        umamiTrack("Test Event", {value: 8.5});

        expect(mockLogAnalyticsEvent).toHaveBeenCalledWith({
            eventName: "Test Event",
            origin: "sosialhjelp-soknad",
            eventData: {
                value: "9", // Rounded to nearest integer
            },
        });
    });

    it("should handle undefined data", () => {
        const mockLogAnalyticsEvent = vi.mocked(dekoratorModuler.logAnalyticsEvent);

        umamiTrack("Test Event");

        expect(mockLogAnalyticsEvent).toHaveBeenCalledWith({
            eventName: "Test Event",
            origin: "sosialhjelp-soknad",
            eventData: undefined,
        });
    });

    it("should handle mixed types", () => {
        const mockLogAnalyticsEvent = vi.mocked(dekoratorModuler.logAnalyticsEvent);

        umamiTrack("Test Event", {
            steg: 8,
            isKortSoknad: true,
            soknadId: "abc123",
            count: 42,
        });

        expect(mockLogAnalyticsEvent).toHaveBeenCalledWith({
            eventName: "Test Event",
            origin: "sosialhjelp-soknad",
            eventData: {
                steg: "8",
                isKortSoknad: true,
                soknadId: "abc123",
                count: "42",
            },
        });
    });
});
