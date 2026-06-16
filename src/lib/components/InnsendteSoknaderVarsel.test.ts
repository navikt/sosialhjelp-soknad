import {describe, expect, it} from "vitest";
import {formatInnsendingTillattFra, isInnsendingBlocked} from "./InnsendteSoknaderVarsel";

describe("formatInnsendingTillattFra", () => {
    it("formats ISO datetime to dd.MM.yyyy 'kl.' HH:mm", () => {
        expect(formatInnsendingTillattFra("2026-04-24T12:00:00")).toBe("24.04.2026 kl. 12:00");
    });

    it("returns original value for invalid datetime", () => {
        expect(formatInnsendingTillattFra("invalid-date")).toBe("invalid-date");
    });
});

describe("isInnsendingBlocked", () => {
    it("returns false when antall is undefined", () => {
        expect(isInnsendingBlocked(undefined)).toBe(false);
    });

    it("returns false when antall is below 10", () => {
        expect(isInnsendingBlocked(9)).toBe(false);
    });

    it("returns true when antall is 10 or more", () => {
        expect(isInnsendingBlocked(10)).toBe(true);
        expect(isInnsendingBlocked(11)).toBe(true);
    });
});
