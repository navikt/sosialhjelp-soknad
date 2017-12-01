import { REST_STATUS } from "../../types/restTypes";
import { Faktum } from "../../types/navSoknadTypes";

export enum VedleggActionTypeKeys {
	LASTOPP = "vedlegg/LASTOPP",
	OK = "vedlegg/OK",
	LASTOPP_OK = "vedlegg/LASTOPP_OK",
	LASTOPP_PENDING = "vedlegg/LASTOPP_PENDING",
	LASTOPP_FEILET = "vedlegg/LASTOPP_FEILET",
	HENT = "vedlegg/HENT",
	HENT_FEILET = "vedlegg/HENT_FEILET",
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
	restStatus: REST_STATUS;
}

export type VedleggActionTypes =
	LastOppVedleggAction
	| LastOppVedleggPendingAction
	| LastOppVedleggFeiletAction
	| LastOppVedleggOkAction
	| HentVedleggListeAction
	| MottattVedleggListeAction
	| HentetVedleggAction
	| HentVedleggAction
	| HentVedleggFeiletAction
	| HentVedleggsForventning
	| HentVedleggsForventningOk
	| HentVedleggsForventningFeilet
	| OtherAction;

export interface LastOppVedleggAction {
	type: VedleggActionTypeKeys.LASTOPP;
	vedleggId: string;
	faktumKey: string;
	filer: Fil[];
	formData: FormData;
}

interface LastOppVedleggPendingAction {
	type: VedleggActionTypeKeys.LASTOPP_PENDING;
	vedleggId: string;
	faktumKey: string;
}

interface LastOppVedleggFeiletAction {
	type: VedleggActionTypeKeys.LASTOPP_FEILET;
	vedleggId: string;
	faktumKey: string;
	feilmelding: string;
}

interface LastOppVedleggOkAction {
	type: VedleggActionTypeKeys.LASTOPP_OK;
	vedleggId: string;
	faktumKey: string;
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
	fakta: Faktum[];
}

interface HentVedleggsForventningOk {
	type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_OK;
	vedleggsforventninger: any;
	fakta: Faktum[];
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

interface HentVedleggFeiletAction {
	type: VedleggActionTypeKeys.HENT_FEILET;
	feilmelding: string;
}

export interface OtherAction {
	type: VedleggActionTypeKeys.OTHER_ACTION;
}
export interface Fil {
	navn: string;
	status: string;
}

export interface Vedlegg {
	[ key: string ]: {
		faktumId: string;
		faktumKey: string;
		vedleggId: number;
		filer: Fil[];
	};
}

export interface VedleggApiType {
	data: {
		vedlegg?: Vedlegg
	};
	restStatus: REST_STATUS;
	feilmelding: string;
}
