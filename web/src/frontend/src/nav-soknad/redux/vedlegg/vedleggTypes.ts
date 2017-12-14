import { REST_STATUS } from "../../types/restTypes";
import { Faktum } from "../../types/navSoknadTypes";

export enum VedleggActionTypeKeys {
	LAST_OPP = "vedlegg/LAST_OPP",
	LAST_OPP_OK = "vedlegg/LAST_OPP_OK",
	LAST_OPP_PENDING = "vedlegg/LAST_OPP_PENDING",
	LAST_OPP_FEILET = "vedlegg/LAST_OPP_FEILET",

	SLETT_FIL = "vedlegg/SLETT_FIL",
	SLETT_FIL_OK = "vedlegg/SLETT_FIL_OK",

	HENT_VEDLEGGSFORVENTNING = "vedlegg/HENT_VEDLEGGSFORVENTNING",
	HENT_VEDLEGGSFORVENTNING_OK = "vedlegg/HENT_VEDLEGGSFORVENTNING_OK",
	HENT_VEDLEGGSFORVENTNING_FEILET = "vedlegg/HENT_VEDLEGGSFORVENTNING_FEILET",

	INIT = "vedlegg/INIT",
	OTHER_ACTION = "__any_other_action_type__"
}

export interface VedleggState {
	data: Vedlegg[];
	restStatus: REST_STATUS;
}

export type VedleggActionTypes =
	LastOppVedleggAction
	| LastOppVedleggPendingAction
	| LastOppVedleggFeiletAction
	| LastOppVedleggOkAction
	| SlettFilAction
	| SlettFilOkAction
	| HentVedleggsForventning // ...Action navn?
	| HentVedleggsForventningOk
	| HentVedleggsForventningFeilet
	| OtherAction;

export interface LastOppVedleggAction {
	type: VedleggActionTypeKeys.LAST_OPP;
	vedleggId: string;
	faktumKey: string;
	filer: Fil[];
	formData: FormData;
}

interface LastOppVedleggPendingAction {
	type: VedleggActionTypeKeys.LAST_OPP_PENDING;
	vedleggId: string;
	faktumKey: string;
}

interface LastOppVedleggFeiletAction {
	type: VedleggActionTypeKeys.LAST_OPP_FEILET;
	vedleggId: string;
	faktumKey: string;
	feilmelding: string;
}

interface LastOppVedleggOkAction {
	type: VedleggActionTypeKeys.LAST_OPP_OK;
	vedleggId: string;
	faktumKey: string;
}

export interface SlettFilAction {
	type: VedleggActionTypeKeys.SLETT_FIL;
	faktumKey: string;
	vedleggId: string;
	filNavn: string;
}

export interface SlettFilOkAction {
	type: VedleggActionTypeKeys.SLETT_FIL_OK;
	faktumKey: string;
	vedleggId: string;
	filNavn: string;
}

interface HentVedleggsForventning {
	type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING;
	fakta: Faktum[];
}

interface HentVedleggsForventningOk {
	type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_OK;
	vedleggsforventninger: Vedlegg[];
	fakta: Faktum[];
}

interface HentVedleggsForventningFeilet {
	type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_FEILET;
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
	vedleggId: number;
	mimetype?: string;
	filnavn?: string;
	faktumId: number;
	innsendingsvalg: string;
	belopFaktumId: number;
}
/*
export interface Vedlegg {
	[ key: string ]: {
		faktumId: string;
		faktumKey: string;
		vedleggId: number;
		filer: Fil[];
	};
}*/

export interface VedleggApiType {
	data: Vedlegg[];
	restStatus: REST_STATUS;
	feilmelding: string;
}

export interface VedleggProps {
	vedlegg: Vedlegg[];
}
