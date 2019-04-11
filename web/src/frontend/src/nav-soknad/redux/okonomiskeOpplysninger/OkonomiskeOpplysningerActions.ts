import {Dispatch} from "../reduxTypes";
import {fetchToJson} from "../../utils/rest-utils";
import {navigerTilServerfeil} from "../navigasjon/navigasjonActions";
import {
    OkonomiskeOpplysningerAction,
    OkonomiskeOpplysningerActionTypeKeys,
    OkonomiskeOpplysningerBackend,
    Opplysning,
    OpplysningGruppe,
    OpplysningType
} from "./okonomiskeOpplysningerTypes";
import {getOkonomomiskeOpplysningerUrl} from "./okonomiskeOpplysningerUtils";
import {Valideringsfeil} from "../../validering/types";


export const gotDataFromBackend  = (response: OkonomiskeOpplysningerBackend): OkonomiskeOpplysningerAction => {
    return {
        type: OkonomiskeOpplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND,
        backendData: response
    }
};

export const updateOpplysning = (okonomiskOpplysning: Opplysning): OkonomiskeOpplysningerAction => {
    return {
        type: OkonomiskeOpplysningerActionTypeKeys.OPPDATER_OKONOMISK_OPPLYSNING,
        okonomiskOpplysning
    }
};

export const settPendingPaFilOpplasting = (opplysningType: OpplysningType, opplysningGruppe: OpplysningGruppe): OkonomiskeOpplysningerAction => {
    return {
        type: OkonomiskeOpplysningerActionTypeKeys.SETT_PENDING_PA_FIL_OPPLASTING,
        opplysningType,
        opplysningGruppe
    }
};

export const settFerdigPaFilOpplasting = (opplysningType: OpplysningType, opplysningGruppe: OpplysningGruppe): OkonomiskeOpplysningerAction => {
    return {
        type: OkonomiskeOpplysningerActionTypeKeys.SETT_FERDIG_PA_FIL_OPPLASTING,
        opplysningType,
        opplysningGruppe
    }
};

export const settOpplysningsFilAlleredeLastetOpp = (opplysningType: OpplysningType, opplysningGruppe: OpplysningGruppe) => {
    return {
        type: OkonomiskeOpplysningerActionTypeKeys.SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP,
        opplysningType,
        opplysningGruppe
    }
};


export function hentOkonomiskeOpplysninger(behandlingsId: string) {
    return (dispatch: Dispatch) => {
        fetchToJson(getOkonomomiskeOpplysningerUrl(behandlingsId))
            .then((response: OkonomiskeOpplysningerBackend) => {
                dispatch(gotDataFromBackend(response));
            }).catch(() => {
            dispatch(navigerTilServerfeil());
        });
    }
}

// export function lagreOpplysning(behandlingsId: string, okonomiskOpplysning: Opplysning) {
//
//     const okonomiskOpplysningBackend: OkonomiskOpplysningBackend = transformToBackendOpplysning(okonomiskOpplysning);
//
//     return (dispatch: Dispatch) => {
//         fetchPut(getOkonomomiskeOpplysningerUrl(behandlingsId), JSON.stringify(okonomiskOpplysningBackend))
//             .catch(() => {
//                 dispatch(navigerTilServerfeil());
//             });
//     }
// }

export const lagreOpplysningHvisGyldigAction = (
    behandlingsId: string,
    opplysning: Opplysning,
    feil: Valideringsfeil[]
): OkonomiskeOpplysningerAction => {
    return {
        type: OkonomiskeOpplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG,
        behandlingsId,
        opplysning,
        feil
    }
};
