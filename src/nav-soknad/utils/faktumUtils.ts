import {IntlShape} from "react-intl";
import {getIntlTextOrKey, getIntlInfoTekst, getIntlHjelpeTekst, getIntlText} from "./intlUtils";

export function getFaktumSporsmalTekst(intl: IntlShape, key: string): any {
    return {
        sporsmal: getIntlTextOrKey(intl, `${key}.sporsmal`),
        infotekst: getIntlInfoTekst(intl, `${key}.infotekst`),
        hjelpetekst: getIntlHjelpeTekst(intl, `${key}.hjelpetekst`),
    };
}

export function getRadioFaktumTekst(intl: IntlShape, key: string, value: string): string {
    return getIntlTextOrKey(intl, `${key}.${value}`);
}

export function getInputFaktumTekst(intl: IntlShape, key: string, property?: string): any {
    const propertyKey = getPropertyKey(property);
    return {
        label: getIntlTextOrKey(intl, `${key}${propertyKey}.label`),
        sporsmal: getIntlTextOrKey(intl, `${key}${propertyKey}.sporsmal`),
        infotekst: getIntlInfoTekst(intl, `${key}${propertyKey}.infotekst`),
        hjelpetekst: getIntlHjelpeTekst(intl, `${key}${propertyKey}.hjelpetekst`),
        pattern: getIntlText(intl, `${key}${propertyKey}.pattern`),
    };
}

function getPropertyKey(property?: string) {
    return property === undefined ? "" : `.${property}`;
}
