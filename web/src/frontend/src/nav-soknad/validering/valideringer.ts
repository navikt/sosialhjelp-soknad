import { ValideringKey } from "./types";

export function pakrevd(value: string): ValideringKey {
	return typeof value === "string" && value.length > 0
		? undefined
		: ValideringKey.PAKREVD;
}

export function minLengde(value: string, min: number): ValideringKey {
	return typeof value === "string" && value.length >= min
		? undefined
		: ValideringKey.MIN_LENGDE;
}

export function maksLengde(value: string, max: number): ValideringKey {
	return typeof value === "string" && value.length <= max
		? undefined
		: ValideringKey.MAX_LENGDE;
}

export function getMaksLengdeFunc(max: number) {
	return (value: string): ValideringKey => maksLengde(value, max);
}

export function erTall(value: string): ValideringKey {
	return value && /^[0-9]$/i.test(value) ? undefined : ValideringKey.ER_TALL;
}

export function erTelefonnummer(value: string): ValideringKey {
	if (
		typeof value !== "string" ||
		value.length < 8 ||
		(value.length === 8 && !/^[0-9]{8}$/i.test(value))
	) {
		return ValideringKey.ER_TELEFONNUMMER;
	}
	return undefined;
}

export function erKontonummer(value: string): ValideringKey {
	if (
		typeof value !== "string" ||
		value.length < 11 ||
		value.length > 13 ||
		value.length === 12 ||
		(value.length === 11 && !/^[0-9]{11}$/i.test(value)) ||
		(value.length === 13 && !/^[. 0-9]{13}$/i.test(value))
	) {
		return ValideringKey.ER_KONTONUMMER;
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
