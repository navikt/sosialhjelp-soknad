import {IntlShape} from "react-intl";
import {getIntlTextOrKey, getIntlText} from "./intlUtils";

export type SporsmalTekstTyper = "sporsmal" | "infotekst" | "hjelpetekst";

export type SporsmalTekster = Partial<Record<SporsmalTekstTyper, string>>;

export const getFaktumSporsmalTekst = (intl: IntlShape, key: string): SporsmalTekster => ({
    sporsmal: getIntlTextOrKey(intl, `${key}.sporsmal`),
    infotekst: getIntlText(intl, `${key}.infotekst.tekst`),
    hjelpetekst: getIntlText(intl, `${key}.hjelpetekst.tekst`),
});

export type SporsmalInputTekstTyper = "label" | "sporsmal" | "infotekst" | "hjelpetekst" | "pattern";

export type SporsmalInputTekst = Partial<Record<SporsmalInputTekstTyper, string>>;

export const getInputFaktumTekst = (intl: IntlShape, key: string, property?: string): SporsmalInputTekst => ({
    label: getIntlTextOrKey(intl, `${key}.label`),
    sporsmal: getIntlTextOrKey(intl, `${key}.sporsmal`),
    infotekst: getIntlText(intl, `${key}.infotekst.tekst`),
    hjelpetekst: getIntlText(intl, `${key}.hjelpetekst.tekst`),
    pattern: getIntlText(intl, `${key}.pattern`),
});
