import {call, put, select, takeEvery} from "redux-saga/effects";
import {OppsummeringActionTypeKeys} from "./oppsummeringTypes";
import {fetchOppsummering, HttpStatus, fetchToJson} from "../../../nav-soknad/utils/rest-utils";
import {hentOppsumeringFeilet, setOppsumering, setNyOppsummering} from "./oppsummeringActions";
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

function* hentNyOppsummeringSaga() {
    try {
        const behandlingsId = yield select((state: State) => state.soknad.behandlingsId);
        const response = yield call(fetchToJson, `soknader/${behandlingsId}/oppsummering`);
        yield put(setNyOppsummering(response));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield put(hentOppsumeringFeilet(reason));
    }
}

function* oppsummeringSaga() {
    yield takeEvery(OppsummeringActionTypeKeys.HENT_OPPSUMMERING, hentOppsummeringSaga);
    yield takeEvery(OppsummeringActionTypeKeys.HENT_NY_OPPSUMMERING, hentNyOppsummeringSaga);
}

export {hentOppsummeringSaga};

export default oppsummeringSaga;
