import * as validering from "./valideringer";
import { ValideringActionKey } from "./types";
import forventAt from "./forventAt";

describe("test av valideringsfunksjoner", () => {
	it("skal validere påkrevd", () => {
		forventAt(validering.pakrevd(undefined)).girFeilmelding(ValideringActionKey.PAKREVD);
		forventAt(validering.pakrevd(null)).girFeilmelding(ValideringActionKey.PAKREVD);
		forventAt(validering.pakrevd("")).girFeilmelding(ValideringActionKey.PAKREVD);
		forventAt(validering.pakrevd(" ")).validerer();
		forventAt(validering.pakrevd("123")).validerer();
		forventAt(validering.pakrevd("123")).validerer();
	});
	it("skal validere minimumslengde", () => {
		forventAt(validering.minLengde(null, 2)).girFeilmelding(ValideringActionKey.MIN_LENGDE);
		forventAt(validering.minLengde("2", 2)).girFeilmelding(ValideringActionKey.MIN_LENGDE);
		forventAt(validering.minLengde("22", 2)).validerer();
		forventAt(validering.minLengde("223", 2)).validerer();
	});
	it("skal validere maksLengde", () => {
		// forventAt(validering.maksLengde(null, 2)).girFeilmelding(ValideringKey.MAX_LENGDE);
		forventAt(validering.maksLengde("223", 2)).girFeilmelding(ValideringActionKey.MAX_LENGDE);
		forventAt(validering.maksLengde("22", 2)).validerer();
		forventAt(validering.maksLengde("3", 2)).validerer();
	});
	it("skal validere erTall", () => {
		forventAt(validering.erTall(null)).girFeilmelding(ValideringActionKey.ER_TALL);
		forventAt(validering.erTall(undefined)).girFeilmelding(ValideringActionKey.ER_TALL);
		forventAt(validering.erTall("a1")).girFeilmelding(ValideringActionKey.ER_TALL);
		forventAt(validering.erTall("1")).validerer();
		forventAt(validering.erTall("121324")).validerer();
	});
	describe("kontonummer", () => {
		it("skal ikke kunne være mindre enn 11 tegn", () => {
			forventAt(validering.erKontonummer(null)).girFeilmelding(
				ValideringActionKey.ER_KONTONUMMER
			);
			forventAt(validering.erKontonummer("null")).girFeilmelding(
				ValideringActionKey.ER_KONTONUMMER
			);
			forventAt(validering.erKontonummer("1234567890")).girFeilmelding(
				ValideringActionKey.ER_KONTONUMMER
			);
		});
		it("Skal ikke være over 13 tegn", () => {
			forventAt(validering.erKontonummer("12331212340")).validerer();
			forventAt(validering.erKontonummer("123312123455")).girFeilmelding(
				ValideringActionKey.ER_KONTONUMMER
			);
		});
		it("skal kun inneholde gyldige tegn", () => {
			forventAt(validering.erKontonummer("1233.12.12340")).validerer();
			forventAt(validering.erKontonummer("1233 12 12340")).validerer();
			forventAt(validering.erKontonummer("1234 12,12345")).girFeilmelding(
				ValideringActionKey.ER_KONTONUMMER
			);
		});
	});
	describe("telefonnummer", () => {
		it("skal ikke være under 8 tegn", () => {
			forventAt(validering.erTelefonnummer(null))
				.girFeilmelding(ValideringActionKey.ER_TELEFONNUMMER);
			forventAt(validering.erTelefonnummer("12345678")).validerer();
			forventAt(validering.erTelefonnummer("123 45 678"))
				.girFeilmelding(ValideringActionKey.ER_TELEFONNUMMER);
			forventAt(validering.erTelefonnummer("+47 123 45 678"))
				.girFeilmelding(ValideringActionKey.ER_TELEFONNUMMER);
			forventAt(validering.erTelefonnummer("+47 123 45 678"))
				.girFeilmelding(ValideringActionKey.ER_TELEFONNUMMER);
			forventAt(validering.erTelefonnummer("91852967")).validerer();
			forventAt(validering.erTelefonnummer("91852967")).validerer();
			forventAt(validering.erTelefonnummer("+47 123 45 678"))
				.girFeilmelding(ValideringActionKey.ER_TELEFONNUMMER);
		});
	});
});
