import {describe, expect, it} from "vitest";
import {
    formatInnsendingTillattFra,
    getInnsendteSoknaderVarselText,
    isInnsendingBlocked,
} from "./InnsendteSoknaderVarsel";

const blockedWithoutDateText = "blocked without date";
const getBlockedWithDateText = (innsendingTillattFra: string) => `blocked before ${innsendingTillattFra}`;

describe("getInnsendteSoknaderVarselText", () => {
    it("returns blocked warning with date when date exists", () => {
        expect(
            getInnsendteSoknaderVarselText("2026-06-17T08:30:00", blockedWithoutDateText, getBlockedWithDateText)
        ).toBe("blocked before 08:30:00 17-06-2026");
    });

    it("returns fallback blocked warning without date when date does not exist", () => {
        expect(getInnsendteSoknaderVarselText(null, blockedWithoutDateText, getBlockedWithDateText)).toBe(
            blockedWithoutDateText
        );
    });
});

describe("formatInnsendingTillattFra", () => {
    it("formats ISO datetime to HH:mm:ss dd-MM-yyyy", () => {
        expect(formatInnsendingTillattFra("2026-06-17T08:30:00")).toBe("08:30:00 17-06-2026");
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
