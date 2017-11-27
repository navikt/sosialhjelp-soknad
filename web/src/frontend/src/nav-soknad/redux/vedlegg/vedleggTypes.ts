import { REST_STATUS } from "../../types/restTypes";

export enum VedleggActionTypeKeys {
	LASTOPP = "vedlegg/LASTOPP",
	OK = "vedlegg/OK",
	LASTOPP_FEILET = "vedlegg/LASTOPP_FEILET",
	LASTOPP_OK = "vedlegg/LASTOPP_OK",
	HENT = "vedlegg/HENT",
	HENT_FEILET = "vedlegg/HENT_FEILET",
	LASTOPP_PENDING = "vedlegg/LASTOPP_PENDING",
	HENT_VEDLEGG_LISTE = "vedlegg/HENT_VEDLEGG_LISTE",
	MOTTATT_VEDLEGG_LISTE = "vedlegg/MOTTATT_VEDLEGG_LISTE",
	HENT_PENDING = "vedlegg/HENT_PENDING",
	HENT_VEDLEGGSFORVENTNING = "vedlegg/HENT_VEDLEGGSFORVENTNING",
	HENT_VEDLEGGSFORVENTNING_OK = "vedlegg/HENT_VEDLEGGSFORVENTNING_OK",
	HENT_VEDLEGGSFORVENTNING_FEILET = "vedlegg/HENT_VEDLEGGSFORVENTNING_FEILET",
	INIT = "vedlegg/INIT",
	OTHER_ACTION = "__any_other_action_type__"
}

export interface VedleggState {
	data: any;
	filer: any[];
	restStatus: REST_STATUS;
}

export type VedleggActionTypes =
	LastOppVedleggAction
	| LasterOppVedleggAction
	| LastetOppVedleggAction
	| HentVedleggListeAction
	| MottattVedleggListeAction
	| HentetVedleggAction
	| HentVedleggAction
	| HentVedleggFeiletAction
	| LastoppVedleggFeiletAction
	| HentVedleggsForventning
	| HentVedleggsForventningOk
	| HentVedleggsForventningFeilet
	| OtherAction;

export interface LastOppVedleggAction {
	type: VedleggActionTypeKeys.LASTOPP;
	vedleggId: string;
	formData: FormData;
}

interface LasterOppVedleggAction {
	type: VedleggActionTypeKeys.LASTOPP_PENDING;
}

interface LastetOppVedleggAction {
	type: VedleggActionTypeKeys.LASTOPP_OK;
}

interface HentetVedleggAction {
	type: VedleggActionTypeKeys.OK;
	data: object;
}

export interface HentVedleggListeAction {
	type: VedleggActionTypeKeys.HENT_VEDLEGG_LISTE;
	vedleggId: string;
}

interface HentVedleggsForventning {
	type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING;
}

interface HentVedleggsForventningOk {
	type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_OK;
	data: any;
}

interface HentVedleggsForventningFeilet {
	type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_FEILET;
	feilmelding: string;
}

interface MottattVedleggListeAction {
	type: VedleggActionTypeKeys.MOTTATT_VEDLEGG_LISTE;
	data: any;
}

interface HentVedleggAction {
	type: VedleggActionTypeKeys.HENT;
}

interface LastoppVedleggFeiletAction {
	type: VedleggActionTypeKeys.LASTOPP_FEILET;
	feilmelding: string;
}

interface HentVedleggFeiletAction {
	type: VedleggActionTypeKeys.HENT_FEILET;
	feilmelding: string;
}

export interface OtherAction {
	type: VedleggActionTypeKeys.OTHER_ACTION;
}

export interface VedleggApiType {
	data: {};
	filer: any[];
	status: VedleggActionTypeKeys;
	restStatus: REST_STATUS;
}
