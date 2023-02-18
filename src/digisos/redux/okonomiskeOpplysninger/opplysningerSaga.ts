import {LagreOpplysningHvisGyldig, opplysningerActionTypeKeys, OpplysningSpc} from "./opplysningerTypes";
import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {getOpplysningerUrl, getSpcForOpplysning, transformToBackendOpplysning} from "./opplysningerUtils";
import {detekterInternFeilKode, fetchPut, HttpStatus} from "../../../nav-soknad/utils/rest-utils";
import {updateOpplysning} from "./opplysningerActions";
import {Valideringsfeil, ValideringsFeilKode} from "../validering/valideringActionTypes";
import {setValideringsfeil} from "../validering/valideringActions";
import {logWarning} from "../../../nav-soknad/utils/loggerUtils";

export const getFeilForOpplysning = (feil: Valideringsfeil[], opplysningTextKey: string) =>
    feil.filter(({faktumKey}) => faktumKey.indexOf(opplysningTextKey) > -1);

function* lagreOpplysningHvisGyldigSaga(action: LagreOpplysningHvisGyldig) {
    const {behandlingsId, opplysning, feil} = action;
    const opplysningerSpc: OpplysningSpc | undefined = getSpcForOpplysning(opplysning.type);

    if (opplysningerSpc) {
        const opplysningKey: string = opplysningerSpc.textKey;
        const feilForOpplysning = getFeilForOpplysning(feil, opplysningKey);

        yield put(updateOpplysning(opplysning));

        if (feilForOpplysning.length === 0) {
            try {
                yield call(
                    fetchPut,
                    getOpplysningerUrl(behandlingsId),
                    JSON.stringify(transformToBackendOpplysning(opplysning))
                );
            } catch (reason) {
                if (reason.message === HttpStatus.UNAUTHORIZED) {
                    return;
                }
                const feilKode = detekterInternFeilKode(reason.toString());
                if (feilKode.toString() === "Error: Not Found") {
                    for (let i = 0; i < opplysning.radInnhold.length; i++) {
                        // Setter alle felt til feilet!
                        const validationKey = `${opplysningerSpc.textKey}.${opplysning.radInnhold[i]}.${i}`;
                        yield put(setValideringsfeil(ValideringsFeilKode.FELT_EKSISTERER_IKKE, validationKey));
                    }
                    yield put(setValideringsfeil(ValideringsFeilKode.FELT_EKSISTERER_IKKE, opplysning.type));
                } else {
                    yield call(logWarning, "Lagring av økonomisk opplysning feilet. Reason: " + reason);
                    window.location.href = "/sosialhjelp/soknad/feil";
                }
            }
        }
    } else {
        yield call(logWarning, "Ukjent opplysningstype mottatt. Type: " + opplysning.type);
    }
}

function* opplysningerSaga(): SagaIterator {
    yield takeEvery(opplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG, lagreOpplysningHvisGyldigSaga);
}

export default opplysningerSaga;
