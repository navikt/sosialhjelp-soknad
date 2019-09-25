import {Fil, Opplysning, OpplysningType} from "../okonomiskeOpplysninger/opplysningerTypes";
import {FilActionTypeKeys, FilActionTypes} from "./filTypes";
import {REST_FEIL} from "../../../nav-soknad/types/restFeilTypes";

const lastOppFil = (
    opplysning: Opplysning,
    formData: FormData,
    behandlingsId: string,
): FilActionTypes => {
    return {
        type: FilActionTypeKeys.LAST_OPP,
        opplysning,
        formData,
        behandlingsId,
    };
};

const lastOppFilFeilet = (opplysningType: OpplysningType, feilKode: REST_FEIL): FilActionTypes => {
    return {
        type: FilActionTypeKeys.LAST_OPP_FEILET,
        opplysningType,
        feilKode
    };
};

const startSlettFil = (
    behandlingsId: string,
    fil: Fil,
    opplysning: Opplysning,
    opplysningType: OpplysningType
): FilActionTypes => {
    return {
        type: FilActionTypeKeys.START_SLETT_FIL,
        behandlingsId,
        fil,
        opplysning,
        opplysningType
    };
};

export {
    lastOppFil,
    startSlettFil,
    lastOppFilFeilet
};
