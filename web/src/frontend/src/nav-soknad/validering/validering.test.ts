import * as validate from "./valideringer";
import { ValideringActionKey } from "./types";

describe("test av valideringsfunksjoner", () => {
	it("skal validere påkrevd", () => {
		expect(validate.pakrevd(undefined)).toBe(ValideringActionKey.PAKREVD);
		expect(validate.pakrevd(null)).toBe(ValideringActionKey.PAKREVD);
		expect(validate.pakrevd("")).toBe(ValideringActionKey.PAKREVD);
		expect(validate.pakrevd(" ")).toBeUndefined();
		expect(validate.pakrevd("123")).toBeUndefined();
		expect(validate.pakrevd("123")).toBeUndefined();
	});
	it("skal validere minimumslengde", () => {
		expect(validate.minLengde(null, 2)).toBe(ValideringActionKey.MIN_LENGDE);
		expect(validate.minLengde("2", 2)).toBe(ValideringActionKey.MIN_LENGDE);
		expect(validate.minLengde("22", 2)).toBeUndefined();
		expect(validate.minLengde("223", 2)).toBeUndefined();
	});
	it("skal validere maksLengde", () => {
		// expect(validate.maksLengde(null, 2)).toBe(ValideringKey.MAX_LENGDE);
		expect(validate.maksLengde("223", 2)).toBe(ValideringActionKey.MAX_LENGDE);
		expect(validate.maksLengde("22", 2)).toBeUndefined();
		expect(validate.maksLengde("3", 2)).toBeUndefined();
	});
	it("skal validere erTall", () => {
		expect(validate.erTall(null)).toBe(ValideringActionKey.ER_TALL);
		expect(validate.erTall(undefined)).toBe(ValideringActionKey.ER_TALL);
		expect(validate.erTall("a1")).toBe(ValideringActionKey.ER_TALL);
		expect(validate.erTall("1")).toBeUndefined();
		expect(validate.erTall("121324")).toBeUndefined();
	});
	describe("kontonummer", () => {
		it("skal ikke kunne være mindre enn 11 tegn", () => {
			expect(validate.erKontonummer(null)).toBe(
				ValideringActionKey.ER_KONTONUMMER
			);
			expect(validate.erKontonummer("null")).toBe(
				ValideringActionKey.ER_KONTONUMMER
			);
			expect(validate.erKontonummer("1234567890")).toBe(
				ValideringActionKey.ER_KONTONUMMER
			);
		});
		it("Skal ikke være over 13 tegn", () => {
			expect(validate.erKontonummer("12331212345")).toBeUndefined();
			expect(validate.erKontonummer("123312123455")).toBe(
				ValideringActionKey.ER_KONTONUMMER
			);
		});
		it("skal kun inneholde gyldige tegn", () => {
			expect(validate.erKontonummer("1234.12.12345")).toBeUndefined();
			expect(validate.erKontonummer("1234 12 12345")).toBeUndefined();
			expect(validate.erKontonummer("1234 12,12345")).toBe(
				ValideringActionKey.ER_KONTONUMMER
			);
		});
	});
	describe("telefonnummer", () => {
		it("skal ikke være under 8 tegn", () => {
			expect(validate.erTelefonnummer(null)).toBe(
				ValideringActionKey.ER_TELEFONNUMMER
			);
			expect(validate.erTelefonnummer("1234567")).toBe(
				ValideringActionKey.ER_TELEFONNUMMER
			);
			expect(validate.erTelefonnummer("12345678")).toBeUndefined();
			expect(validate.erTelefonnummer("123 45 678")).toBeUndefined();
			expect(validate.erTelefonnummer("+47 123 45 678")).toBeUndefined();
		});
	});
});
