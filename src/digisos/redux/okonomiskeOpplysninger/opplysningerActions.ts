import {Valideringsfeil} from "../validering/valideringActionTypes";
import {OpplysningerAction, opplysningerActionTypeKeys} from "./opplysningerTypes";
import {logError} from "../../../nav-soknad/utils/loggerUtils";
import {Dispatch} from "redux";
import {hentOkonomiskeOpplysninger} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {AxiosError} from "axios";
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

const validVedleggFrontend = (
    foo: VedleggFrontend | VedleggFrontendMinusEtParTingSomTrengerAvklaring
    // @ts-ignore fordi dette er en midlertidig hack
): foo is VedleggFrontendMinusEtParTingSomTrengerAvklaring => !UgyldigeFrontendTyper.includes(foo.type);

const validVedleggFrontends = (
    foo: VedleggFrontends | VedleggFrontendsMinusEtParTingSomTrengerAvklaring
    // @ts-ignore fordi dette er en midlertidig hack
): foo is VedleggFrontendsMinusEtParTingSomTrengerAvklaring => {
    if (foo.slettedeVedlegg.some((vedlegg) => !validVedleggFrontend(vedlegg))) return false;
    if (foo.okonomiskeOpplysninger.some((vedlegg) => !validVedleggFrontend(vedlegg))) return false;
    return true;
};

export function hentOpplysninger(behandlingsId: string, dispatch: Dispatch) {
    hentOkonomiskeOpplysninger(behandlingsId)
        .then((response: VedleggFrontends | VedleggFrontendsMinusEtParTingSomTrengerAvklaring) => {
            if (!validVedleggFrontends(response)) {
                throw new Error("initOpplysning mottok ugyldig spec - frontends API ute av synk med Swagger?");
            }
            dispatch(gotDataFromBackend(response));
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
