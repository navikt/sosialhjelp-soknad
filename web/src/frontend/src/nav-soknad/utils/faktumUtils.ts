import { InjectedIntl } from "react-intl";
import { erDev } from "../utils";
import {
	CheckboxFaktumTekst,
	SporsmalFaktumTekst,
	InputFaktumTekst,
	Faktum,
	FaktumValueType
} from "../types";

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
	if (!faktum) {
		throw Error(`Kunne ikke finne faktum: [${key}]`);
	}
	return faktum.value;
}

export function eksistererFaktum(fakta: Faktum[], key: string): boolean {
	return finnFaktum(key, fakta) != null;
}

export function getPropertyVerdi(
	fakta: any,
	key: string,
	property: string,
	faktumId?: number
) {
	const faktum = finnFaktum(key, fakta, faktumId);
	return faktum ? faktum.properties[property] : "";
}

export function oppdaterFaktumMedProperties(
	faktum: Faktum,
	properties: object,
): Faktum {
	return { ...faktum, properties: { ...properties } };
}

export function oppdaterFaktumMedVerdier(
	faktum: Faktum,
	verdi: FaktumValueType,
	property?: string
): Faktum {
	let nyttFaktum = { ...faktum };
	if (property) {
		nyttFaktum = {
			...faktum,
			properties: { ...faktum.properties, [property]: verdi }
		};
	} else {
		nyttFaktum.value = verdi;
	}
	return nyttFaktum;
}

export function finnFaktum(
	faktumKey: string,
	fakta: Faktum[],
	faktumId?: number
): Faktum {
	if (faktumId) {
		return finnFaktumMedId(faktumKey, fakta, faktumId);
	}
	const faktum = fakta.filter((f: Faktum) => {
		return f.key === faktumKey;
	});
	if (faktum.length === 0) {
		if (erDev()) {
			// tslint:disable-next-line
			console.log("Faktum ikke funnet: " + faktumKey);
		}
	}
	return faktum[0];
}

export function getProgresjonFaktum(fakta: Faktum[]) {
	return finnFaktum("progresjon", fakta);
}

export function finnFaktumMedId(
	faktumKey: string,
	fakta: Faktum[],
	faktumId: number
): Faktum {
	return fakta.filter((f: Faktum) => {
		return f.faktumId === faktumId;
	})[0];
}

export function finnFakta(faktumKey: string, fakta: Faktum[]): Faktum[] {
	return fakta.filter(faktum => faktum.key === faktumKey);
}
