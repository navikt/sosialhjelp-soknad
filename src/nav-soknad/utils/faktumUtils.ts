import { InjectedIntl } from "react-intl";

import { getIntlTextOrKey, getIntlInfoTekst, getIntlHjelpeTekst, getIntlText } from "./intlUtils";

export function getFaktumSporsmalTekst(
	intl: InjectedIntl,
	key: string
): any {
	return {
		sporsmal: getIntlTextOrKey(intl, `${key}.sporsmal`),
		infotekst: getIntlInfoTekst(intl, `${key}.infotekst`),
		hjelpetekst: getIntlHjelpeTekst(intl, `${key}.hjelpetekst`)
	};
}
export function getFaktumCheckboksTekst(
	intl: InjectedIntl,
	key: string
): any {
	return {
		label: getIntlTextOrKey(intl, key),
		infotekst: getIntlInfoTekst(intl, `${key}.infotekst`),
		hjelpetekst: getIntlHjelpeTekst(intl, `${key}.hjelpetekst`)
	};
}

export function getRadioFaktumTekst(
	intl: InjectedIntl,
	key: string,
	value: string,
	property?: string
): any {
	return getFaktumCheckboksTekst(
		intl,
		`${key}${getPropertyKey(property)}.${value}`
	);
}

export function getInputFaktumTekst(
	intl: InjectedIntl,
	key: string,
	property?: string
): any {
	const propertyKey = getPropertyKey(property);
	return {
		label: getIntlTextOrKey(intl, `${key}${propertyKey}.label`),
		sporsmal: getIntlTextOrKey(intl, `${key}${propertyKey}.sporsmal`),
		infotekst: getIntlInfoTekst(intl, `${key}${propertyKey}.infotekst`),
		hjelpetekst: getIntlHjelpeTekst(intl, `${key}${propertyKey}.hjelpetekst`),
		pattern: getIntlText(intl, `${key}${propertyKey}.pattern`)
	};
}

function getPropertyKey(property?: string) {
	return property === undefined ? "" : `.${property}`;
}

