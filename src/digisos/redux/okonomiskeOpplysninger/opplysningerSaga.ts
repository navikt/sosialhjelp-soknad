import {LagreOpplysningHvisGyldig, opplysningerActionTypeKeys} from "./opplysningerTypes";
import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {getOpplysningerUrl, getSpcForOpplysning, transformToBackendOpplysning} from "./opplysningerUtils";
import {updateOpplysning} from "./opplysningerActions";
import {Valideringsfeil, ValideringsFeilKode} from "../validering/valideringActionTypes";
import {setValideringsfeil} from "../validering/valideringActions";
import {logError, logWarning} from "../../../nav-soknad/utils/loggerUtils";
import {AxiosError} from "axios";
import {panic} from "../soknadsdata/soknadsdataActions";
import {axiosInstance} from "../../../lib/orval/soknad-api-axios";

export const getFeilForOpplysning = (feil: Valideringsfeil[], opplysningTextKey: string) =>
    feil.filter(({faktumKey}) => faktumKey.indexOf(opplysningTextKey) > -1);

function* lagreOpplysningHvisGyldigSaga({behandlingsId, opplysning, feil}: LagreOpplysningHvisGyldig) {
    const opplysningerSpc = getSpcForOpplysning(opplysning.type);

    if (!opplysningerSpc) {
        yield call(logError, "Ukjent opplysningstype mottatt. Type: " + opplysning.type);
        return;
    }

    const {textKey} = opplysningerSpc;

    yield put(updateOpplysning(opplysning));

    if (getFeilForOpplysning(feil, textKey).length) return;

    const path = getOpplysningerUrl(behandlingsId);

    try {
        yield call(
            axiosInstance,
            {
                method: "put",
                url: path,
                data: transformToBackendOpplysning(opplysning),
            },
            // We handle 404 ourselves
            {digisosFatalErrors: [403, 410]}
        );
    } catch (e) {
        if (e instanceof AxiosError && e.response) {
            if (e.response.status === 404) {
                for (let i = 0; i < opplysning.radInnhold.length; i++) {
                    // Setter alle felt til feilet!
                    const validationKey = `${textKey}.${opplysning.radInnhold[i]}.${i}`;
                    yield put(setValideringsfeil(ValideringsFeilKode.FELT_EKSISTERER_IKKE, validationKey));
                }

                yield put(setValideringsfeil(ValideringsFeilKode.FELT_EKSISTERER_IKKE, opplysning.type));
                return;
            }

            yield call(
                logWarning,
                `lagreOpplysningHvisGyldigSaga ${path} feilet: ${e.response.status} ${e.response.data}`
            );
        } else {
            yield call(logWarning, `lagreOpplysningHvisGyldigSaga ${path} feilet: ${e}`);
            panic("lagreOpplysningHvisGyldigSaga");
        }

        yield call(logWarning, `Lagring av økonomisk opplysning feilet. Reason: ${e}`);
        panic("lagreOpplysningHvisGyldigSaga");
    }
}

function* opplysningerSaga(): SagaIterator {
    yield takeEvery(opplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG, lagreOpplysningHvisGyldigSaga);
}

export default opplysningerSaga;
