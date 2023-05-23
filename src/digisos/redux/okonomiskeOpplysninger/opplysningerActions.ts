import {OpplysningerAction, opplysningerActionTypeKeys} from "./opplysningerTypes";
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
): OpplysningerAction => ({
    type: opplysningerActionTypeKeys.SETT_VEDLEGG_LOADING,
    opplysningType,
    loading,
});
