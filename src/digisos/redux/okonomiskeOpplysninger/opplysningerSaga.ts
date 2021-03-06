import {LagreOpplysningHvisGyldig, opplysningerActionTypeKeys, OpplysningSpc} from "./opplysningerTypes";
import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {getOpplysningerUrl, getSpcForOpplysning, transformToBackendOpplysning} from "./opplysningerUtils";
import {fetchPut, HttpStatus} from "../../../nav-soknad/utils/rest-utils";
import {updateOpplysning} from "./opplysningerActions";
import {Valideringsfeil, ValideringsFeilKode} from "../validering/valideringActionTypes";
import {showServerFeil} from "../soknad/soknadActions";
import {REST_FEIL} from "../soknad/soknadTypes";
import {detekterInternFeilKode} from "../fil/filSaga";
import {setValideringsfeil} from "../validering/valideringActions";
import {logWarning} from "../../../nav-soknad/utils/loggerUtils";

export function getFeilForOpplysning(feil: Valideringsfeil[], opplysningTextKey: string) {
    return feil.filter((f: Valideringsfeil) => {
        return f.faktumKey.indexOf(opplysningTextKey) > -1;
    });
}

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
                let feilKode: REST_FEIL = detekterInternFeilKode(reason.toString());
                if (feilKode.toString() === "Error: Not Found") {
                    for (let i = 0; i < opplysning.radInnhold.length; i++) {
                        // Setter alle felt til feilet!
                        const validationKey: string = `${opplysningerSpc.textKey}.${opplysning.radInnhold[i]}.${i}`;
                        yield put(setValideringsfeil(ValideringsFeilKode.FELT_EKSISTERER_IKKE, validationKey));
                    }
                    yield put(setValideringsfeil(ValideringsFeilKode.FELT_EKSISTERER_IKKE, opplysning.type));
                } else {
                    yield call(logWarning, "Lagring av økonomisk opplysning feilet. Reason: " + reason);
                    yield put(showServerFeil(true));
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
