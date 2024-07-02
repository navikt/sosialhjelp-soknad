import {OpplysningInputType} from "../lib/opplysninger";

type DokumentRadStrenger = {label: string};

type ObsoleteInputType =
    | "sum"
    | "bruttolonn"
    | "nettolonn"
    | "betaler"
    | "mottar"
    | "saldo"
    | "sisteregning"
    | "utbetaling"
    | "permnd"
    | "sistemnd"
    | "type"
    | "utgift";

type DokumentasjonRadObsoleteTypes = {[K in ObsoleteInputType]?: DokumentRadStrenger};
type DokumentasjonRadTypes = {[K in OpplysningInputType]?: DokumentRadStrenger};

type DokumentasjonTextFields = {
    sporsmal: string;
    undertekst?: string;
    leggtil?: string;
    slettet?: string;
    dokumentBeskrivelse: string;
    dokumentInfo?: string;
};

export type DokumentasjonAntallRader = "ingen" | "en" | "flere";

export type DokumentasjonTexts = DokumentasjonRadTypes & DokumentasjonRadObsoleteTypes & DokumentasjonTextFields;
