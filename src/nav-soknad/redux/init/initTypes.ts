import { REST_STATUS } from "../../types";

export enum InitActionTypeKeys {
	INIT = "init/INIT",
	START = "init/START",
	OK = "init/OK",
	FEILET = "init/FEILET",
	SET_VIS_SAMTYKKE_INFO = "init/SET_VIS_SAMTYKKE_INFO",
	LAGRE_FORNAVN_PA_STORE = "init/LAGRE_FORNAVN_PA_STORE",
	TILGANG_OK = "init/TILGANG_OK",
    MILJOVARIABLER_OK = "init/MILJOVARIABLER_OK",
    LEDETEKSTER_OK = "init/LEDETEKSTER_OK",
    FORNAVN_OK = "init/FORNAVN_OK"
}

export type InitActionTypes
	= StartAction
	| FerdigAction
	| FeiletAction
	| VisSamtykkeInfoAction
	| LagreFornavnPaStoreAction
	| TilgangOk
    | MiljovariablerOk
    | LedeteksterOk
    | FornavnOk

interface StartAction {
	type: InitActionTypeKeys.START;
}

interface FerdigAction {
	type: InitActionTypeKeys.OK;
}

interface FeiletAction {
	type: InitActionTypeKeys.FEILET;
}

interface VisSamtykkeInfoAction {
	type: InitActionTypeKeys.SET_VIS_SAMTYKKE_INFO;
	visSamtykkeInfo: boolean;
}

interface LagreFornavnPaStoreAction {
	type: InitActionTypeKeys.LAGRE_FORNAVN_PA_STORE;
	fornavn: string;
}

export interface InitState {
	restStatus: REST_STATUS;
	visSamtykkeInfo: boolean;
	fornavn: string | undefined;
	restStatusTilgang: REST_STATUS;
	restStatusMiljovariabler: REST_STATUS;
	restStatusLedetekster: REST_STATUS;
	restStatusFornavn: REST_STATUS;
}

export interface TilgangOk {
	type: InitActionTypeKeys.TILGANG_OK;
}

export interface MiljovariablerOk {
    type: InitActionTypeKeys.MILJOVARIABLER_OK;
}

export interface LedeteksterOk {
    type: InitActionTypeKeys.LEDETEKSTER_OK;
}

export interface FornavnOk {
    type: InitActionTypeKeys.FORNAVN_OK;
}