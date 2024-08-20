import {DigisosLanguageKey} from "../../i18n";

export type SkjemaStegType = "skjema" | "oppsummering";

export interface SkjemaSteg {
    id: number;
    type: SkjemaStegType;
}

export interface SkjemaConfig {
    steg: Record<DigisosSkjemaStegKey, SkjemaSteg>;
    tittelId: DigisosLanguageKey;
    skjemanavn: string;
}

export type DigisosSkjemaStegKey =
    | "kontakt"
    | "arbeidbolk"
    | "familiebolk"
    | "begrunnelsebolk"
    | "bosituasjonbolk"
    | "inntektbolk"
    | "utgifterbolk"
    | "opplysningerbolk"
    | "oppsummering";

export const digisosSkjemaConfig: SkjemaConfig = {
    tittelId: "applikasjon.sidetittel.stringValue",
    skjemanavn: "digisos",
    steg: {
        kontakt: {
            id: 1,
            type: "skjema",
        },
        begrunnelsebolk: {
            id: 2,
            type: "skjema",
        },
        arbeidbolk: {
            id: 3,
            type: "skjema",
        },
        familiebolk: {
            id: 4,
            type: "skjema",
        },
        bosituasjonbolk: {
            id: 5,
            type: "skjema",
        },
        inntektbolk: {
            id: 6,
            type: "skjema",
        },
        utgifterbolk: {
            id: 7,
            type: "skjema",
        },
        opplysningerbolk: {
            id: 8,
            type: "skjema",
        },
        oppsummering: {
            id: 9,
            type: "oppsummering",
        },
    },
};
