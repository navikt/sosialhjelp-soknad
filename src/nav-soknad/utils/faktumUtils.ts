import {IntlShape} from "react-intl";
import {getIntlTextOrKey, getIntlText} from "./intlUtils";

export type SporsmalTekstTyper = "sporsmal" | "infotekst" | "hjelpetekst";

export type SporsmalTekster = Partial<Record<SporsmalTekstTyper, string>>;

export const getFaktumSporsmalTekst = (intl: IntlShape, key: string): SporsmalTekster => ({
    sporsmal: getIntlTextOrKey(intl, `${key}.sporsmal`),
    infotekst: getIntlText(intl, `${key}.infotekst.tekst`),
    hjelpetekst: getIntlText(intl, `${key}.hjelpetekst.tekst`),
});

export function getRadioFaktumTekst(intl: IntlShape, key: string, value: string): string {
    return getIntlTextOrKey(intl, `${key}.${value}`);
}

export function getInputFaktumTekst(intl: IntlShape, key: string, property?: string): any {
    const propertyKey = getPropertyKey(property);
    return {
        label: getIntlTextOrKey(intl, `${key}${propertyKey}.label`),
        sporsmal: getIntlTextOrKey(intl, `${key}${propertyKey}.sporsmal`),
        infotekst: getIntlText(intl, `${key}${propertyKey}.infotekst.tekst`),
        hjelpetekst: getIntlText(intl, `${key}${propertyKey}.hjelpetekst.tekst`),
        pattern: getIntlText(intl, `${key}${propertyKey}.pattern`),
    };
}

function getPropertyKey(property?: string) {
    return property === undefined ? "" : `.${property}`;
}
