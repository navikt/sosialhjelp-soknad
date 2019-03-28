import {Dispatch} from "../reduxTypes";
import {fetchPut, fetchToJson} from "../../utils/rest-utils";
import {navigerTilServerfeil} from "../navigasjon/navigasjonActions";
import {
    OkonomiskeOpplysningerAction,
    OkonomiskeOpplysningerActionTypeKeys, OkonomiskeOpplysningerBackend,
    OkonomiskOpplysning, OkonomiskOpplysningBackend
} from "./okonomiskeOpplysningerTypes";
import {getOkonomomiskeOpplysningerUrl, transformToBackendOpplysning} from "./okonomiskeOpplysningerUtils";



export const gotDataFromBackend  = (response: OkonomiskeOpplysningerBackend): OkonomiskeOpplysningerAction => {
    return {
        type: OkonomiskeOpplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND,
        backendData: response
    }
};

export const updateOpplysning = (okonomiskOpplysning: OkonomiskOpplysning): OkonomiskeOpplysningerAction => {
    return {
        type: OkonomiskeOpplysningerActionTypeKeys.OPPDATER_OKONOMISK_OPPLYSNING,
        okonomiskOpplysning
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

export function lagreOpplysning(behandlingsId: string, okonomiskOpplysning: OkonomiskOpplysning) {

    const okonomiskOpplysningBackend: OkonomiskOpplysningBackend = transformToBackendOpplysning(okonomiskOpplysning);

    return (dispatch: Dispatch) => {
        fetchPut(getOkonomomiskeOpplysningerUrl(behandlingsId), JSON.stringify(okonomiskOpplysningBackend))
            .catch(() => {
                dispatch(navigerTilServerfeil());
            });
    }
}

