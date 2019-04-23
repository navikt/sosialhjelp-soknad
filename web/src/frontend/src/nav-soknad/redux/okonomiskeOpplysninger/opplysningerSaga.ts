import {
    LagreOpplysningHvisGyldig,
    OkonomiskeOpplysningerActionTypeKeys,
} from "./opplysningerTypes";
import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {
    getOkonomomiskeOpplysningerUrl, getSpcForOpplysning,
    transformToBackendOpplysning,
} from "./okonomiskeOpplysningerUtils";
import {fetchPut} from "../../utils/rest-utils";
import {navigerTilServerfeil} from "../navigasjon/navigasjonActions";
import {Valideringsfeil} from "../../validering/types";
import {updateOpplysning} from "./OkonomiskeOpplysningerActions";


function getFeilForOpplysning(feil: Valideringsfeil[], opplysningTextKey: string) {
    return feil.filter((f: Valideringsfeil) => {
        return f.faktumKey.indexOf(opplysningTextKey) > -1;
    });
}

function* lagreOpplysningHvisGyldigSaga(action: LagreOpplysningHvisGyldig) {

    const {behandlingsId, opplysning, feil} = action;
    const opplysningerSpc = getSpcForOpplysning(opplysning.type);
    const opplysningKey: string = opplysningerSpc.textKey;
    const feilForOpplysning = getFeilForOpplysning(feil, opplysningKey);

    yield put(updateOpplysning(opplysning));

    if (feilForOpplysning.length === 0) {
        try {
            yield call(
                fetchPut,
                getOkonomomiskeOpplysningerUrl(behandlingsId),
                JSON.stringify(transformToBackendOpplysning(opplysning))
            );
        } catch (e) {
            yield put(navigerTilServerfeil());
        }
    }
}


function* opplysningerSaga(): SagaIterator {
    yield takeEvery(OkonomiskeOpplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG, lagreOpplysningHvisGyldigSaga);
}

export default opplysningerSaga;