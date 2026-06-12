import {describe, expect, it} from "vitest";
import {getInnsendteSoknaderVarselText, isInnsendingBlocked} from "./InnsendteSoknaderVarselContainer";

describe("getInnsendteSoknaderVarselText", () => {
    it("returns null when antall is undefined", () => {
        expect(getInnsendteSoknaderVarselText(undefined, null)).toBeNull();
    });

    it("returns null when antall is below warning thresholds", () => {
        expect(getInnsendteSoknaderVarselText(8, null)).toBeNull();
    });

    it("returns warning when antall is exactly 9", () => {
        expect(getInnsendteSoknaderVarselText(9, null)).toBe(
            "Du har sendt mange soknader de siste 24 timene. Du kan bare sende 1 soknad til na."
        );
    });

    it("returns blocked warning with date when antall is 10 or more", () => {
        expect(getInnsendteSoknaderVarselText(10, "2026-06-13T10:00:00Z")).toBe(
            "Du har sendt mange soknader de siste 24 timene. Du kan ikke sende ny soknad for 2026-06-13T10:00:00Z."
        );
    });

    it("returns fallback blocked warning without date when antall is 10 or more", () => {
        expect(getInnsendteSoknaderVarselText(12, null)).toBe(
            "Du har sendt mange soknader de siste 24 timene. Du kan ikke sende ny soknad akkurat na."
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
