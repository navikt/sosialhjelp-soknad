import {History} from "history";
import {NavEnhet} from "../../skjema/personopplysninger/adresse/AdresseTypes";
import {
    FornavnResponse,
    HarNyligInnsendteSoknaderResponse,
    NedetidResponse,
    PabegynteSoknaderResponse,
    TilgangResponse,
} from "./soknadTypes";

export const enum SoknadActionTypeKeys {
    START_SOKNAD_DONE = "soknad/START_SOKNAD_DONE",
    OPPRETT_SOKNAD = "soknad/OPPRETT_SOKNAD",
    OPPRETT_SOKNAD_FEILET = "soknad/OPPRETT_SOKNAD_FEILET",
    OPPRETT_SOKNAD_OK = "soknad/OPPRETT_SOKNAD_OK",
    HENT_SOKNAD = "soknad/HENT_SOKNAD",
    HENT_SOKNAD_OK = "soknad/HENT_SOKNAD_OK",

    AVBRYT_SOKNAD = "soknad/AVBRYT_SOKNAD",
    FORTSETT_SOKNAD = "soknad/FORTSETT_SOKNAD",
    SEND_SOKNAD_KNAPP_PENDING = "soknad/SEND_SOKNAD_KNAPP_PENDING",
    SEND_SOKNAD = "soknad/SEND_SOKNAD",
    SEND_SOKNAD_OK = "soknad/SEND_SOKNAD_OK",

    GET_ER_SYSTEMDATA_ENDRET = "soknad/GET_ER_SYSTEMDATA_ENDRET",
    SET_ER_SYSTEMDATA_ENDRET = "soknad/SET_ER_SYSTEMDATA_ENDRET",
    OPPDATER_SOKNADSMOTTAKER_STATUS = "soknad/OPPDATER_SOKNADSMOTTAKER_STATUS",

    HENT_SAMTYKKE = "soknad/HENT_SAMTYKKE",
    HENT_SAMTYKKE_OK = "soknad/HENT_SAMTYKKE_OK",
    OPPDATER_SAMTYKKE = "soknad/OPPDATER_SAMTYKKE",

    LAGRE_TILGANG_OG_FORNAVN_PA_STORE = "soknad/LAGRE_RESSURSER_PA_STORE",
    LAGRE_NEDETID_PA_STORE = "soknad/LAGRE_NEDETID_PA_STORE",
    LAGRE_HAR_NYLIG_INNSENDTE_SOKNADER_PA_STORE = "soknad/LAGRE_HAR_NYLIG_INNSENDTE_SOKNADER_PA_STORE",
    LAGRE_PABEGYNTE_SOKNADER_PA_STORE = "soknad/LAGRE_PABEGYNTE_SOKNADER_PA_STORE",

    SET_LINK_VISITED = "soknad/SET_LINK_VISITED",
    VIS_SAMTYKKE_INFO = "soknad/VIS_SAMTYKKE_INFO",
    VIS_LASTE_OPP_VEDLEGG_MODAL = "soknad/VIS_LASTE_OPP_VEDLEGG_MODAL",
    UPDATE_BEHANDLINGSID_PA_STORE = "soknad/UPDATE_BEHANDLINGSID_PA_STORE",
    SHOW_SERVER_FEIL = "soknad/SHOW_SERVER_FEIL",
    SHOW_SENDING_FEILET_PANEL = "soknad/SHOW_SENDING_FEILET_PANEL",
    SHOW_SIDE_IKKE_FUNNET = "soknad/SHOW_SIDE_IKKE_FUNNET",
    VIS_MIDLERTIDIG_DEAKTIVERT_PANEL = "soknad/VIS_MIDLERTIDIG_DEAKTIVERT_PANEL",
    VIS_IKKE_PAKOBLET_PANEL = "soknad/VIS_IKKE_PAKOBLET_PANEL",
    VIS_NEDETID_PANEL = "soknad/VIS_NEDETID_PANEL",
    SET_SEND_SOKNAD_SERVICE_UNAVAILABLE = "soknad/SET_SEND_SOKNAD_SERVICE_UNAVAILABLE",
    RESET_SEND_SOKNAD_SERVICE_UNAVAILABLE = "soknad/RESET_SEND_SOKNAD_SERVICE_UNAVAILABLE",
}

// 24
export type SoknadActionType =
    | StartSoknadDoneAction
    | OpprettSoknadAction
    | OpprettSoknadFeiletAction
    | OpprettSoknadOkAction
    | HentSoknadAction
    | HentSoknaOkAction
    | AvbrytSoknadAction
    | FortsettSoknadAction
    | SendSoknadPendingAction
    | SendSoknadAction
    | SendSoknadOkAction
    | GetErSystemdataEndret
    | SetErSystemdataEndret
    | OppdaterSoknadsmottakerStatus
    | HentSamtykker
    | HentSamtykkerOk
    | OppdaterSamtykke
    | LagreTilgangOgFornavnPaStore
    | LagreNedetidPaStore
    | VisSamtykkeInfo
    | VisLasteOppVedleggModal
    | UpdateBehandlingsIdPaStore
    | ShowServerFeil
    | ShowSendingFeiletPanel
    | ShowSideIkkeFunnet
    | VisMidlertidigDeaktivertPanel
    | VisIkkePakobletPanel
    | VisNedetidPanel
    | SetSendSoknadServiveUnavailable
    | ResetSendSoknadServiceUnavailable
    | LagreHarNyligInnsendteSoknaderPaStore
    | LagrePabegynteSoknaderPaStore;

export interface HentSamtykker {
    type: SoknadActionTypeKeys.HENT_SAMTYKKE;
    behandlingsId: string;
}

export interface HentSamtykkerOk {
    type: SoknadActionTypeKeys.HENT_SAMTYKKE_OK;
    samtykker: Samtykke[];
}

export interface OppdaterSamtykke {
    type: SoknadActionTypeKeys.OPPDATER_SAMTYKKE;
    behandlingsId: string;
    harSamtykket: boolean;
    samtykker: Samtykke[];
    history: History;
}

export interface Samtykke {
    type: string;
    verdi: boolean;
}

export interface LagreTilgangOgFornavnPaStore {
    type: SoknadActionTypeKeys.LAGRE_TILGANG_OG_FORNAVN_PA_STORE;
    tilgangResponse: TilgangResponse;
    fornavnResponse: FornavnResponse;
}

export interface LagreNedetidPaStore {
    type: SoknadActionTypeKeys.LAGRE_NEDETID_PA_STORE;
    nedetidResponse: NedetidResponse;
}

export interface LagreHarNyligInnsendteSoknaderPaStore {
    type: SoknadActionTypeKeys.LAGRE_HAR_NYLIG_INNSENDTE_SOKNADER_PA_STORE;
    harNyligInnsendteSoknaderResponse: HarNyligInnsendteSoknaderResponse;
}

export interface VisSamtykkeInfo {
    type: SoknadActionTypeKeys.VIS_SAMTYKKE_INFO;
    skalVises: boolean;
}

export interface VisLasteOppVedleggModal {
    type: SoknadActionTypeKeys.VIS_LASTE_OPP_VEDLEGG_MODAL;
    skalVises: boolean;
}

export interface OppdaterSoknadsmottakerStatus {
    type: SoknadActionTypeKeys.OPPDATER_SOKNADSMOTTAKER_STATUS;
    valgtSoknadsmottaker: NavEnhet;
}

export interface StartSoknadDoneAction {
    type: SoknadActionTypeKeys.START_SOKNAD_DONE;
}

export interface OpprettSoknadAction {
    type: SoknadActionTypeKeys.OPPRETT_SOKNAD;
}

export interface OpprettSoknadFeiletAction {
    type: SoknadActionTypeKeys.OPPRETT_SOKNAD_FEILET;
}

export interface OpprettSoknadOkAction {
    type: SoknadActionTypeKeys.OPPRETT_SOKNAD_OK;
    behandlingsId: string;
}

export interface HentSoknadAction {
    type: SoknadActionTypeKeys.HENT_SOKNAD;
    behandlingsId: string;
}

export interface HentSoknaOkAction {
    type: SoknadActionTypeKeys.HENT_SOKNAD_OK;
    xsrfCookieReceived: boolean;
    behandlingsId: string;
}

export interface SendSoknadPendingAction {
    type: SoknadActionTypeKeys.SEND_SOKNAD_KNAPP_PENDING;
}

export interface SendSoknadAction {
    type: SoknadActionTypeKeys.SEND_SOKNAD;
    behandlingsId: string;
    history: History;
}

export interface SendSoknadOkAction {
    type: SoknadActionTypeKeys.SEND_SOKNAD_OK;
    behandlingsId: string;
}

export interface AvbrytSoknadAction {
    type: SoknadActionTypeKeys.AVBRYT_SOKNAD;
}

export interface FortsettSoknadAction {
    type: SoknadActionTypeKeys.FORTSETT_SOKNAD;
}

export interface GetErSystemdataEndret {
    type: SoknadActionTypeKeys.GET_ER_SYSTEMDATA_ENDRET;
    behandlingsId: string;
}

export interface SetErSystemdataEndret {
    type: SoknadActionTypeKeys.SET_ER_SYSTEMDATA_ENDRET;
    erSystemdataEndret: boolean;
}

export enum ErSystemdataEndret {
    YES = "YES",
    NO = "NO",
    NOT_ASKED = "NOT_ASKED",
}

export interface ShowServerFeil {
    type: SoknadActionTypeKeys.SHOW_SERVER_FEIL;
    shouldShow: boolean;
}

export interface ShowSendingFeiletPanel {
    type: SoknadActionTypeKeys.SHOW_SENDING_FEILET_PANEL;
    shouldShow: boolean;
}

export interface UpdateBehandlingsIdPaStore {
    type: SoknadActionTypeKeys.UPDATE_BEHANDLINGSID_PA_STORE;
    behandlingsIdFraUrl: string;
}

export interface ShowSideIkkeFunnet {
    type: SoknadActionTypeKeys.SHOW_SIDE_IKKE_FUNNET;
    shouldShow: boolean;
}

export interface VisMidlertidigDeaktivertPanel {
    type: SoknadActionTypeKeys.VIS_MIDLERTIDIG_DEAKTIVERT_PANEL;
    shouldShow: boolean;
}

export interface VisIkkePakobletPanel {
    type: SoknadActionTypeKeys.VIS_IKKE_PAKOBLET_PANEL;
    shouldShow: boolean;
}

export interface VisNedetidPanel {
    type: SoknadActionTypeKeys.VIS_NEDETID_PANEL;
    shouldShow: boolean;
}

export interface SetSendSoknadServiveUnavailable {
    type: SoknadActionTypeKeys.SET_SEND_SOKNAD_SERVICE_UNAVAILABLE;
}

export interface ResetSendSoknadServiceUnavailable {
    type: SoknadActionTypeKeys.RESET_SEND_SOKNAD_SERVICE_UNAVAILABLE;
}

export interface LagrePabegynteSoknaderPaStore {
    type: SoknadActionTypeKeys.LAGRE_PABEGYNTE_SOKNADER_PA_STORE;
    pabegynteSoknader: PabegynteSoknaderResponse[];
}
