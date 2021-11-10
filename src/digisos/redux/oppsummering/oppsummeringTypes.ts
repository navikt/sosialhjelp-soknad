export enum OppsummeringActionTypeKeys {
    FEILET = "oppsummering/FEILET",
    BEKREFT_OPPSUMMERING = "oppsummering/BEKREFT_OPPSUMMERING",
    SET_VIS_BEKREFT_MANGLER = "oppsummering/SET_VIS_BEKREFT_MANGLER",
    HENT_NY_OPPSUMMERING = "oppsummering/HENT_NY_OPPSUMMERING",
    SET_NY_OPPSUMMERING = "oppsummering/SET_NY_OPPSUMMERING",
}

export type OppsummeringActionTypes =
    | BekreftOppsummering
    | HentOppsummeringFeilet
    | SetVisBekreftMangler
    | HentNyOppsummering
    | SetNyOppsummering;

export interface NyOppsummeringResponse {
    steg: NyOppsummeringBolk[];
}

export interface Question {
    title: string;
    questionType: "SYSTEM" | "FREETEXT" | "RADIO_CHECKBOX" | "DOCUMENTATION";
    systemValues?: {key: string; value: string}[];
    freeText?: string;
    values?: string[];
    files?: {filename: string; url: string}[];
}

export interface Svar {
    value: string;
    type: "TEKST" | "LOCALE_TEKST" | "DATO" | "TIDSPUNKT";
}

export interface Felt {
    label: string;
    labelSvarMap?: Record<string, Svar | undefined>;
    svar: Svar;
    type: "SYSTEMDATA" | "TEKST" | "CHECKBOX" | "SYSTEMDATA_MAP" | "VEDLEGG";
    vedlegg?: {
        filnavn: string;
        uuid?: string;
    }[];
}
export interface NyOppsummeringBolk {
    stegNr: string;
    tittel: string;
    avsnitt: {
        tittel: string;
        sporsmal: {
            tittel?: string;
            erUtfylt: boolean;
            felt?: Felt[];
        }[];
    }[];
}

export interface HentOppsummeringFeilet {
    type: OppsummeringActionTypeKeys.FEILET;
    feilmelding: string;
}

export interface BekreftOppsummering {
    type: OppsummeringActionTypeKeys.BEKREFT_OPPSUMMERING;
}

export interface SetVisBekreftMangler {
    type: OppsummeringActionTypeKeys.SET_VIS_BEKREFT_MANGLER;
    visBekreftMangler: boolean;
}

export interface HentNyOppsummering {
    type: OppsummeringActionTypeKeys.HENT_NY_OPPSUMMERING;
}

export interface SetNyOppsummering {
    type: OppsummeringActionTypeKeys.SET_NY_OPPSUMMERING;
    response: any;
}
