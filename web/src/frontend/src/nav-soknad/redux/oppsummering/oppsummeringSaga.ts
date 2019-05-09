import {call, put, select, takeEvery} from "redux-saga/effects";
import {OppsummeringActionTypeKeys} from "./oppsummeringTypes";
import {selectBrukerBehandlingId} from "../selectors";
import {fetchOppsummering, fetchToJson} from "../../utils/rest-utils";
import {hentOppsumeringFeilet, setErSystemdataEndret, setOppsumering} from "./oppsummeringActions";

function* hentOppsummeringSaga() {
    try {
        const behandlingsID = yield select(selectBrukerBehandlingId);
        const response = yield call(fetchOppsummering, `soknader/${behandlingsID}/`);
        yield put(setOppsumering(response));
    } catch (reason) {
        yield put(hentOppsumeringFeilet(reason));
    }
}

function* getErSystemdataEndretSaga() {
    try {
        const behandlingsID = yield select(selectBrukerBehandlingId);
        const urlPath = `soknader/${behandlingsID}/erSystemdataEndret`;
        const response = yield fetchToJson(urlPath);
        yield put(setErSystemdataEndret(response));
    } catch (e) {
        console.warn("getErSystemdataEndretSaga feilet: " + e.toString());
    }
}

function* oppsummeringSaga() {
    yield takeEvery(OppsummeringActionTypeKeys.HENT_OPPSUMMERING, hentOppsummeringSaga);
    yield takeEvery(OppsummeringActionTypeKeys.GET_ER_SYSTEMDATA_ENDRET, getErSystemdataEndretSaga)
}

export {
    hentOppsummeringSaga
};

export default oppsummeringSaga;
