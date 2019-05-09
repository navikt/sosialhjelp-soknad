export enum OppsummeringActionTypeKeys {
    FEILET = "oppsummering/FEILET",
    HENT_OPPSUMMERING = "oppsummering/HENT_OPPSUMMERING",
    SET_OPPSUMMERING = "oppsummering/SET_OPPSUMMERING",
    BEKREFT_OPPSUMMERING = "oppsummering/BEKREFT_OPPSUMMERING",
    SET_VIS_BEKREFT_MANGLER = "oppsummering/SET_VIS_BEKREFT_MANGLER",
    GET_ER_SYSTEMDATA_ENDRET = "oppsummering/GET_ER_SYSTEMDATA_ENDRET",
    SET_ER_SYSTEMDATA_ENDRET = "oppsummering/SET_ER_SYSTEMDATA_ENDRET"
}

export type OppsummeringActionTypes =
    | SetOppsummering
    | BekreftOppsummering
    | HentOppsummering
    | HentOppsummeringFeilet
    | SetVisBekreftMangler
    | GetErSystemdataEndret
    | SetErSystemdataEndret;

export interface OppsummeringBolk {
    tittel: string;
    html: string;
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

export interface GetErSystemdataEndret {
    type: OppsummeringActionTypeKeys.GET_ER_SYSTEMDATA_ENDRET;
}

export interface SetErSystemdataEndret {
    type: OppsummeringActionTypeKeys.SET_ER_SYSTEMDATA_ENDRET;
    erSystemdataEndret: boolean;
}


export const enum ErSystemdataEndret {
    YES = "YES",
    NO = "NO",
    NOT_ASKED = "NOT_ASKED"
}