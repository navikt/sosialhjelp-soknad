export const enum SoknadActionTypeKeys {
    START_SOKNAD_DONE = "soknad/START_SOKNAD_DONE",
    OPPRETT_SOKNAD = "soknad/OPPRETT_SOKNAD",
    OPPRETT_SOKNAD_FEILET = "soknad/OPPRETT_SOKNAD_FEILET",
    OPPRETT_SOKNAD_OK = "soknad/OPPRETT_SOKNAD_OK",
    SET_SOKNAD_PENDING = "soknad/SET_SOKNAD_PENDING",
    HENT_SOKNAD_OK = "soknad/HENT_SOKNAD_OK",

    VIS_AVBRYT_SOKNAD_MODAL = "soknad/AVBRYT_SOKNAD",
    SKJUL_AVBRYT_SOKNAD_MODAL = "soknad/FORTSETT_SOKNAD",
    SEND_SOKNAD_KNAPP_PENDING = "soknad/SEND_SOKNAD_KNAPP_PENDING",
    SEND_SOKNAD = "soknad/SEND_SOKNAD",
    SEND_SOKNAD_OK = "soknad/SEND_SOKNAD_OK",

    GET_ER_SYSTEMDATA_ENDRET = "soknad/GET_ER_SYSTEMDATA_ENDRET",
    SET_ER_SYSTEMDATA_ENDRET = "soknad/SET_ER_SYSTEMDATA_ENDRET",

    HENT_SAMTYKKE = "soknad/HENT_SAMTYKKE",
    HENT_SAMTYKKE_OK = "soknad/HENT_SAMTYKKE_OK",
    OPPDATER_SAMTYKKE = "soknad/OPPDATER_SAMTYKKE",

    VIS_SAMTYKKE_INFO = "soknad/VIS_SAMTYKKE_INFO",
    VIS_LASTE_OPP_VEDLEGG_MODAL = "soknad/VIS_LASTE_OPP_VEDLEGG_MODAL",
    UPDATE_BEHANDLINGSID_PA_STORE = "soknad/UPDATE_BEHANDLINGSID_PA_STORE",
    SHOW_SERVER_FEIL = "soknad/SHOW_SERVER_FEIL",
    SHOW_SENDING_FEILET_PANEL = "soknad/SHOW_SENDING_FEILET_PANEL",
    SHOW_SIDE_IKKE_FUNNET = "soknad/SHOW_SIDE_IKKE_FUNNET",
    VIS_MIDLERTIDIG_DEAKTIVERT_PANEL = "soknad/VIS_MIDLERTIDIG_DEAKTIVERT_PANEL",
    VIS_IKKE_PAKOBLET_PANEL = "soknad/VIS_IKKE_PAKOBLET_PANEL",
    VIS_NEDETID_PANEL = "soknad/VIS_NEDETID_PANEL",
}

// 24
export type SoknadActionType =
    | StartSoknadDoneAction
    | OpprettSoknadAction
    | OpprettSoknadFeiletAction
    | OpprettSoknadOkAction
    | SetSoknadPendingAction
    | HentSoknaOkAction
    | AvbrytSoknadAction
    | FortsettSoknadAction
    | SendSoknadPendingAction
    | SendSoknadAction
    | SendSoknadOkAction
    | GetErSystemdataEndret
    | SetErSystemdataEndret
    | HentSamtykker
    | HentSamtykkerOk
    | OppdaterSamtykke
    | VisSamtykkeInfo
    | VisLasteOppVedleggModal
    | UpdateBehandlingsIdPaStore
    | ShowServerFeil
    | ShowSendingFeiletPanel
    | ShowSideIkkeFunnet
    | VisMidlertidigDeaktivertPanel
    | VisIkkePakobletPanel
    | VisNedetidPanel;

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
}

export interface Samtykke {
    type: string;
    verdi: boolean;
}

export interface VisSamtykkeInfo {
    type: SoknadActionTypeKeys.VIS_SAMTYKKE_INFO;
    skalVises: boolean;
}

export interface VisLasteOppVedleggModal {
    type: SoknadActionTypeKeys.VIS_LASTE_OPP_VEDLEGG_MODAL;
    skalVises: boolean;
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

export interface SetSoknadPendingAction {
    type: SoknadActionTypeKeys.SET_SOKNAD_PENDING;
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
}

export interface SendSoknadOkAction {
    type: SoknadActionTypeKeys.SEND_SOKNAD_OK;
    behandlingsId: string;
}

export interface AvbrytSoknadAction {
    type: SoknadActionTypeKeys.VIS_AVBRYT_SOKNAD_MODAL;
}

export interface FortsettSoknadAction {
    type: SoknadActionTypeKeys.SKJUL_AVBRYT_SOKNAD_MODAL;
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
