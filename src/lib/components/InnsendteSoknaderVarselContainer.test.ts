import {describe, expect, it} from "vitest";
import {getInnsendteSoknaderVarselText, isInnsendingBlocked} from "./InnsendteSoknaderVarselContainer";

const oneLeftText = "one left";
const blockedWithoutDateText = "blocked without date";
const getBlockedWithDateText = (innsendingTillattFra: string) => `blocked before ${innsendingTillattFra}`;

describe("getInnsendteSoknaderVarselText", () => {
    it("returns null when antall is undefined", () => {
        expect(
            getInnsendteSoknaderVarselText(undefined, null, oneLeftText, blockedWithoutDateText, getBlockedWithDateText)
        ).toBeNull();
    });

    it("returns null when antall is below warning thresholds", () => {
        expect(
            getInnsendteSoknaderVarselText(8, null, oneLeftText, blockedWithoutDateText, getBlockedWithDateText)
        ).toBeNull();
    });

    it("returns warning when antall is exactly 9", () => {
        expect(
            getInnsendteSoknaderVarselText(9, null, oneLeftText, blockedWithoutDateText, getBlockedWithDateText)
        ).toBe(oneLeftText);
    });

    it("returns blocked warning with date when antall is 10 or more", () => {
        expect(
            getInnsendteSoknaderVarselText(
                10,
                "2026-06-13T10:00:00Z",
                oneLeftText,
                blockedWithoutDateText,
                getBlockedWithDateText
            )
        ).toBe("blocked before 2026-06-13T10:00:00Z");
    });

    it("returns fallback blocked warning without date when antall is 10 or more", () => {
        expect(
            getInnsendteSoknaderVarselText(12, null, oneLeftText, blockedWithoutDateText, getBlockedWithDateText)
        ).toBe(blockedWithoutDateText);
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
