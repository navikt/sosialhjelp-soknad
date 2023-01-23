import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {fetchPost, fetchToJson, HttpStatus} from "../../../nav-soknad/utils/rest-utils";
import {GetErSystemdataEndret, HentSamtykker, Samtykke, SoknadActionTypeKeys} from "./soknadActionTypes";

import {
    hentSamtykkerOk,
    setErSystemdataEndret,
    setShowServerError,
    setShowPageNotFound,
    startSoknadDone,
    showDowntimeError,
} from "./soknadActions";
import {SoknadsSti} from "../soknadsdata/soknadsdataReducer";
import {soknadsdataUrl} from "../soknadsdata/soknadsdataActions";
import {logInfo, logWarning} from "../../../nav-soknad/utils/loggerUtils";

function* hentSamtykker(action: HentSamtykker) {
    try {
        const response: Samtykke[] = yield call(fetchToJson, `soknader/${action.behandlingsId}/hentSamtykker`);
        yield put(hentSamtykkerOk(response));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;
        yield call(logWarning, "hent samtykker saga feilet: " + reason);
        yield put(setShowPageNotFound(true));
    }
}

function* oppdaterSamtykke(action: {
    type: string;
    behandlingsId: string;
    harSamtykket: boolean;
    samtykker: Samtykke[];
}) {
    try {
        if (action.behandlingsId && action.harSamtykket) {
            yield call(
                fetchPost,
                soknadsdataUrl(action.behandlingsId, SoknadsSti.OPPDATER_SAMTYKKE),
                JSON.stringify(action.samtykker),
                true
            );
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        } else if (reason.message === HttpStatus.SERVICE_UNAVAILABLE) {
            yield call(logWarning, "oppdater samtykke saga ServiceUnavailable: " + reason);
            yield put(showDowntimeError(true));
            yield put(startSoknadDone());
        } else {
            yield call(logWarning, "oppdater samtykke saga feilet: " + reason);
            yield put(setShowServerError(true));
        }
    }
}

function* getErSystemdataEndretSaga(action: GetErSystemdataEndret) {
    try {
        const urlPath = `soknader/${action.behandlingsId}/erSystemdataEndret`;
        const response: boolean = yield fetchToJson(urlPath, true);
        if (response) {
            yield call(logInfo, "Systemdata var endret for brukeren.");
        }
        yield put(setErSystemdataEndret(response));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield put(setErSystemdataEndret(false));
        yield call(logWarning, "getErSystemdataEndretSaga feilet: " + reason);
    }
}

function* soknadSaga(): SagaIterator {
    yield takeEvery(SoknadActionTypeKeys.HENT_SAMTYKKE, hentSamtykker);
    yield takeEvery(SoknadActionTypeKeys.OPPDATER_SAMTYKKE, oppdaterSamtykke);
    yield takeEvery(SoknadActionTypeKeys.GET_ER_SYSTEMDATA_ENDRET, getErSystemdataEndretSaga);
}

export default soknadSaga;
