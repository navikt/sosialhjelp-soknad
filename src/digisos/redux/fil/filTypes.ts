import {Fil, Opplysning, OpplysningType} from "../okonomiskeOpplysninger/opplysningerTypes";
import {REST_FEIL, REST_STATUS} from "../soknad/soknadTypes";


export interface FilState {
    opplastingStatus: REST_STATUS;
    feilKode: REST_FEIL | null;
    opplysningtype: OpplysningType | null;
}

export enum FilActionTypeKeys {
    LAST_OPP = "fil/LAST_OPP",
    START_SLETT_FIL = "fil/START_SLETT_FIL",
    LAST_OPP_FEILET = "fil/LAST_OPP_FEILET"
}

export type FilActionTypes
    = LastOppFilAction
    | StartSlettFilAction
    | LastOppFilFeilet

export interface LastOppFilAction {
    type: FilActionTypeKeys.LAST_OPP;
    opplysning: Opplysning;
    formData: FormData;
    behandlingsId: string;
}

export interface LastOppFilFeilet {
    type: FilActionTypeKeys.LAST_OPP_FEILET;
    opplysningType: OpplysningType;
    feilKode: REST_FEIL;
}

export interface StartSlettFilAction {
    type: FilActionTypeKeys.START_SLETT_FIL;
    behandlingsId: string;
    fil: Fil;
    opplysning: Opplysning;
    opplysningType: OpplysningType;
}
