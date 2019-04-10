import {Dispatch} from "../reduxTypes";
import {fetchPut, fetchToJson} from "../../utils/rest-utils";
import {navigerTilServerfeil} from "../navigasjon/navigasjonActions";
import {
    OkonomiskeOpplysningerAction,
    OkonomiskeOpplysningerActionTypeKeys,
    OkonomiskeOpplysningerBackend,
    OkonomiskOpplysningBackend,
    Opplysning, OpplysningGruppe, OpplysningType
} from "./okonomiskeOpplysningerTypes";
import {getOkonomomiskeOpplysningerUrl, transformToBackendOpplysning} from "./okonomiskeOpplysningerUtils";


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

export function lagreOpplysning(behandlingsId: string, okonomiskOpplysning: Opplysning) {

    const okonomiskOpplysningBackend: OkonomiskOpplysningBackend = transformToBackendOpplysning(okonomiskOpplysning);

    return (dispatch: Dispatch) => {
        fetchPut(getOkonomomiskeOpplysningerUrl(behandlingsId), JSON.stringify(okonomiskOpplysningBackend))
            .catch(() => {
                dispatch(navigerTilServerfeil());
            });
    }
}

