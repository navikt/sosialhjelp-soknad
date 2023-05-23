import {OpplysningerAction, opplysningerActionTypeKeys} from "./opplysningerTypes";
import {VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring} from "./opplysningerConfig";

export const setVedleggLoading = (
    opplysningType: VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring,
    loading: boolean
): OpplysningerAction => ({
    type: opplysningerActionTypeKeys.SETT_VEDLEGG_LOADING,
    opplysningType,
    loading,
});
