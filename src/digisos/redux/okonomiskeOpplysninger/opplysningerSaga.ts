import {getOpplysningRows, LagreOpplysningHvisGyldig, opplysningerActionTypeKeys} from "./opplysningerTypes";
import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {getOpplysningerUrl, getSpcForOpplysning, transformToBackendOpplysning} from "./opplysningerUtils";
import {DigisosLegacyRESTError, fetchPut} from "../../../nav-soknad/utils/rest-utils";
import {updateOpplysning} from "./opplysningerActions";
import {Valideringsfeil, ValideringsFeilKode} from "../validering/valideringActionTypes";
import {setValideringsfeil} from "../validering/valideringActions";
import {logError, logWarning} from "../../../nav-soknad/utils/loggerUtils";

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

    try {
        yield call(
            fetchPut,
            getOpplysningerUrl(behandlingsId),
            JSON.stringify(transformToBackendOpplysning(opplysning))
        );
    } catch (reason) {
        if (!(reason instanceof DigisosLegacyRESTError)) {
            logWarning(`Uventet exception ${reason} i lagreOpplysningHvisGyldigSaga`);
            return;
        }

        const {status} = reason;

        if ([401, 409].includes(status)) {
            // can't happen
            logWarning(`lagreOpplysningHvisGyldigSaga fikk ${status}. Skulle vært håndtert før vi ser det.`);
            return;
        }

        if (status === 404) {
            const radInnhold = getOpplysningRows(opplysning);
            for (let i = 0; i < radInnhold.length; i++) {
                // Setter alle felt til feilet!
                const validationKey = `${textKey}.${radInnhold[i]}.${i}`;
                yield put(setValideringsfeil(ValideringsFeilKode.FELT_EKSISTERER_IKKE, validationKey));
            }

            yield put(setValideringsfeil(ValideringsFeilKode.FELT_EKSISTERER_IKKE, opplysning.type));
            return;
        }

        yield call(logWarning, "Lagring av økonomisk opplysning feilet. Reason: " + reason);

        setTimeout(() => {
            window.location.href = "/sosialhjelp/soknad/feil?reason=lagreOpplysningHvisGyldigSaga";
        }, 1000);
    }
}

function* opplysningerSaga(): SagaIterator {
    yield takeEvery(opplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG, lagreOpplysningHvisGyldigSaga);
}

export default opplysningerSaga;
