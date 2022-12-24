import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {fetchPost, fetchToJson, getInnsynUrl, HttpStatus} from "../../../nav-soknad/utils/rest-utils";
import {
    FinnOgOppdaterSoknadsmottakerStatus,
    GetErSystemdataEndret,
    HentSamtykker,
    Samtykke,
    SendSoknadAction,
    SoknadActionTypeKeys,
} from "./soknadActionTypes";

import {
    hentSamtykkerOk,
    oppdaterSoknadsmottakerStatus,
    opprettSoknadFeilet,
    opprettSoknadOk,
    sendSoknadOk,
    setErSystemdataEndret,
    setSendSoknadServiceUnavailable,
    showSendingFeiletPanel,
    setShowServerError,
    setShowPageNotFound,
    startSoknadOk,
    startSoknadServiceUnavailable,
    visMidlertidigDeaktivertPanel,
    visNedetidPanel,
} from "./soknadActions";
import {NavEnhet} from "../../skjema/personopplysninger/adresse/AdresseTypes";
import {SoknadsSti} from "../soknadsdata/soknadsdataReducer";
import {OpprettSoknadResponse, SendSoknadResponse} from "./soknadTypes";
import {soknadsdataUrl} from "../soknadsdata/soknadsdataActions";
import {logInfo, logWarning} from "../../../nav-soknad/utils/loggerUtils";
import {getStegUrl} from "../../../nav-soknad/utils";
import {History} from "history";

enum SendtTilSystemEnum {
    SVARUT = "SVARUT",
    FIKS_DIGISOS_API = "FIKS_DIGISOS_API",
}

function* opprettSoknadSaga(action: {type: string; history: History}) {
    try {
        const response: OpprettSoknadResponse = yield call(fetchPost, "soknader/opprettSoknad", "", true);
        yield put(opprettSoknadOk(response.brukerBehandlingId));
        yield put(startSoknadOk());
        action.history.push(getStegUrl(response.brukerBehandlingId, 1));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        } else if (reason.message === HttpStatus.SERVICE_UNAVAILABLE) {
            yield call(logWarning, "opprettSoknadSaga ServiceUnavailable: " + reason);
            yield put(visNedetidPanel(true));
            yield put(startSoknadServiceUnavailable());
        } else {
            yield call(logWarning, "opprett soknad saga feilet: " + reason);
            yield put(setShowServerError(true));
            yield put(opprettSoknadFeilet());
        }
    }
}

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
            yield put(visNedetidPanel(true));
            yield put(startSoknadServiceUnavailable());
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
        if (response && response.sendtTil === SendtTilSystemEnum.FIKS_DIGISOS_API) {
            window.location.href = getInnsynUrl() + response.id + "/status";
        } else if (response && response.id) {
            action.history.push(`/skjema/${response.id}/ettersendelse`);
        } else {
            action.history.push(`/skjema/${action.behandlingsId}/ettersendelse`);
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        } else if (reason.message === HttpStatus.SERVICE_UNAVAILABLE) {
            yield put(visMidlertidigDeaktivertPanel(true));
            yield put(setSendSoknadServiceUnavailable());
        } else {
            yield call(logWarning, "send soknad saga feilet: " + reason);
            yield put(showSendingFeiletPanel(true));
        }
    }
}

function* finnOgOppdaterSoknadsmottakerStatusSaga(action: FinnOgOppdaterSoknadsmottakerStatus) {
    const {brukerbehandlingId} = action;

    try {
        const navenheter: NavEnhet[] = yield call(
            fetchToJson,
            `soknader/${brukerbehandlingId}/${SoknadsSti.NAV_ENHETER}`
        );
        const valgtSoknadsmottaker: NavEnhet | undefined = navenheter.find((n: NavEnhet) => n.valgt);
        if (!valgtSoknadsmottaker || valgtSoknadsmottaker.isMottakMidlertidigDeaktivert) {
            yield call(
                logWarning,
                "Søknadsmottaker ikke gyldig på side 9, redirecter tilbake til side 1. Søknadsmottaker var " +
                    valgtSoknadsmottaker
            );
            action.history.push(`/skjema/${brukerbehandlingId}/1`);
        } else {
            yield put(oppdaterSoknadsmottakerStatus(valgtSoknadsmottaker));
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield call(
            logWarning,
            "feil i finnOgOppdaterSoknadsmottakerStatusSaga på side 9. Sender brukeren tilbake til steg 1 og håper dette ikke blir en infinite loop. Error message: " +
                reason
        );
        action.history.push(`/skjema/${brukerbehandlingId}/1`);
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
    yield takeEvery(SoknadActionTypeKeys.OPPRETT_SOKNAD, opprettSoknadSaga);
    yield takeEvery(SoknadActionTypeKeys.HENT_SAMTYKKE, hentSamtykker);
    yield takeEvery(SoknadActionTypeKeys.OPPDATER_SAMTYKKE, oppdaterSamtykke);

    yield takeEvery(SoknadActionTypeKeys.SEND_SOKNAD, sendSoknadSaga);
    yield takeEvery(
        SoknadActionTypeKeys.FINN_OG_OPPDATER_SOKNADSMOTTAKER_STATUS,
        finnOgOppdaterSoknadsmottakerStatusSaga
    );
    yield takeEvery(SoknadActionTypeKeys.GET_ER_SYSTEMDATA_ENDRET, getErSystemdataEndretSaga);
}

export default soknadSaga;
