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

	HENT_FIL_LISTE = "vedlegg/HENT_FIL_LISTE",
	HENT_FIL_LISTE_OK = "vedlegg/HENT_FIL_LISTE_OK",

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
	| SlettFilAction
	| SlettFilOkAction
	| HentVedleggsForventning // ...Action navn?
	| HentVedleggsForventningOk
	| HentVedleggsForventningFeilet
	| HentFilListeAction
	| HentFilListeOkAction
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
	vedleggsforventninger: any;
	fakta: Faktum[];
}

interface HentVedleggsForventningFeilet {
	type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_FEILET;
	feilmelding: string;
}

export interface HentFilListeAction {
	type: VedleggActionTypeKeys.HENT_FIL_LISTE;
	faktumKey: string;
	vedleggId: string;
}

export interface HentFilListeOkAction {
	type: VedleggActionTypeKeys.HENT_FIL_LISTE_OK;
	faktumKey: string;
	filer: any;
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
