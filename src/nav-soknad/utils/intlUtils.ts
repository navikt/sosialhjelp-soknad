import { IntlShape } from "react-intl";

export function intlHasKey(intl: IntlShape, key: string) {
	if (!intl.messages) {
		return false;
	}
	return intl.messages[key] !== undefined;
}

export function getIntlText(intl?: IntlShape, key?: string) {
	if (!intl) {
		return key;
	}

	if (!key) {
		return undefined;
	}
	return intlHasKey(intl, key)
		? intl.formatHTMLMessage({ id: key })
		: undefined;
}

export function getIntlTextOrKey(intl: IntlShape, key: string): string {
	if(typeof intl === "undefined") {
		return key;
	}
	const tekst = getIntlText(intl, key);
	return tekst || key;
}

export function getIntlInfoTekst(
	intl: IntlShape,
	key: string
): any | undefined {
	const tittel = getIntlText(intl, `${key}.tittel`);
	const tekst = getIntlText(intl, `${key}.tekst`);
	return tittel || tekst ? { tittel, tekst } : undefined;
}

export function getIntlHjelpeTekst(
	intl: IntlShape,
	key: string
): any | undefined {
	const tittel = getIkkeTomIntlText(intl, `${key}.tittel`);
	const tekst = getIkkeTomIntlText(intl, `${key}.tekst`);
	return tittel || tekst ? { tittel, tekst } : undefined;
}

function getIkkeTomIntlText(intl: IntlShape, key?: string) {
	return intlTextIkkeTom(intl, key ? key : "")
		? intl.formatHTMLMessage({ id: key ? key : "" })
		: undefined;
}

function intlTextIkkeTom(intl: IntlShape, key: string) {
	return intl.messages[key] !== undefined && intl.messages[key] !== "";
}

export const replaceDotWithUnderscore = (verdi: string): string => {
	return verdi.replace(/\./g, "_");
};

// Eksempel: "2019-08-01" => "01. august 2019"
export function formatDato(isoDate: string) {
	const dato: Date = new Date(isoDate);
	const formatter =  new Intl.DateTimeFormat("nb-NO", {day: "numeric", month: "long", year: "numeric"});
	return formatter.format(dato).replace(/([0-9]) /, "$1. ");
}