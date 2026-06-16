import {describe, expect, it} from "vitest";
import {getInnsendteSoknaderVarselText, isInnsendingBlocked} from "./InnsendteSoknaderVarsel";

const blockedWithoutDateText = "blocked without date";
const getBlockedWithDateText = (innsendingTillattFra: string) => `blocked before ${innsendingTillattFra}`;

describe("getInnsendteSoknaderVarselText", () => {
    it("returns blocked warning with date when date exists", () => {
        expect(
            getInnsendteSoknaderVarselText("2026-06-13T10:00:00Z", blockedWithoutDateText, getBlockedWithDateText)
        ).toBe("blocked before 2026-06-13T10:00:00Z");
    });

    it("returns fallback blocked warning without date when date does not exist", () => {
        expect(getInnsendteSoknaderVarselText(null, blockedWithoutDateText, getBlockedWithDateText)).toBe(
            blockedWithoutDateText
        );
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
