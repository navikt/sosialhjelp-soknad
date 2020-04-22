import {call, put, select, takeEvery} from "redux-saga/effects";
import {OppsummeringActionTypeKeys} from "./oppsummeringTypes";
import {fetchOppsummering, HttpStatus} from "../../../nav-soknad/utils/rest-utils";
import {hentOppsumeringFeilet, setOppsumering} from "./oppsummeringActions";
import {State} from "../reducers";

function* hentOppsummeringSaga() {
    try {
        const behandlingsID = yield select((state: State) => state.soknad.behandlingsId);
        const response = yield call(fetchOppsummering, `soknader/${behandlingsID}/`);
        yield put(setOppsumering(response));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield put(hentOppsumeringFeilet(reason));
    }
}

function* oppsummeringSaga() {
    yield takeEvery(OppsummeringActionTypeKeys.HENT_OPPSUMMERING, hentOppsummeringSaga);
}

export {hentOppsummeringSaga};

export default oppsummeringSaga;
