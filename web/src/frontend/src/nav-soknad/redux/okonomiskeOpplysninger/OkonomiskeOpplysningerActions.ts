import {Dispatch} from "../reduxTypes";
import {fetchToJson} from "../../utils/rest-utils";
import {navigerTilServerfeil} from "../navigasjon/navigasjonActions";
import {
    OkonomiskeOpplysningerAction,
    OkonomiskeOpplysningerActionTypeKeys,
    OkonomiskeOpplysningerBackend,
    Opplysning,
    OpplysningType
} from "./opplysningerTypes";
import {getOkonomomiskeOpplysningerUrl} from "./okonomiskeOpplysningerUtils";
import {Valideringsfeil} from "../../validering/types";


export const gotDataFromBackend = (response: OkonomiskeOpplysningerBackend): OkonomiskeOpplysningerAction => {
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

export const settPendingPaFilOpplasting = (opplysningType: OpplysningType): OkonomiskeOpplysningerAction => {
    return {
        type: OkonomiskeOpplysningerActionTypeKeys.SETT_PENDING_PA_FIL_OPPLASTING,
        opplysningType,
    }
};

export const settFerdigPaFilOpplasting = (opplysningType: OpplysningType): OkonomiskeOpplysningerAction => {
    return {
        type: OkonomiskeOpplysningerActionTypeKeys.SETT_FERDIG_PA_FIL_OPPLASTING,
        opplysningType,
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
