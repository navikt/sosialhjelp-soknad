import {describe, expect, it} from "vitest";
import {formatInnsendingTillattFra, resolveInnsendingBlocked} from "./InnsendteSoknaderVarsel";

describe("formatInnsendingTillattFra", () => {
    it("formats ISO datetime to dd.MM.yyyy 'kl.' HH:mm", () => {
        expect(formatInnsendingTillattFra("2026-04-24T12:00:00")).toBe("24.04.2026 kl. 12:00");
    });

    it("returns original value for invalid datetime", () => {
        expect(formatInnsendingTillattFra("invalid-date")).toBe("invalid-date");
    });
});

describe("resolveInnsendingBlocked", () => {
    it("returns false when antall is undefined", () => {
        expect(resolveInnsendingBlocked(undefined, 10)).toBe(false);
    });

    it("returns false when antall is below maxAntall", () => {
        expect(resolveInnsendingBlocked(9, 10)).toBe(false);
    });

    it("returns true when antall reaches maxAntall", () => {
        expect(resolveInnsendingBlocked(10, 10)).toBe(true);
    });

    it("returns true when antall is above maxAntall", () => {
        expect(resolveInnsendingBlocked(11, 10)).toBe(true);
    });
});
