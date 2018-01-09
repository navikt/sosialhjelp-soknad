import { REST_STATUS } from "../../types/restTypes";
import { Faktum } from "../../types/navSoknadTypes";

export enum VedleggActionTypeKeys {
	LAST_OPP = "vedlegg/LAST_OPP",
	LAST_OPP_OK = "vedlegg/LAST_OPP_OK",

	NYTT_VEDLEGG = "vedlegg/NYTT_VEDLEGG",
	OPPDATERT_VEDLEGG = "vedlegg/OPPDATERT_VEDLEGG",

	START_SLETT_VEDLEGG = "vedlegg/START_SLETT_VEDLEGG",
	SLETT_VEDLEGG = "vedlegg/SLETT_VEDLEGG",
	SLETT_VEDLEGG_OK = "vedlegg/SLETT_VEDLEGG_OK",

	HENT_VEDLEGGSFORVENTNING_OK = "vedlegg/HENT_VEDLEGGSFORVENTNING_OK",

	INIT = "vedlegg/INIT",
	OTHER_ACTION = "__any_other_action_type__"
}

export interface VedleggState {
	data: Vedlegg[];
	restStatus: REST_STATUS;
	opplastingStatus: REST_STATUS;
	sistBrukteFaktumId: number;
}

export type VedleggActionTypes =
	LastOppVedleggAction
	| LastOppVedleggOkAction
	| OppdatertVedleggAction
	| NyttVedleggAction
	| StartSlettVedleggAction
	| SlettVedleggAction
	| SlettVedleggOkAction
	| HentVedleggsForventningOk
	| OtherAction;

export interface LastOppVedleggAction {
	type: VedleggActionTypeKeys.LAST_OPP;
	belopFaktumId: number;
	formData: FormData;
}

interface LastOppVedleggOkAction {
	type: VedleggActionTypeKeys.LAST_OPP_OK;
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
	skjemaNummer: string;
	skjemanummerTillegg: string;
	belopFaktumId: number;
}

export interface VedleggApiType {
	data: Vedlegg[];
	restStatus: REST_STATUS;
	opplastingStatus: REST_STATUS;
	sistBrukteFaktumId: number;
	feilmelding: string;
}

export interface VedleggProps {
	vedlegg: Vedlegg[];
}
