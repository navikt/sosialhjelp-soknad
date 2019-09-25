import {REST_STATUS, Soknad} from "../../../nav-soknad/types";
import {AVBRYT_DESTINASJON, ErSystemdataEndret} from "./soknadActionTypes";
import {NavEnhet} from "../../skjema/personopplysninger/adresse/AdresseTypes";
import {TilgangActionTypeKeys, TilgangSperrekode} from "../tilgang/tilgangTypes";

export interface SoknadState {
    // Visning state
    showLargeSpinner: boolean;
    showServerFeil: boolean;
    showFeilSide: boolean;

    // Authentication / tilgang state
    linkVisited: boolean;
    harTilgang: boolean;
    sperrekode: TilgangSperrekode | undefined;
    status: TilgangActionTypeKeys;

    // Rest state
    restStatus: REST_STATUS;

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
    behandlingsId: string;
    valgtSoknadsmottaker: NavEnhet | undefined;

    // Systemdata state
    erGjenopptattSoknad: boolean;
    skalSjekkeOmSystemdataErEndret: boolean;
    erSystemdataEndret: ErSystemdataEndret;
}

export enum REST_STATUS {
    NOT_ASKED = "NOT_ASKED",
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    REDIRECT = "REDIRECT",
    CLIENT_ERROR = "CLIENT_ERROR",
    SERVER_ERROR = "SERVER_ERROR"
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
