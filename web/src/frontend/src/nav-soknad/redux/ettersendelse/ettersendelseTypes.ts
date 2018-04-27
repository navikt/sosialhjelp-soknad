import { REST_STATUS } from "../../types/restTypes";

export enum EttersendelseActionTypeKeys {
	NY = "ettersendelse/NY",
	NY_OK = "ettersendelse/NY_OK",
	LAST_OPP = "ettersendelse/LAST_OPP",
	LAST_OPP_PENDING = "ettersendelse/LAST_OPP_PENDING",
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

	LES_ETTERSENDELSER = "ettersendelse/LES_ETTERSENDELSER",
	LES_ETTERSENDELSER_OK = "ettersendelse/LES_ETTERSENDELSER_OK",

	ETTERSEND_PENDING = "ettersendelse/ETTERSEND_PENDING",
	ETTERSEND_OK = "ettersendelse/ETTERSEND_OK",

	INIT = "ettersendelse/INIT",
	OTHER_ACTION = "__any_other_action_type__"
}

export enum FeilKode {
	FIL_FOR_STOR = "vedlegg.opplasting.feil.forStor"
}

export interface EttersendteVedleggState {
	data: any[];
	restStatus: REST_STATUS;
	opplastingStatus: REST_STATUS;
}

export interface OpprettEttersendelseAction {
	type: EttersendelseActionTypeKeys.NY;
	brukerbehandlingId: string;
}

export interface SendEttersendelseAction {
	type: EttersendelseActionTypeKeys.SEND;
	brukerbehandlingId: string;
}

export interface SendEttersendelsePendingAction {
	type: EttersendelseActionTypeKeys.ETTERSEND_PENDING;
}

export interface SendEttersendelseOkAction {
	type: EttersendelseActionTypeKeys.ETTERSEND_OK;
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

export interface LesEttersendelserAction {
	type: EttersendelseActionTypeKeys.LES_ETTERSENDELSER;
	brukerbehandlingId: string;
}

export interface LesEttersendelserOkAction {
	type: EttersendelseActionTypeKeys.LES_ETTERSENDELSER_OK;
	ettersendelser: any;
}
export type EttersendelseActionTypes =
	OpprettEttersendelseAction
	| LagEttersendelseOkAction
	| LastOppEttersendelseAction
	| LastOppEttersendelseOkAction
	| LastOppEttersendelseFeiletAction
	| LessEttersendteVedleggAction
	| SlettEttersendtVedleggAction
	| LesEttersendelsesVedleggAction
	| SendEttersendelseAction
	| SendEttersendelsePendingAction
	| SendEttersendelseOkAction
	| LesEttersendelserAction
	| LesEttersendelserOkAction
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

export interface LastOppEttersendelseFeiletAction {
	type: EttersendelseActionTypeKeys.LAST_OPP_FEILET;
	feilKode: string;
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
	innsendte: any;
	restStatus: REST_STATUS;
	opplastingStatus: REST_STATUS;
	ettersendStatus: REST_STATUS;
	brukerbehandlingId: string;
	feilKode: string;
}
