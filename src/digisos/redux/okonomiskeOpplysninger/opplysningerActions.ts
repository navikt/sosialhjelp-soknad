import {Valideringsfeil} from "../validering/valideringActionTypes";
import {
    OpplysningerAction,
    opplysningerActionTypeKeys,
    OpplysningerBackend,
    Opplysning,
    OpplysningType,
} from "./opplysningerTypes";
import {logError} from "../../../nav-soknad/utils/loggerUtils";
import {Dispatch} from "redux";
import {hentOkonomiskeOpplysninger} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {AxiosError} from "axios";
import {handleAxiosError} from "../../../lib/hooks/useGETErrorHandler";

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
    hentOkonomiskeOpplysninger(behandlingsId)
        .then((response) => {
            // TODO: gotDataFromBackend bruker fremdeles klientside datatyper.
            dispatch(gotDataFromBackend(response as unknown as OpplysningerBackend));
        })
        .catch(async (error: any) => {
            if (error instanceof AxiosError) {
                await handleAxiosError(error);
            } else {
                await logError(`Henting av økonomiske opplysninger feilet: ${error.message}`);
                window.location.href = "/sosialhjelp/soknad/feil?reason=hentOpplysninger";
            }
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
