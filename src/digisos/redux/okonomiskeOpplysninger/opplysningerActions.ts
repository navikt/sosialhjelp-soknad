import {Valideringsfeil} from "../validering/valideringActionTypes";
import {
    OpplysningerAction,
    opplysningerActionTypeKeys,
    OpplysningerBackend,
    Opplysning,
    OpplysningType,
} from "./opplysningerTypes";
import {getOpplysningerUrl} from "./opplysningerUtils";
import {fetchToJson, HttpStatus, RESTError} from "../../../nav-soknad/utils/rest-utils";
import {logError} from "../../../nav-soknad/utils/loggerUtils";
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
        .catch((error: any) => {
            if (error.message === HttpStatus.UNAUTHORIZED) return;

            if (error instanceof RESTError) {
                logError(`Henting av økonomiske opplysninger feilet: ${error.status}: ${error.message}`);
            } else {
                logError(`Henting av økonomiske opplysninger feilet: ${error.message}`);
            }

            // Gi logWarning en sjanse
            setTimeout(() => {
                window.location.href = "/sosialhjelp/soknad/feil?reason=hentOpplysninger";
            }, 1000);
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
