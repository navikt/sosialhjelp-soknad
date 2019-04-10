import {Fil, Opplysning, OpplysningType} from "../okonomiskeOpplysninger/okonomiskeOpplysningerTypes";


export enum FilActionTypeKeys {
	LAST_OPP = "fil/LAST_OPP",
	START_SLETT_FIL = "fil/START_SLETT_FIL",
}


export type FilActionTypes
	= LastOppFilAction
	| StartSlettFilAction

export interface LastOppFilAction {
	type: FilActionTypeKeys.LAST_OPP;
	opplysning: Opplysning;
	formData: FormData;
	behandlingsId: string;
	opplysningType: OpplysningType
}


export interface StartSlettFilAction {
	type: FilActionTypeKeys.START_SLETT_FIL;
	behandlingsId: string;
	fil: Fil;
	opplysning: Opplysning;
	opplysningType: OpplysningType;
}
