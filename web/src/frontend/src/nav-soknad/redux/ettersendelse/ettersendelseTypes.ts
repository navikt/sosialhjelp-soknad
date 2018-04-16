import { REST_STATUS } from "../../types/restTypes";

export enum EttersendelseActionTypeKeys {
	NY = "ettersendelse/NY",
	NY_OK = "ettersendelse/NY_OK",
	LAST_OPP = "ettersendelse/LAST_OPP",
	LAST_OPP_OK = "ettersendelse/LAST_OPP_OK",
	LAST_OPP_FEILET = "ettersendelse/LAST_OPP_FEILET",
	SEND = "ettersendelse/SEND",
	SEND_PENDING = "ettersendelse/SEND_PENDING",
	SEND_OK = "ettersendelse/SEND_OK",

	NYTT_VEDLEGG = "ettersendelse/NYTT_VEDLEGG",
	OPPDATERT_VEDLEGG = "ettersendelse/OPPDATERT_VEDLEGG",

	SLETT_VEDLEGG = "ettersendelse/SLETT_VEDLEGG",
	SLETT_VEDLEGG_OK = "ettersendelse/SLETT_VEDLEGG_OK",

	LES_ETTERSENDELSES_VEDLEGG = "ettersendelse/LES_ETTERSENDELSES_VEDLEGG",
	LES_ETTERSENDELSES_VEDLEGG_OK = "ettersendelse/LES_ETTERSENDELSES_VEDLEGG_OK",

	VEDLEGG_ALLEREDE_SENDT = "ettersendelse/VEDLEGG_ALLEREDE_SENDT",
	VEDLEGG_ALLEREDE_SENDT_OK = "ettersendelse/VEDLEGG_ALLEREDE_SENDT_OK",
	INIT = "ettersendelse/INIT",
	OTHER_ACTION = "__any_other_action_type__"
}

export interface EttersendteVedleggState {
	data: any[];
	restStatus: REST_STATUS;
	opplastingStatus: REST_STATUS;
}

export interface LagEttersendelseAction {
	type: EttersendelseActionTypeKeys.NY;
	brukerbehandlingId: string;
}

export interface SendEttersendelseAction {
	type: EttersendelseActionTypeKeys.SEND;
	brukerbehandlingId: string;
}

export interface SendEttersendelsePendingAction {
	type: EttersendelseActionTypeKeys.SEND_PENDING;
}

export interface SendEttersendelseOkAction {
	type: EttersendelseActionTypeKeys.SEND_OK;
}

export interface LastOppEttersendtVedleggAction {
	type: EttersendelseActionTypeKeys.LAST_OPP;
	vedleggId: number;
	formData: FormData;
}

export interface SlettEttersendtVedleggAction {
	type: EttersendelseActionTypeKeys.SLETT_VEDLEGG;
	vedleggId: string;
	filId: string;
}

export interface LesEttersendelsesVedleggAction {
	type: EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG;
	brukerbehandlingId: string;
}

export type EttersendelseActionTypes =
	LagEttersendelseAction
	| LagEttersendelseOkAction
	| LastOppEttersendelseAction
	| LastOppEttersendelseOkAction
	| LessEttersendteVedleggAction
	| SlettEttersendtVedleggAction
	| LesEttersendelsesVedleggAction
	| SendEttersendelseAction
	| SendEttersendelsePendingAction
	| SendEttersendelseOkAction
	| OtherAction;

interface LessEttersendteVedleggAction {
	type: EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG_OK;
	vedlegg: any;
}

export interface LastOppEttersendelseAction {
	type: EttersendelseActionTypeKeys.LAST_OPP;
	vedleggId: number;
	formData: FormData;
}

export interface LastOppEttersendelseOkAction {
	type: EttersendelseActionTypeKeys.LAST_OPP_OK;
}

export interface LagEttersendelseOkAction {
	type: EttersendelseActionTypeKeys.NY_OK;
	brukerbehandlingId: string;
}

export interface OtherAction {
	type: EttersendelseActionTypeKeys.OTHER_ACTION;
}

export interface EttersendelseState {
	data: any[];
	restStatus: REST_STATUS;
	opplastingStatus: REST_STATUS;
	brukerbehandlingId: string;
}
