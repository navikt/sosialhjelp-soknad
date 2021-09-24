export enum OppsummeringActionTypeKeys {
    FEILET = "oppsummering/FEILET",
    HENT_OPPSUMMERING = "oppsummering/HENT_OPPSUMMERING",
    SET_OPPSUMMERING = "oppsummering/SET_OPPSUMMERING",
    BEKREFT_OPPSUMMERING = "oppsummering/BEKREFT_OPPSUMMERING",
    SET_VIS_BEKREFT_MANGLER = "oppsummering/SET_VIS_BEKREFT_MANGLER",
    HENT_NY_OPPSUMMERING = "oppsummering/HENT_NY_OPPSUMMERING",
    SET_NY_OPPSUMMERING = "oppsummering/SET_NY_OPPSUMMERING",
}

export type OppsummeringActionTypes =
    | SetOppsummering
    | BekreftOppsummering
    | HentOppsummering
    | HentOppsummeringFeilet
    | SetVisBekreftMangler
    | HentNyOppsummering
    | SetNyOppsummering;

export interface OppsummeringBolk {
    tittel: string;
    html: string;
}

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
export interface NyOppsummeringBolk {
    stegNr: string;
    tittel: string;
    avsnitt: {
        tittel: string;
        sporsmal: {
            tittel: string;
            erUtfylt: boolean;
            felt?: {
                label: string;
                labelSvarMap?: any;
                svar: string;
                type: "SYSTEMDATA" | "TEKST" | "CHECKBOX" | "SYSTEMDATA_MAP" | "VEDLEGG";
                vedlegg?: {
                    filnavn: string;
                    uuid?: string;
                }[];
            }[];
        }[];
    }[];
}
export interface Oppsummering {
    signatur: string;
    bolker: OppsummeringBolk[];
}

export interface HentOppsummering {
    type: OppsummeringActionTypeKeys.HENT_OPPSUMMERING;
}

export interface HentOppsummeringFeilet {
    type: OppsummeringActionTypeKeys.FEILET;
    feilmelding: string;
}

export interface SetOppsummering {
    type: OppsummeringActionTypeKeys.SET_OPPSUMMERING;
    oppsummering: string;
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
