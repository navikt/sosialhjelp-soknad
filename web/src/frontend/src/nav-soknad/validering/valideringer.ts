import { ValideringActionKey } from "./types";

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
	if (
		typeof value !== "string" ||
		value.length < 11 ||
		value.length > 13 ||
		value.length === 12 ||
		(value.length === 11 && !/^[0-9]{11}$/i.test(value)) ||
		(value.length === 13 && !/^[. 0-9]{13}$/i.test(value))
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
