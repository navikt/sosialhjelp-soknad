import {AVBRYT_DESTINASJON, ErSystemdataEndret} from "./soknadActionTypes";
import {NavEnhet} from "../../skjema/personopplysninger/adresse/AdresseTypes";

export interface SoknadState {
    // Visning state
    showLargeSpinner: boolean;
    showFeilSide: boolean;
    showSideIkkeFunnet: boolean;
    visSamtykkeInfo: boolean;
    visMidlertidigDeaktivertPanel: boolean;

    // Visning state skjema nivå
    showServerFeil: boolean;

    // Authentication / tilgang state
    linkVisited: boolean;
    harTilgang: boolean;
    sperrekode: TilgangSperrekode | undefined;

    // Rest state
    restStatus: REST_STATUS;

    // Tilgang og fornavn
    tilgang: undefined | TilgangResponse;
    fornavn: undefined | string;

    // Opprettelse, innsending og ettersendelse
    startSoknadPending: boolean;
    sendSoknadPending: boolean;

    // Avbryt state
    avbrytSoknadSjekkAktiv: boolean;
    avbrytDialog: {
        synlig: boolean;
        destinasjon: AVBRYT_DESTINASJON | null | undefined;
    };

    // Soknad state
    behandlingsId: string | undefined;
    valgtSoknadsmottaker: NavEnhet | undefined;

    // Systemdata state
    erGjenopptattSoknad: boolean;
    skalSjekkeOmSystemdataErEndret: boolean;
    erSystemdataEndret: ErSystemdataEndret;
}

export enum REST_STATUS {
    INITIALISERT = "INITIALISERT",
    PENDING = "PENDING",
    OK = "OK",
    REDIRECT = "REDIRECT",
    CLIENT_ERROR = "CLIENT_ERROR",
    SERVER_ERROR = "SERVER_ERROR",
    XSRF = "XSRF",
    LAST_OPP_FIL_FEILET = "LAST_OPP_FIL_FEILET",
    FEILET = "FEILET"
}

export enum REST_FEIL {
    FOR_STOR_FIL = "vedlegg.opplasting.feil.forStor",
    FEIL_FILTPYE = "vedlegg.opplasting.feil.filType",
    KRYPTERT_FIL = "opplasting.feilmelding.pdf.kryptert",
    SIGNERT_FIL = "opplasting.feilmelding.pdf.signert",
}

export enum SkjemaStegType {
    "skjema" = "skjema",
    "ekstrainfo" = "ekstrainfo",
    "oppsummering" = "oppsummering"
}

export interface SkjemaSteg {
    key: string;
    stegnummer: number;
    type: SkjemaStegType;
}

export interface SkjemaConfig {
    steg: SkjemaSteg[];
    tittelId: string;
    skjemanavn: string;
}

export interface OpprettSoknadResponse {
    brukerBehandlingId: string;
}

export interface SendSoknadResponse {
    sendtTil: string;
    id: string;
}

export interface TilgangResponse {
    harTilgang: boolean;
    sperrekode: TilgangSperrekode;
}

export type MiljovariablerResponse = {};

export type LedeteksterResponse = {};

export interface FornavnResponse {
    fornavn: string;
}

export type TilgangSperrekode = "pilot" | "bruker";
