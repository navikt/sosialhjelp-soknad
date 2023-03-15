import {Valideringsfeil} from "../validering/valideringActionTypes";
import {
    OpplysningerAction,
    opplysningerActionTypeKeys,
    OpplysningerBackend,
    Opplysning,
    OpplysningType,
} from "./opplysningerTypes";
import {getOpplysningerUrl} from "./opplysningerUtils";
import {fetchToJson, HttpStatus} from "../../../nav-soknad/utils/rest-utils";
import {logWarning} from "../../../nav-soknad/utils/loggerUtils";
import {Dispatch} from "redux";

export const gotDataFromBackend = (response: OpplysningerBackend): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND,
        backendData: response,
    };
};

export const updateOpplysning = (opplysning: Opplysning): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.OPPDATER_OPPLYSNING,
        opplysning,
    };
};

export const settFilOpplastingPending = (opplysningType: OpplysningType): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_PENDING,
        opplysningType,
    };
};

export const settFilOpplastingFerdig = (opplysningType: OpplysningType): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_FERDIG,
        opplysningType,
    };
};

export function hentOpplysninger(behandlingsId: string, dispatch: Dispatch) {
    fetchToJson(getOpplysningerUrl(behandlingsId))
        .then((response: any) => {
            dispatch(gotDataFromBackend(response));
        })
        .catch((reason: any) => {
            if (reason.message === HttpStatus.UNAUTHORIZED) {
                return;
            }
            logWarning("Henting av økonomiske opplysninger feilet: " + reason);
            window.location.href = "/sosialhjelp/soknad/feil?reason=hentOpplysninger";
        });
}

export const lagreOpplysningHvisGyldigAction = (
    behandlingsId: string,
    opplysning: Opplysning,
    feil: Valideringsfeil[]
): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG,
        behandlingsId,
        opplysning,
        feil,
    };
};
