import {getIntlTextOrKey, getIntlText} from "./intlUtils";
import {TFunction} from "i18next";

export type SporsmalTekster = {
    sporsmal: string;
    infotekst?: string;
    hjelpetekst?: string;
};

export const getFaktumSporsmalTekst = (t: TFunction<"skjema", "skjema">, key: string): SporsmalTekster => ({
    sporsmal: getIntlTextOrKey(t, `${key}.sporsmal`),
    infotekst: getIntlText(t, `${key}.infotekst.tekst`),
    hjelpetekst: getIntlText(t, `${key}.hjelpetekst.tekst`),
});

export type SporsmalInputTekstTyper = "label" | "sporsmal" | "infotekst" | "hjelpetekst" | "pattern";

export type SporsmalInputTekst = Partial<Record<SporsmalInputTekstTyper, string>>;

export const getInputFaktumTekst = (t: TFunction<"skjema", "skjema">, key: string): SporsmalInputTekst => ({
    label: getIntlTextOrKey(t, `${key}.label`),
    sporsmal: getIntlTextOrKey(t, `${key}.sporsmal`),
    infotekst: getIntlText(t, `${key}.infotekst.tekst`),
    hjelpetekst: getIntlText(t, `${key}.hjelpetekst.tekst`),
    pattern: getIntlText(t, `${key}.pattern`),
});
