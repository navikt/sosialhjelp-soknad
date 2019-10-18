import { IntlShape } from "react-intl";
import { Infotekst } from "../types/faktumTextTypes";

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
): Infotekst | undefined {
	const tittel = getIntlText(intl, `${key}.tittel`);
	const tekst = getIntlText(intl, `${key}.tekst`);
	return tittel || tekst ? { tittel, tekst } : undefined;
}

export function getIntlHjelpeTekst(
	intl: IntlShape,
	key: string
): Infotekst | undefined {
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
