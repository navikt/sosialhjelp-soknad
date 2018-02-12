import { REST_STATUS } from "../../types";

export enum InitActionTypeKeys {
	INIT = "init/INIT",
	START = "init/START",
	OK = "init/OK",
	FEILET = "init/FEILET",
	SET_VIS_SAMTYKKE_INFO = "init/SET_VIS_SAMTYKKE_INFO",
	SET_VIS_SAMTYKKE_MANGLER = "init/SET_VIS_SAMTYKKE_MANGLER",
	BEKREFT_SAMTYKKE = "init/BEKREFT_SAMTYKKE"
}

export type InitActionTypes =
	StartAction
	| FerdigAction
	| FeiletAction
	| VisSamtykkeInfoAction
	| VisSamtykkeManglerAction
	| BekreftSamtykkeAction;

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

interface VisSamtykkeManglerAction {
	type: InitActionTypeKeys.SET_VIS_SAMTYKKE_MANGLER;
	visSamtykkeMangler: boolean;
}

interface BekreftSamtykkeAction {
	type: InitActionTypeKeys.BEKREFT_SAMTYKKE;
}
export interface InitState {
	restStatus: REST_STATUS;
	visSamtykkeInfo: boolean;
	bekreftSamtykkeInfo: boolean;
	visSamtykkeMangler: boolean;
}
