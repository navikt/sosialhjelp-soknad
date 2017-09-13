import * as validate from "./valideringer";

describe("test av valideringsfunksjoner", () => {
	it("skal validere påkrevd", () => {
		expect(validate.pakrevd(undefined)).toBeFalsy();
		expect(validate.pakrevd(null)).toBeFalsy();
		expect(validate.pakrevd("")).toBeFalsy();
		expect(validate.pakrevd(" ")).toBeTruthy();
		expect(validate.pakrevd("123")).toBeTruthy();
		expect(validate.pakrevd("123")).toBeTruthy();
	});
	it("skal validere minimumslengde", () => {
		expect(validate.minLengde(null, 2)).toBeFalsy();
		expect(validate.minLengde("2", 2)).toBeFalsy();
		expect(validate.minLengde("22", 2)).toBeTruthy();
		expect(validate.minLengde("223", 2)).toBeTruthy();
	});
	it("skal validere maksLengde", () => {
		expect(validate.maksLengde(null, 2)).toBeFalsy();
		expect(validate.maksLengde("223", 2)).toBeFalsy();
		expect(validate.maksLengde("22", 2)).toBeTruthy();
		expect(validate.maksLengde("3", 2)).toBeTruthy();
	});
	it("skal validere erTall", () => {
		expect(validate.erTall(null)).toBeFalsy();
		expect(validate.erTall(undefined)).toBeFalsy();
		expect(validate.erTall("a1")).toBeFalsy();
		expect(validate.erTall("1")).toBeTruthy();
	});
	describe("kontonummer", () => {
		it("skal ikke kunne være mindre enn 11 tegn", () => {
			expect(validate.erKontonummer(null)).toBeFalsy();
			expect(validate.erKontonummer("null")).toBeFalsy();
			expect(validate.erKontonummer("1234567890")).toBeFalsy();
		});
		it("Skal ikke være over 13 tegn", () => {
			expect(validate.erKontonummer("12331212345")).toBeTruthy();
			expect(validate.erKontonummer("123312123455")).toBeFalsy();
		});
		it("skal kun inneholde gyldige tegn", () => {
			expect(validate.erKontonummer("1234.12.12345")).toBeTruthy();
			expect(validate.erKontonummer("1234 12 12345")).toBeTruthy();
			expect(validate.erKontonummer("1234 12,12345")).toBeFalsy();
		});
	});
	describe("telefonnummer", () => {
		it("skal ikke være under 89 tegn", () => {
			expect(validate.erTelefonnummer(null)).toBeFalsy();
			expect(validate.erTelefonnummer("1234567")).toBeFalsy();
			expect(validate.erTelefonnummer("12345678")).toBeTruthy();
			expect(validate.erTelefonnummer("123 45 678")).toBeTruthy();
			expect(validate.erTelefonnummer("+47 123 45 678")).toBeTruthy();
		});
	});
});
