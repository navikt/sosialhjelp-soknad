import {NavEnhet} from "../../skjema/personopplysninger/adresse/AdresseTypes";
import {FornavnResponse, TilgangResponse} from "./soknadTypes";

export enum SoknadActionTypeKeys {
	START_SOKNAD_OK = "soknad/START_SOKNAD_OK",
	OPPRETT_SOKNAD = "soknad/OPPRETT_SOKNAD",
	OPPRETT_SOKNAD_OK = "soknad/OPPRETT_SOKNAD_OK",
	OPPRETT_SOKNAD_FEILET = "soknad/OPPRETT_SOKNAD_FEILET",
	HENT_SOKNAD = "soknad/HENT_SOKNAD",
	HENT_SOKNAD_OK = "soknad/HENT_SOKNAD_OK",
	HENT_SOKNAD_FEILET = "soknad/HENT_SOKNAD_FEILET",
	SET_SERVER_FEIL = "SET_SERVER_FEIL",
	FEILET = "soknad/FEILET",
	PENDING = "soknad/PENDING",
	OTHER_ACTION = "__any_other_action_type__",
	AVBRYT_SOKNAD = "soknad/AVBRYT_SOKNAD",
	FORTSETT_SOKNAD = "soknad/FORTSETT_SOKNAD",
	SLETT_SOKNAD = "soknad/SLETT_SOKNAD",
	SLETT_SOKNAD_OK = "soknad/SLETT_SOKNAD_OK",
	SLETT_SOKNAD_FEILET = "soknad/SLETT_SOKNAD_FEILET",
	SEND_SOKNAD = "soknad/SEND_SOKNAD",
	SEND_SOKNAD_OK = "soknad/SEND_SOKNAD_OK",
	SEND_SOKNAD_FEILET = "soknad/SEND_SOKNAD_FEILET",
	SETT_AVBRYT_SOKNAD_SJEKK = "navigasjon/SETT_AVBRYT_SOKNAD_SJEKK",
	GET_ER_SYSTEMDATA_ENDRET = "soknad/GET_ER_SYSTEMDATA_ENDRET",
	SET_ER_SYSTEMDATA_ENDRET = "soknad/SET_ER_SYSTEMDATA_ENDRET",
	FINN_OG_OPPDATER_SOKNADSMOTTAKER_STATUS = "soknad/FINN_OG_OPPDATER_SOKNADSMOTTAKER_STATUS",
	OPPDATER_SOKNADSMOTTAKER_STATUS = "soknad/OPPDATER_SOKNADSMOTTAKER_STATUS",

	SJEKK_AUTENTISERING_OG_TILGANG_OG_HENT_RESSURSER = "soknad/SJEKK_AUTENTISERING_OG_TILGANG_OG_HENT_RESSURSER",
	LAGRE_TILGANG_OG_FORNAVN_PA_STORE = "soknad/LAGRE_RESSURSER_PA_STORE",

	SHOW_LARGE_SPINNER = "soknad/SHOW_LARGE_SPINNER",
	SHOW_FEIL_SIDE = "soknad/SHOW_FEIL_SIDE",

	SET_LINK_VISITED = "soknad/SET_LINK_VISITED",
	VIS_SAMTYKKE_INFO = "soknad/VIS_SAMTYKKE_INFO",
	UPDATE_BEHANDLINGSID_PA_STORE = "soknad/UPDATE_BEHANDLINGSID_PA_STORE",

	SHOW_SERVER_FEIL = "soknad/SHOW_SERVER_FEIL",
	SHOW_SIDE_IKKE_FUNNET = "soknad/SHOW_SIDE_IKKE_FUNNET"
}

export type AVBRYT_DESTINASJON = "START" | "MINSIDE";

export type SoknadActionType =
	| SjekkAutentiseringOgTilgangOgHentRessurser
	| LagreTilgangOgFornavnPaStore
	| SetLinkVisited
	| ShowLargeSpinner
	| VisSamtykkeInfo
	| ShowServerFeil
	| ShowSideIkkeFunnet
	| ShowFeilSide


	| StartSoknadOkAction
	| OpprettSoknadAction
	| OpprettSoknadAction
	| OpprettSoknadOkAction
	| OpprettSoknadFeiletAction
	| HentSoknadAction
	| HentSoknaOkAction
	| HentSoknadFeiletAction
	| SendSoknadAction
	| SendSoknadOkAction
	| SendSoknadFeiletAction
	| AvbrytSoknadAction
	| FortsettSoknadAction
	| SetServerFeilAction
	| OtherAction
	| SlettSoknadAction
	| SlettSoknadOkAction
	| SlettSoknadFeiletAction
	| SettAvbrytSoknadSjekk
	| FinnOgOppdaterSoknadsmottakerStatus
	| OppdaterSoknadsmottakerStatus
	| GetErSystemdataEndret
	| SetErSystemdataEndret
	| UpdateBehandlingsIdPaStore


export interface SjekkAutentiseringOgTilgangOgHentRessurser {
	type: SoknadActionTypeKeys.SJEKK_AUTENTISERING_OG_TILGANG_OG_HENT_RESSURSER
}

export interface LagreTilgangOgFornavnPaStore {
	type: SoknadActionTypeKeys.LAGRE_TILGANG_OG_FORNAVN_PA_STORE,
	tilgangResponse: TilgangResponse,
	fornavnResponse: FornavnResponse
}

export interface ShowLargeSpinner {
	type: SoknadActionTypeKeys.SHOW_LARGE_SPINNER,
	show: boolean
}

export interface VisSamtykkeInfo {
	type: SoknadActionTypeKeys.VIS_SAMTYKKE_INFO,
	skalVises: boolean
}


export interface FinnOgOppdaterSoknadsmottakerStatus {
	type: SoknadActionTypeKeys.FINN_OG_OPPDATER_SOKNADSMOTTAKER_STATUS,
	brukerbehandlingId: string
}

export interface OppdaterSoknadsmottakerStatus {
	type: SoknadActionTypeKeys.OPPDATER_SOKNADSMOTTAKER_STATUS,
	valgtSoknadsmottaker: NavEnhet
}

export interface StartSoknadOkAction {
	type: SoknadActionTypeKeys.START_SOKNAD_OK;
}

export interface OpprettSoknadAction {
	type: SoknadActionTypeKeys.OPPRETT_SOKNAD;
}

export interface OpprettSoknadOkAction {
	type: SoknadActionTypeKeys.OPPRETT_SOKNAD_OK;
	behandlingsId: string;
}

export interface OpprettSoknadFeiletAction {
	type: SoknadActionTypeKeys.OPPRETT_SOKNAD_FEILET;
	feilmelding: string;
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

export interface HentSoknadFeiletAction {
	type: SoknadActionTypeKeys.HENT_SOKNAD_FEILET;
	feilmelding: string;
}

export interface SendSoknadAction {
	type: SoknadActionTypeKeys.SEND_SOKNAD;
	behandlingsId: string;
}

export interface SendSoknadOkAction {
	type: SoknadActionTypeKeys.SEND_SOKNAD_OK;
	behandlingsId: string;
}

export interface SendSoknadFeiletAction {
	type: SoknadActionTypeKeys.SEND_SOKNAD_FEILET;
	feilmelding: string;
}

export interface AvbrytSoknadAction {
	type: SoknadActionTypeKeys.AVBRYT_SOKNAD;
	destinasjon?: AVBRYT_DESTINASJON;
}

export interface FortsettSoknadAction {
	type: SoknadActionTypeKeys.FORTSETT_SOKNAD;
}

export interface SlettSoknadAction {
	type: SoknadActionTypeKeys.SLETT_SOKNAD;
	behandlingsId: string;
	destinasjon?: AVBRYT_DESTINASJON;
}

export interface SlettSoknadOkAction {
	type: SoknadActionTypeKeys.SLETT_SOKNAD_OK;
}

export interface SlettSoknadFeiletAction {
	type: SoknadActionTypeKeys.SLETT_SOKNAD_FEILET;
	feilmelding: string;
}

export interface SetServerFeilAction {
	type: SoknadActionTypeKeys.SET_SERVER_FEIL;
	feilmelding: string;
}

export interface OtherAction {
	type: SoknadActionTypeKeys.OTHER_ACTION;
}



export interface SettAvbrytSoknadSjekk {
	type: SoknadActionTypeKeys.SETT_AVBRYT_SOKNAD_SJEKK;
	aktiv: boolean;
}

export interface GetErSystemdataEndret {
	type: SoknadActionTypeKeys.GET_ER_SYSTEMDATA_ENDRET;
	behandlingsId: string
}

export interface SetErSystemdataEndret {
	type: SoknadActionTypeKeys.SET_ER_SYSTEMDATA_ENDRET;
	erSystemdataEndret: boolean;
}

export enum ErSystemdataEndret {
	YES = "YES",
	NO = "NO",
	NOT_ASKED = "NOT_ASKED"
}

export interface SetLinkVisited {
	type: SoknadActionTypeKeys.SET_LINK_VISITED;
}

export interface ShowServerFeil {
	type: SoknadActionTypeKeys.SHOW_SERVER_FEIL;
	shouldShow: boolean
}

export interface UpdateBehandlingsIdPaStore {
	type: SoknadActionTypeKeys.UPDATE_BEHANDLINGSID_PA_STORE;
	behandlingsIdFraUrl: string;
}

export interface ShowSideIkkeFunnet {
	type: SoknadActionTypeKeys.SHOW_SIDE_IKKE_FUNNET;
	shouldShow: boolean;
}

export interface ShowFeilSide {
	type: SoknadActionTypeKeys.SHOW_FEIL_SIDE;
}
