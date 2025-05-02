import {describe, it, expect, vi, beforeEach} from "vitest";
import {phoneNumberParsedOrUndefined} from "./phoneNumberParsedOrUndefined";

vi.mock("@navikt/next-logger", () => ({
    logger: {
        error: vi.fn(),
    },
}));

const {logger} = await import("@navikt/next-logger");

describe("phoneNumberParsedOrUndefined", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns undefined if input is undefined", () => {
        expect(phoneNumberParsedOrUndefined(undefined)).toBeUndefined();
    });

    it("parses valid Norwegian number without country code", () => {
        const result = phoneNumberParsedOrUndefined("41234567");
        expect(result).toBeDefined();
        expect(result?.country).toBe("NO");
        expect(result?.number).toBe("+4741234567");
    });

    it("parses valid Norwegian number with country code", () => {
        const result = phoneNumberParsedOrUndefined("+4741234567");
        expect(result).toBeDefined();
        expect(result?.country).toBe("NO");
        expect(result?.number).toBe("+4741234567");
    });

    it("parses valid non-Norwegian international number", () => {
        const result = phoneNumberParsedOrUndefined("+12127365000"); // PEnnsylvania-6-5000!
        expect(result).toBeDefined();
        expect(result?.country).toBe("US");
        expect(result?.number).toBe("+12127365000");
    });

    it("returns undefined for invalid number", () => {
        const result = phoneNumberParsedOrUndefined("12345");
        expect(result).toBeUndefined();
        expect(logger.error).toHaveBeenCalledWith("attempt to parse invalid phone number, returning undefined");
    });

    it("returns undefined for gibberish input", () => {
        const result = phoneNumberParsedOrUndefined("not-a-phone-number");
        expect(result).toBeUndefined();
        expect(logger.error).toHaveBeenCalled();
    });

    it("returns undefined for empty string", () => {
        const result = phoneNumberParsedOrUndefined("");
        expect(result).toBeUndefined();
        expect(logger.error).not.toHaveBeenCalled(); // early return
    });
});
