import * as validering from "./valideringer";
import {ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";

describe("test av valideringsfunksjoner", () => {
    it("skal validere påkrevd", () => {
        expect(validering.pakrevd("")).toBe(ValideringsFeilKode.PAKREVD);
        expect(validering.pakrevd(" ")).toBeUndefined();
        expect(validering.pakrevd("123")).toBeUndefined();
        expect(validering.pakrevd("123")).toBeUndefined();
    });
    it("skal validere minimumslengde", () => {
        expect(validering.minLengde("2", 2)).toBe(ValideringsFeilKode.MIN_LENGDE);
        expect(validering.minLengde("22", 2)).toBeUndefined();
        expect(validering.minLengde("223", 2)).toBeUndefined();
    });
    it("skal validere maksLengde", () => {
        // expect(validering.maksLengde(null, 2)).toBe(ValideringKey.MAX_LENGDE);
        expect(validering.maksLengde("223", 2)).toBe(ValideringsFeilKode.MAX_LENGDE);
        expect(validering.maksLengde("22", 2)).toBeUndefined();
        expect(validering.maksLengde("3", 2)).toBeUndefined();
    });
    it("skal validere erTall", () => {
        expect(validering.erTall("a1")).toBe(ValideringsFeilKode.ER_TALL);
        expect(validering.erTall("1")).toBeUndefined();
        expect(validering.erTall("121324")).toBeUndefined();
    });
    describe("kontonummer", () => {
        it("skal ikke kunne være mindre enn 11 tegn", () => {
            expect(validering.erKontonummer("null")).toBe(ValideringsFeilKode.ER_KONTONUMMER);
            expect(validering.erKontonummer("1234567890")).toBe(ValideringsFeilKode.ER_KONTONUMMER);
        });
        it("Skal ikke være over 13 tegn", () => {
            expect(validering.erKontonummer("12331212340")).toBeUndefined();
            expect(validering.erKontonummer("123312123455")).toBe(ValideringsFeilKode.ER_KONTONUMMER);
        });
        it("skal kun inneholde gyldige tegn", () => {
            expect(validering.erKontonummer("1233.12.12340")).toBeUndefined();
            expect(validering.erKontonummer("1233 12 12340")).toBeUndefined();
            expect(validering.erKontonummer("1234 12,12345")).toBe(ValideringsFeilKode.ER_KONTONUMMER);
        });
    });
    describe("telefonnummer", () => {
        it("skal ikke være under 8 tegn", () => {
            expect(validering.erTelefonnummer("12345678")).toBeUndefined();
            expect(validering.erTelefonnummer("123 45 678")).toBe(ValideringsFeilKode.ER_TELEFONNUMMER);
            expect(validering.erTelefonnummer("+47 123 45 678")).toBe(ValideringsFeilKode.ER_TELEFONNUMMER);
            expect(validering.erTelefonnummer("+47 123 45 678")).toBe(ValideringsFeilKode.ER_TELEFONNUMMER);
            expect(validering.erTelefonnummer("91852967")).toBeUndefined();
            expect(validering.erTelefonnummer("91852967")).toBeUndefined();
            expect(validering.erTelefonnummer("+47 123 45 678")).toBe(ValideringsFeilKode.ER_TELEFONNUMMER);
        });
    });
});
