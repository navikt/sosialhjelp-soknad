import { InjectedIntl } from "react-intl";
import { Infotekst } from "../types/faktumTextTypes";

export function intlHasKey(intl: InjectedIntl, key: string) {
	return intl.messages[key] !== undefined;
}

export function getIntlText(intl: InjectedIntl, key?: string) {
	if (!key) {
		return undefined;
	}
	return intlHasKey(intl, key)
		? intl.formatHTMLMessage({ id: key })
		: undefined;
}

export function getIntlTextOrKey(intl: InjectedIntl, key: string): string {
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
