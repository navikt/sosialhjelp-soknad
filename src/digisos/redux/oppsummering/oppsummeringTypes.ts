import {Steg} from "../../../generated/model";

export enum OppsummeringActionTypeKeys {
    FEILET = "oppsummering/FEILET",
    BEKREFT_OPPSUMMERING = "oppsummering/BEKREFT_OPPSUMMERING",
    SET_VIS_BEKREFT_MANGLER = "oppsummering/SET_VIS_BEKREFT_MANGLER",
    SET_NY_OPPSUMMERING = "oppsummering/SET_NY_OPPSUMMERING",
}

export type OppsummeringActionTypes =
    | BekreftOppsummering
    | HentOppsummeringFeilet
    | SetVisBekreftMangler
    | SetNyOppsummering;

export interface NyOppsummeringResponse {
    steg: Steg[];
}

export interface Question {
    title: string;
    questionType: "SYSTEM" | "FREETEXT" | "RADIO_CHECKBOX" | "DOCUMENTATION";
    systemValues?: {key: string; value: string}[];
    freeText?: string;
    values?: string[];
    files?: {filename: string; url: string}[];
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

export interface SetNyOppsummering {
    type: OppsummeringActionTypeKeys.SET_NY_OPPSUMMERING;
    response: any;
}
