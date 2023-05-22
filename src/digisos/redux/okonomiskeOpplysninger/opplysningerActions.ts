import {Valideringsfeil} from "../validering/valideringActionTypes";
import {OpplysningerAction, opplysningerActionTypeKeys} from "./opplysningerTypes";
import {logError} from "../../../nav-soknad/utils/loggerUtils";
import {Dispatch} from "redux";
import {hentOkonomiskeOpplysninger} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {AxiosError} from "axios";
import {
    VedleggFrontendMinusEtParTingSomTrengerAvklaring,
    VedleggFrontendsMinusEtParTingSomTrengerAvklaring,
    VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring,
} from "./opplysningerConfig";

export const gotDataFromBackend = (response: VedleggFrontendsMinusEtParTingSomTrengerAvklaring): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND,
        backendData: response,
    };
};

export const updateOpplysning = (opplysning: VedleggFrontendMinusEtParTingSomTrengerAvklaring): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.OPPDATER_OPPLYSNING,
        opplysning,
    };
};

export const setVedleggLoading = (
    opplysningType: VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring,
    loading: boolean
): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.SETT_VEDLEGG_LOADING,
        opplysningType,
        loading,
    };
};

export function hentOpplysninger(behandlingsId: string, dispatch: Dispatch) {
    hentOkonomiskeOpplysninger(behandlingsId)
        .then((response) => {
            // TODO: gotDataFromBackend bruker fremdeles klientside datatyper.
            dispatch(gotDataFromBackend(response as VedleggFrontendsMinusEtParTingSomTrengerAvklaring));
        })
        .catch((error: any) => {
            if (error instanceof AxiosError) {
                logError(`Henting av økonomiske opplysninger feilet: ${error.status}: ${error.message}`);
            } else {
                logError(`Henting av økonomiske opplysninger feilet: ${error.message}`);
            }

            // Gi logError en sjanse
            setTimeout(() => {
                window.location.href = "/sosialhjelp/soknad/feil?reason=hentOpplysninger";
            }, 1000);
        });
}

export const lagreOpplysningHvisGyldigAction = (
    behandlingsId: string,
    opplysning: VedleggFrontendMinusEtParTingSomTrengerAvklaring,
    feil: Valideringsfeil[]
): OpplysningerAction => {
    return {
        type: opplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG,
        behandlingsId,
        opplysning,
        feil,
    };
};
