import { InjectedIntl } from "react-intl";
import {
	CheckboxFaktumTekst,
	SporsmalFaktumTekst,
	InputFaktumTekst
} from "../faktumTextTypes";
import { getIntlTextOrKey, getIntlInfoTekst, getIntlText } from "./intlUtils";

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
	value: string
): CheckboxFaktumTekst {
	return getFaktumCheckboksTekst(intl, `${key}.${value}`);
}

export function getInputFaktumTekst(
	intl: InjectedIntl,
	key: string
): InputFaktumTekst {
	return {
		label: getIntlTextOrKey(intl, `${key}.label`),
		sporsmal: getIntlTextOrKey(intl, `${key}.sporsmal`),
		infotekst: getIntlInfoTekst(intl, `${key}.infotekst`),
		hjelpetekst: getIntlInfoTekst(intl, `${key}.hjelpetekst`),
		pattern: getIntlText(intl, `${key}.pattern`)
	};
}

export function getFaktumVerdi(fakta: any, key: string) {
	for (const faktum of fakta) {
		if (faktum.key === key) {
			return faktum.value;
		}
	}
	return null;
}
