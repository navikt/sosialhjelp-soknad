import {OpplysningType} from "../okonomiskeOpplysninger/okonomiskeOpplysningerTypes";


export enum FilActionTypeKeys {
	LAST_OPP = "fil/LAST_OPP",
	// LAST_OPP_OK = "vedlegg/LAST_OPP_OK",
	// LAST_OPP_FEILET = "vedlegg/LAST_OPP_FEILET",
	//
	// NYTT_VEDLEGG = "vedlegg/NYTT_VEDLEGG",
	// OPPDATERT_VEDLEGG = "vedlegg/OPPDATERT_VEDLEGG",
	//
	START_SLETT_FIL = "fil/START_SLETT_FIL",
	// SLETT_VEDLEGG = "vedlegg/SLETT_VEDLEGG",
	// SLETT_VEDLEGG_OK = "vedlegg/SLETT_VEDLEGG_OK",
	//
	// HENT_VEDLEGGSFORVENTNING_OK = "vedlegg/HENT_VEDLEGGSFORVENTNING_OK",
	// VEDLEGG_ALLEREDE_SENDT = "vedlegg/VEDLEGG_ALLEREDE_SENDT",
	// VEDLEGG_ALLEREDE_SENDT_OK = "vedlegg/VEDLEGG_ALLEREDE_SENDT_OK",
	// INIT = "vedlegg/INIT",
	// OTHER_ACTION = "__any_other_action_type__"
}


export type FilActionTypes
	= LastOppFilAction
	// | LastOppVedleggOkAction
	// | LastOppVedleggFeiletAction
	// | OppdatertVedleggAction
	// | NyttVedleggAction
	| StartSlettFilAction
	// | SlettVedleggAction
	// | SlettVedleggOkAction
	// | HentVedleggsForventningOk
	// | VedleggAlleredeSendtAction
	// | VedleggAlleredeSendtOkAction
	// | OtherAction;

export interface LastOppFilAction {
	type: FilActionTypeKeys.LAST_OPP;
	formData: FormData;
	behandlingsId: string;
	opplysningType: OpplysningType
}
//
// interface LastOppVedleggOkAction {
// 	type: VedleggActionTypeKeys.LAST_OPP_OK;
// }
//
// interface LastOppVedleggFeiletAction {
// 	type: VedleggActionTypeKeys.LAST_OPP_FEILET;
// 	belopFaktumId: number;
// 	feilKode: string;
// }
//
// interface OppdatertVedleggAction {
// 	type: VedleggActionTypeKeys.OPPDATERT_VEDLEGG;
// 	vedlegg: Vedlegg;
// 	fakta: Faktum[];
// }
//
// interface NyttVedleggAction {
// 	type: VedleggActionTypeKeys.NYTT_VEDLEGG;
// 	vedlegg: Vedlegg;
// 	fakta: Faktum[];
// }
//
export interface StartSlettFilAction {
	type: FilActionTypeKeys.START_SLETT_FIL;
	behandlingsId: string;
	vedleggId: string;
}
//
// export interface SlettVedleggAction {
// 	type: VedleggActionTypeKeys.SLETT_VEDLEGG;
// 	vedleggId: number;
// }
//
// export interface SlettVedleggOkAction {
// 	type: VedleggActionTypeKeys.SLETT_VEDLEGG_OK;
// }
//
// interface HentVedleggsForventningOk {
// 	type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_OK;
// 	vedleggsforventninger: Vedlegg[];
// 	fakta: Faktum[];
// }
//
// export interface VedleggAlleredeSendtAction {
// 	type: VedleggActionTypeKeys.VEDLEGG_ALLEREDE_SENDT;
// 	vedlegg: Vedlegg[];
// }
//
// export interface VedleggAlleredeSendtOkAction {
// 	type: VedleggActionTypeKeys.VEDLEGG_ALLEREDE_SENDT_OK;
// 	vedlegg: Vedlegg[];
// }
//
// export interface OtherAction {
// 	type: VedleggActionTypeKeys.OTHER_ACTION;
// }
