import { ValideringActionKey } from "./types";
import { mod11Kontroll } from "./valideringFuncUtils";

export function pakrevd(value: string): ValideringActionKey {
	return typeof value === "string" && value.length > 0
		? undefined
		: ValideringActionKey.PAKREVD;
}

export function minLengde(value: string, min: number): ValideringActionKey {
	return typeof value === "string" && value.length >= min
		? undefined
		: ValideringActionKey.MIN_LENGDE;
}

export function maksLengde(value: string, max: number): ValideringActionKey {
	if (typeof value !== "string") {
		return undefined;
	}
	return typeof value === "string" && value.length <= max
		? undefined
		: ValideringActionKey.MAX_LENGDE;
}

export function getMaksLengdeFunc(max: number) {
	return (value: string): ValideringActionKey => maksLengde(value, max);
}

export function erTall(value: string): ValideringActionKey {
	return value && /^[0-9]*$/i.test(value)
		? undefined
		: ValideringActionKey.ER_TALL;
}

export function erTelefonnummer(value: string): ValideringActionKey {
	if (
		typeof value !== "string" ||
		value.length < 8 ||
		(value.length === 8 && !/^[0-9]{8}$/i.test(value))
	) {
		return ValideringActionKey.ER_TELEFONNUMMER;
	}
	return undefined;
}

export function erKontonummer(value: string): ValideringActionKey {
	const kontonummer = value.replace(/\.|\ /g, "");
	if (
		kontonummer.length !== 11 ||
		!(
			parseInt(kontonummer.charAt(kontonummer.length - 1), 10) ===
			mod11Kontroll(kontonummer)
		)
	) {
		return ValideringActionKey.ER_KONTONUMMER;
	}
	return undefined;
}

export default {
	pakrevd,
	minLengde,
	maksLengde,
	erTall,
	erTelefonnummer,
	erKontonummer
};
