import { mod11Kontroll, konverterFdatoTilDato } from "./valideringFuncUtils";
import {ValideringsfeilType} from "../redux/valideringActionTypes";

export function pakrevd(value: string): ValideringsfeilType {
	return typeof value === "string" && value.length > 0
		? undefined
		: ValideringsfeilType.PAKREVD;
}

export function minLengde(value: string, min: number): ValideringsfeilType {
	return typeof value === "string" && value.length >= min
		? undefined
		: ValideringsfeilType.MIN_LENGDE;
}

export function maksLengde(value: string, max: number): ValideringsfeilType {
	if (typeof value !== "string") {
		return undefined;
	}
	return typeof value === "string" && value.length <= max
		? undefined
		: ValideringsfeilType.MAX_LENGDE;
}

export function getMaksLengdeFunc(max: number) {
	return (value: string): ValideringsfeilType => maksLengde(value, max);
}

export function erTall(
	value: string,
	kunHeltall?: boolean
): ValideringsfeilType {
	const reg = kunHeltall ? /^[0-9]*$/i : /^[0-9,\.]*$/i;
	return value && reg.test(value) ? undefined : ValideringsfeilType.ER_TALL;
}

export function erTelefonnummer(value: string): ValideringsfeilType {
	if (
		typeof value !== "string" ||
		value.length < 8 ||
		value.length > 8 ||
		(value.length === 8 && !/^[0-9]{8}$/i.test(value))
	) {
		return ValideringsfeilType.ER_TELEFONNUMMER;
	}
	return undefined;
}

export function erKontonummer(value: string): ValideringsfeilType {
	if (!value || typeof value !== "string") {
		return ValideringsfeilType.ER_KONTONUMMER;
	}
	const kontonummer = value.replace(/\.|\ /g, "");
	if (
		kontonummer.length !== 11 ||
		!(
			parseInt(kontonummer.charAt(kontonummer.length - 1), 10) ===
			mod11Kontroll(kontonummer)
		)
	) {
		return ValideringsfeilType.ER_KONTONUMMER;
	}
	return undefined;
}

/** Validerer ddmmåååå - fødselsdato i fødselsnummeret */
export function fdato(dato: string): ValideringsfeilType {
	if (!dato || typeof dato !== "string" || !dato.match(/[0-9]{8}/)) {
		return ValideringsfeilType.ER_FDATO;
	}
	const d = konverterFdatoTilDato(dato);
	if (!d) {
		return ValideringsfeilType.ER_FDATO;
	} else if (d.getTime() > new Date().getTime()) {
		return ValideringsfeilType.ER_FDATO_ETTER_IDAG;
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
