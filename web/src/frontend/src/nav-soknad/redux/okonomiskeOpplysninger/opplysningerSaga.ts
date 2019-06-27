import {
    LagreOpplysningHvisGyldig,
    opplysningerActionTypeKeys, OpplysningSpc
} from "./opplysningerTypes";
import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {
    getOpplysningerUrl, getSpcForOpplysning,
    transformToBackendOpplysning,
} from "./opplysningerUtils";
import {fetchPut} from "../../utils/rest-utils";
import {navigerTilServerfeil} from "../navigasjon/navigasjonActions";
import {updateOpplysning} from "./opplysningerActions";
import {loggFeil} from "../navlogger/navloggerActions";
import {Valideringsfeil} from "../valideringActionTypes";


export function getFeilForOpplysning(feil: Valideringsfeil[], opplysningTextKey: string) {
    return feil.filter((f: Valideringsfeil) => {
        return f.faktumKey.indexOf(opplysningTextKey) > -1;
    });
}

function* lagreOpplysningHvisGyldigSaga(action: LagreOpplysningHvisGyldig) {

    const {behandlingsId, opplysning, feil} = action;
    const opplysningerSpc: OpplysningSpc | undefined = getSpcForOpplysning(opplysning.type);

    if (opplysningerSpc){
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
            } catch (e) {
                yield put(loggFeil("Lagring av økonomisk opplysning feilet. Reason: " + e));
                yield put(navigerTilServerfeil());
            }
        }
    } else {
        yield put(loggFeil("Ukjent opplysningstype mottatt. Type: " + opplysning.type))
    }
}

function* opplysningerSaga(): SagaIterator {
    yield takeEvery(opplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG, lagreOpplysningHvisGyldigSaga);
}

export default opplysningerSaga;
