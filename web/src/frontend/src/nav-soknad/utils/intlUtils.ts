import { InjectedIntl } from "react-intl";
import { Infotekst } from "../types/faktumTextTypes";

export function intlHasKey(intl: InjectedIntl, key: string) {
	if (!intl.messages) {
		return false;
	}
	return intl.messages[key] !== undefined;
}

export function getIntlText(intl?: InjectedIntl, key?: string) {
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

export function getIntlTextOrKey(intl: InjectedIntl, key: string): string {
	if(typeof intl === "undefined") {
		return key;
	}
	const tekst = getIntlText(intl, key);
	return tekst || key;
}

export function getIntlInfoTekst(
	intl: InjectedIntl,
	key: string
): Infotekst | undefined {
	const tittel = getIntlText(intl, `${key}.tittel`);
	const tekst = getIntlText(intl, `${key}.tekst`);
	return tittel || tekst ? { tittel, tekst } : undefined;
}

export function getIntlHjelpeTekst(
	intl: InjectedIntl,
	key: string
): Infotekst | undefined {
	const tittel = getIkkeTomIntlText(intl, `${key}.tittel`);
	const tekst = getIkkeTomIntlText(intl, `${key}.tekst`);
	return tittel || tekst ? { tittel, tekst } : undefined;
}

function getIkkeTomIntlText(intl: InjectedIntl, key?: string) {
	return intlTextIkkeTom(intl, key)
		? intl.formatHTMLMessage({ id: key })
		: undefined;
}

function intlTextIkkeTom(intl: InjectedIntl, key: string) {
	return intl.messages[key] !== undefined && intl.messages[key] !== "";
}

export const replaceDotWithUnderscore = (verdi: string): string => {
	return verdi.replace(/\./g, "_");
};
