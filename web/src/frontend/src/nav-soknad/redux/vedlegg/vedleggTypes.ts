import { REST_STATUS } from "../../types/restTypes";
import { Faktum } from "../../types/navSoknadTypes";

export enum VedleggActionTypeKeys {
	LAST_OPP = "vedlegg/LAST_OPP",
	LAST_OPP_OK = "vedlegg/LAST_OPP_OK",
	LAST_OPP_FEILET = "vedlegg/LAST_OPP_FEILET",

	NYTT_VEDLEGG = "vedlegg/NYTT_VEDLEGG",
	OPPDATERT_VEDLEGG = "vedlegg/OPPDATERT_VEDLEGG",

	START_SLETT_VEDLEGG = "vedlegg/START_SLETT_VEDLEGG",
	SLETT_VEDLEGG = "vedlegg/SLETT_VEDLEGG",
	SLETT_VEDLEGG_OK = "vedlegg/SLETT_VEDLEGG_OK",

	HENT_VEDLEGGSFORVENTNING_OK = "vedlegg/HENT_VEDLEGGSFORVENTNING_OK",
	VEDLEGG_ALLEREDE_SENDT = "vedlegg/VEDLEGG_ALLEREDE_SENDT",
	VEDLEGG_ALLEREDE_SENDT_OK = "vedlegg/VEDLEGG_ALLEREDE_SENDT_OK",
	INIT = "vedlegg/INIT",
	OTHER_ACTION = "__any_other_action_type__"
}

export interface VedleggState {
	data: Vedlegg[];
	restStatus: REST_STATUS;
	opplastingStatus: REST_STATUS;
	sistEndredeFaktumId: number;
	feilKode: string;
}

export type VedleggActionTypes =
	LastOppVedleggAction
	| LastOppVedleggOkAction
	| LastOppVedleggFeiletAction
	| OppdatertVedleggAction
	| NyttVedleggAction
	| StartSlettVedleggAction
	| SlettVedleggAction
	| SlettVedleggOkAction
	| HentVedleggsForventningOk
	| VedleggAlleredeSendtAction
	| VedleggAlleredeSendtOkAction
	| OtherAction;

export interface LastOppVedleggAction {
	type: VedleggActionTypeKeys.LAST_OPP;
	belopFaktumId: number;
	formData: FormData;
}

interface LastOppVedleggOkAction {
	type: VedleggActionTypeKeys.LAST_OPP_OK;
}

interface LastOppVedleggFeiletAction {
	type: VedleggActionTypeKeys.LAST_OPP_FEILET;
	belopFaktumId: number;
	feilKode: string;
}

interface OppdatertVedleggAction {
	type: VedleggActionTypeKeys.OPPDATERT_VEDLEGG;
	vedlegg: Vedlegg;
	fakta: Faktum[];
}

interface NyttVedleggAction {
	type: VedleggActionTypeKeys.NYTT_VEDLEGG;
	vedlegg: Vedlegg;
	fakta: Faktum[];
}

export interface StartSlettVedleggAction {
	type: VedleggActionTypeKeys.START_SLETT_VEDLEGG;
	vedleggId: number;
	vedleggsFaktumId: number;
	belopFaktumId: number;
}

export interface SlettVedleggAction {
	type: VedleggActionTypeKeys.SLETT_VEDLEGG;
	vedleggId: number;
}

export interface SlettVedleggOkAction {
	type: VedleggActionTypeKeys.SLETT_VEDLEGG_OK;
}

interface HentVedleggsForventningOk {
	type: VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_OK;
	vedleggsforventninger: Vedlegg[];
	fakta: Faktum[];
}

export interface VedleggAlleredeSendtAction {
	type: VedleggActionTypeKeys.VEDLEGG_ALLEREDE_SENDT;
	vedlegg: Vedlegg[];
}

export interface VedleggAlleredeSendtOkAction {
	type: VedleggActionTypeKeys.VEDLEGG_ALLEREDE_SENDT_OK;
	vedlegg: Vedlegg[];
}

export interface OtherAction {
	type: VedleggActionTypeKeys.OTHER_ACTION;
}

export interface Vedlegg {
	vedleggId: number;
	mimetype?: string;
	filnavn?: string;
	faktumId: number;
	innsendingsvalg: string;
	skjemaNummer: string;
	skjemanummerTillegg: string;
	belopFaktumId: number;
}

export interface VedleggProps {
	vedlegg: Vedlegg[];
}
