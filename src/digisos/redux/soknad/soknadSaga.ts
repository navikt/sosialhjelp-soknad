import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {fetchPost, fetchToJson, getInnsynUrl, HttpStatus} from "../../../nav-soknad/utils/rest-utils";
import {
    GetErSystemdataEndret,
    HentSamtykker,
    Samtykke,
    SendSoknadAction,
    SoknadActionTypeKeys,
} from "./soknadActionTypes";

import {
    hentSamtykkerOk,
    sendSoknadOk,
    setErSystemdataEndret,
    setSendSoknadServiceUnavailable,
    showSendingFeiletPanel,
    setShowServerError,
    setShowPageNotFound,
    startSoknadDone,
    visMidlertidigDeaktivertPanel,
    showDowntimeError,
} from "./soknadActions";
import {SoknadsSti} from "../soknadsdata/soknadsdataReducer";
import {SendSoknadResponse} from "./soknadTypes";
import {soknadsdataUrl} from "../soknadsdata/soknadsdataActions";
import {logInfo, logWarning} from "../../../nav-soknad/utils/loggerUtils";
import {getStegUrl} from "../../../nav-soknad/utils";
import {History} from "history";

export const SendtTilSystemEnum = {
    SVARUT: "SVARUT",
    FIKS_DIGISOS_API: "FIKS_DIGISOS_API",
} as const;

export type SoknadSendtTil = "SVARUT" | "FIKS_DIGISOS_API";

function* hentSamtykker(action: HentSamtykker) {
    try {
        const response: Samtykke[] = yield call(fetchToJson, `soknader/${action.behandlingsId}/hentSamtykker`);
        yield put(hentSamtykkerOk(response));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield call(logWarning, "hent samtykker saga feilet: " + reason);
        yield put(setShowPageNotFound(true));
    }
}

function* oppdaterSamtykke(action: {
    type: string;
    behandlingsId: string;
    harSamtykket: boolean;
    samtykker: Samtykke[];
    history: History;
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
        action.history.push(getStegUrl(action.behandlingsId, 1));
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

function* sendSoknadSaga(action: SendSoknadAction): SagaIterator {
    try {
        //@ts-ignore
        const response: SendSoknadResponse = yield call(
            fetchPost,
            `soknader/${action.behandlingsId}/actions/send`,
            JSON.stringify({behandlingsId: action.behandlingsId}),
            true
        );
        yield put(sendSoknadOk(action.behandlingsId));
        if (response?.sendtTil === SendtTilSystemEnum.FIKS_DIGISOS_API) {
            window.location.href = getInnsynUrl() + response.id + "/status";
        } else if (response && response.id) {
            action.history.push(`/skjema/${response.id}/ettersendelse`);
        } else {
            action.history.push(`/skjema/${action.behandlingsId}/ettersendelse`);
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;

        if (reason.message === HttpStatus.SERVICE_UNAVAILABLE) {
            yield put(visMidlertidigDeaktivertPanel(true));
            yield put(setSendSoknadServiceUnavailable());
        } else {
            yield call(logWarning, "send soknad saga feilet: " + reason);
            yield put(showSendingFeiletPanel(true));
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

    yield takeEvery(SoknadActionTypeKeys.SEND_SOKNAD, sendSoknadSaga);

    yield takeEvery(SoknadActionTypeKeys.GET_ER_SYSTEMDATA_ENDRET, getErSystemdataEndretSaga);
}

export default soknadSaga;
