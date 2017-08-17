import { InjectedIntl } from "react-intl";
import { FaktumCheckboksTekst, Infotekst } from "./types";

export function faktumIsSelected(value: string) {
	return value === "true";
}

export function boolToString(flag: boolean) {
	return flag ? "true" : "false";
}

export function getIntlText(intl: InjectedIntl, key?: string) {
	if (!key) {
		return undefined;
	}
	const text = intl.formatMessage({ id: key });
	return text === key ? undefined : text;
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

export function getFaktumCheckboksTekst(
	intl: InjectedIntl,
	key: string
): FaktumCheckboksTekst {
	return {
		label: getIntlTextOrKey(intl, key),
		feilmelding: getIntlTextOrKey(intl, `${key}.feilmelding`),
		infotekst: getIntlInfoTekst(intl, `${key}.infotekst`),
		hjelpetekst: getIntlInfoTekst(intl, `${key}.hjelpetekst`)
	};
}

export function getFaktumRadioTekst(
	intl: InjectedIntl,
	key: string,
	value: string
): FaktumCheckboksTekst {
	const valueKey = `${key}.${value}`;
	const tekster = {
		label: getIntlTextOrKey(intl, valueKey),
		feilmelding: getIntlTextOrKey(intl, `${valueKey}.feilmelding`),
		infotekst: getIntlInfoTekst(intl, `${valueKey}.infotekst`),
		hjelpetekst: getIntlInfoTekst(intl, `${valueKey}.hjelpetekst`)
	};
	return tekster;
}
