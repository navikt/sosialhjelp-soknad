import { InjectedIntl } from "react-intl";
import { CheckboxFaktumTekst, Infotekst, InputFaktumTekst, SporsmalFaktumTekst } from "./faktumTextTypes";
import { finnFaktum } from "./redux/faktaUtils";
import { Faktum } from "./redux/faktaTypes";

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

export function boolToString(flag: boolean) {
	return flag ? "true" : "false";
}

export function intlHasKey(intl: InjectedIntl, key: string) {
	return intl.messages[key] !== undefined;
}

export function getIntlText(intl: InjectedIntl, key?: string) {
	if (!key) {
		return undefined;
	}
	return intlHasKey(intl, key)
		? intl.formatHTMLMessage({id: key})
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
	return tittel || tekst ? {tittel, tekst} : undefined;
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
	return getFaktumCheckboksTekst(intl, `${key}${getPropertyKey(property)}.${value}`);
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
	return property === undefined ? ""  : `.${property}`;
}
export function getFaktumVerdi(fakta: Faktum[], key: string): string {
	const faktum = finnFaktum(key, fakta);
	return faktum.value;
}

export function getPropertyVerdi(fakta: any, key: string, property: string, faktumId?: number) {
	const faktum = finnFaktum(key, fakta, faktumId);
	return faktum.properties[property];
}
