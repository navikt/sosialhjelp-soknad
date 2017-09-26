import { InjectedIntl } from "react-intl";
import {
	CheckboxFaktumTekst,
	SporsmalFaktumTekst,
	InputFaktumTekst,
	Faktum
} from "../types";

import { getIntlTextOrKey, getIntlInfoTekst, getIntlText } from "./intlUtils";
import { finnFaktum } from "../redux/faktaUtils";

export const radioCheckKeys = (key: string) => ({
	faktum: `${key}`,
	sporsmal: `${key}.sporsmal`,
	hjelpetekst: `${key}.hjelpetekst`
});

export const inputKeys = (key: string) => ({
	faktum: `${key}`,
	sporsmal: `${key}.sporsmal`,
	pattern: `${key}.pattern`,
	hoyretekst: `${key}.hoyretekst`,
	venstretekst: `${key}.venstretekst`
});

export function faktumIsSelected(value: string) {
	return value === "true";
}

export function getFaktumSporsmalTekst(
	intl: InjectedIntl,
	key: string
): SporsmalFaktumTekst {
	return {
		sporsmal: getIntlTextOrKey(intl, `${key}.sporsmal`),
		infotekst: getIntlInfoTekst(intl, `${key}.infotekst`),
		hjelpetekst: getIntlInfoTekst(intl, `${key}.hjelpetekst`)
	};
}
export function getFaktumCheckboksTekst(
	intl: InjectedIntl,
	key: string
): CheckboxFaktumTekst {
	return {
		label: getIntlTextOrKey(intl, key),
		infotekst: getIntlInfoTekst(intl, `${key}.infotekst`),
		hjelpetekst: getIntlInfoTekst(intl, `${key}.hjelpetekst`)
	};
}

export function getRadioFaktumTekst(
	intl: InjectedIntl,
	key: string,
	value: string,
	property?: string
): CheckboxFaktumTekst {
	return getFaktumCheckboksTekst(
		intl,
		`${key}${getPropertyKey(property)}.${value}`
	);
}

export function getInputFaktumTekst(
	intl: InjectedIntl,
	key: string,
	property?: string
): InputFaktumTekst {
	const propertyKey = getPropertyKey(property);
	return {
		label: getIntlTextOrKey(intl, `${key}${propertyKey}.label`),
		sporsmal: getIntlTextOrKey(intl, `${key}${propertyKey}.sporsmal`),
		infotekst: getIntlInfoTekst(intl, `${key}${propertyKey}.infotekst`),
		hjelpetekst: getIntlInfoTekst(intl, `${key}${propertyKey}.hjelpetekst`),
		pattern: getIntlText(intl, `${key}${propertyKey}.pattern`)
	};
}

function getPropertyKey(property?: string) {
	return property === undefined ? "" : `.${property}`;
}
export function getFaktumVerdi(fakta: Faktum[], key: string): string {
	const faktum = finnFaktum(key, fakta);
	return faktum.value;
}

export function getPropertyVerdi(
	fakta: any,
	key: string,
	property: string,
	faktumId?: number
) {
	const faktum = finnFaktum(key, fakta, faktumId);
	return faktum.properties[property];
}
