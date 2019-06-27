import {Dispatch, Valideringsfeil} from "../reduxTypes";
import {fetchToJson} from "../../utils/rest-utils";
import {navigerTilServerfeil} from "../navigasjon/navigasjonActions";
import {
    opplysningerAction,
    opplysningerActionTypeKeys,
    OpplysningerBackend,
    Opplysning,
    OpplysningType
} from "./opplysningerTypes";
import {getOpplysningerUrl} from "./opplysningerUtils";
import {loggFeil} from "../navlogger/navloggerActions";


export const gotDataFromBackend = (response: OpplysningerBackend): opplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND,
        backendData: response
    }
};

export const updateOpplysning = (opplysning: Opplysning): opplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.OPPDATER_OPPLYSNING,
        opplysning
    }
};

export const settFilOpplastingPending = (opplysningType: OpplysningType): opplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_PENDING,
        opplysningType,
    }
};

export const settFilOpplastingFerdig = (opplysningType: OpplysningType): opplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_FERDIG,
        opplysningType,
    }
};

export function hentOpplysninger(behandlingsId: string) {
    return (dispatch: Dispatch) => {
        fetchToJson(getOpplysningerUrl(behandlingsId))
            .then((response: any) => {
                dispatch(gotDataFromBackend(response));
            }).catch((reason: any) => {
            dispatch(loggFeil("Henting av økonomiske opplysninger feilet: " + reason));
            dispatch(navigerTilServerfeil());
        });
    }
}

export const lagreOpplysningHvisGyldigAction = (
    behandlingsId: string,
    opplysning: Opplysning,
    feil: Valideringsfeil[]
): opplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG,
        behandlingsId,
        opplysning,
        feil
    }
};
