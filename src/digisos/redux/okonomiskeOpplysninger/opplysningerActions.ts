import {Valideringsfeil} from "../validering/valideringActionTypes";
import {OpplysningerAction, opplysningerActionTypeKeys} from "./opplysningerTypes";
import {
    UgyldigeFrontendTyper,
    VedleggFrontendMinusEtParTingSomTrengerAvklaring,
    VedleggFrontendsMinusEtParTingSomTrengerAvklaring,
    VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring,
} from "./opplysningerConfig";
import {VedleggFrontend, VedleggFrontends} from "../../../generated/model";

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

export const invalidVedleggFrontend = (
    foo: VedleggFrontend | VedleggFrontendMinusEtParTingSomTrengerAvklaring
    // @ts-ignore fordi dette er en midlertidig hack
): foo is VedleggFrontend => UgyldigeFrontendTyper.includes(foo.type);

export const validVedleggFrontends = (
    foo: VedleggFrontends | VedleggFrontendsMinusEtParTingSomTrengerAvklaring
    // @ts-ignore fordi dette er en midlertidig hack
): foo is VedleggFrontendsMinusEtParTingSomTrengerAvklaring =>
    foo.slettedeVedlegg.some(invalidVedleggFrontend) || foo.okonomiskeOpplysninger.some(invalidVedleggFrontend);

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
