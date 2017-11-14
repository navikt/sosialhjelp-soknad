import { REST_STATUS } from "../../../nav-soknad/types/restTypes";

export interface VedleggState {
	data: any;
	restStatus: REST_STATUS;
}

export enum VedleggsforventingActionTypeKeys {
	HENT_VEDLEGG = "vedlegg/HENT_VEDLEGG",
	HENT_VEDLEGG_OK = "vedlegg/HENT_VEDLEGG_OK",
	HENT_VEDLEGG_FEILET = "vedlegg/HENT_VEDLEGG_FEILET",
	OTHER_ACTION = "__any_other_action_type__"
}

export type VedleggsforventingActionType =
	HentVedleggsForventningAction
	| HentVedleggsForventningOkAction
	| HentVedleggsForventningFeiletAction;

export interface HentVedleggsForventningAction {
	type: VedleggsforventingActionTypeKeys.HENT_VEDLEGG;
}

export interface HentVedleggsForventningOkAction {
	type: VedleggsforventingActionTypeKeys.HENT_VEDLEGG_OK;
	data: any;
}

export interface HentVedleggsForventningFeiletAction {
	type: VedleggsforventingActionTypeKeys.HENT_VEDLEGG_FEILET;
	feilmelding: string;
}
