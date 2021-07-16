import * as validering from "./valideringer";

describe("test av valideringsfunksjoner", () => {
    it("skal validere minimumslengde", () => {
        expect(validering.minLengde("2", 2)).toBe(false);
        expect(validering.minLengde("22", 2)).toBe(true);
        expect(validering.minLengde("223", 2)).toBe(true);
    });
    it("skal validere maksLengde", () => {
        expect(validering.maksLengde("223", 2)).toBe(false);
        expect(validering.maksLengde("22", 2)).toBe(true);
        expect(validering.maksLengde("3", 2)).toBe(true);
    });
    it("skal validere erTall", () => {
        expect(validering.erTall("a1")).toBe(false);
        expect(validering.erTall("1")).toBe(true);
        expect(validering.erTall("121324")).toBe(true);
    });
    describe("kontonummer", () => {
        it("skal ikke kunne være mindre enn 11 tegn", () => {
            expect(validering.erKontonummer("null")).toBe(false);
            expect(validering.erKontonummer("1234567890")).toBe(false);
        });
        it("Skal ikke være over 13 tegn", () => {
            expect(validering.erKontonummer("12331212340")).toBe(true);
            expect(validering.erKontonummer("123312123455")).toBe(false);
        });
        it("skal kun inneholde gyldige tegn", () => {
            expect(validering.erKontonummer("1233.12.12340")).toBe(true);
            expect(validering.erKontonummer("1233 12 12340")).toBe(true);
            expect(validering.erKontonummer("1234 12,12345")).toBe(false);
        });
    });
    describe("telefonnummer", () => {
        it("skal ikke være under 8 tegn", () => {
            expect(validering.erTelefonnummer("12345678")).toBe(true);
            expect(validering.erTelefonnummer("123 45 678")).toBe(false);
            expect(validering.erTelefonnummer("+47 123 45 678")).toBe(false);
            expect(validering.erTelefonnummer("+47 123 45 678")).toBe(false);
            expect(validering.erTelefonnummer("+47 123 45 678")).toBe(false);
        });
    });
    describe("samværsgrad", () => {
        it("skal være mellom 0 og 100", () => {
            expect(validering.erSamvaersgrad(0)).toBe(true);
            expect(validering.erSamvaersgrad(100)).toBe(true);
            expect(validering.erSamvaersgrad(50)).toBe(true);
            expect(validering.erSamvaersgrad(-10)).toBe(false);
            expect(validering.erSamvaersgrad(110)).toBe(false);
        });
        it("ikke valgt samværgrad er gyldig", () => {
            expect(validering.erSamvaersgrad(null)).toBe(true);
        });
    });
});
