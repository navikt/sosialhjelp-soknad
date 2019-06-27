import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {
    fetchDelete,
    fetchKvittering,
    fetchPost, fetchToJson,
    lastNedForsendelseSomZipFilHvisMockMiljoEllerDev
} from "../../utils/rest-utils";
import {
    FinnOgOppdaterSoknadsmottakerStatus,
    HentKvitteringAction, HentSoknadAction,
    SendSoknadAction,
    SlettSoknadAction,
    SoknadActionTypeKeys, StartSoknadAction
} from "./soknadActionTypes";
import {
    navigerTilDittNav,
    navigerTilKvittering,
    navigerTilServerfeil,
    tilStart,
    tilSteg
} from "../navigasjon/navigasjonActions";

import {
    hentKvitteringOk, hentSoknadOk, oppdaterSoknadsmottakerStatus,
    opprettSoknadOk,
    resetSoknad,
    sendSoknadOk,
    slettSoknadOk,
    startSoknadOk
} from "./soknadActions";
import {loggFeil} from "../navlogger/navloggerActions";
import {NavEnhet} from "../../../digisos/skjema/personopplysninger/adresse/AdresseTypes";
import {SoknadsSti} from "../soknadsdata/soknadsdataReducer";
import {push} from "connected-react-router";

export interface OpprettSoknadResponse {
    brukerBehandlingId: string;
}

function* opprettSoknadSaga(): SagaIterator {
    try {
        yield put(resetSoknad());

        const response: OpprettSoknadResponse = yield call(
            fetchPost,
            "soknader/opprettSoknad", ""
        );
        yield put(opprettSoknadOk(response.brukerBehandlingId));
        yield put(startSoknadOk()); // TODO Rename metode navn
        yield put(tilSteg(1));
    } catch (reason) {
        yield put(loggFeil("opprett soknad saga feilet: " + reason));
        yield put(navigerTilServerfeil());
    }
}

function* hentSoknadSaga(action: HentSoknadAction): SagaIterator {
    try {
        const xsrfCookieIsOk: boolean = yield call(
            fetchToJson,
            `soknader/${action.brukerBehandlingId}/xsrfCookie`
        );
        yield put(hentSoknadOk(xsrfCookieIsOk, action.brukerBehandlingId));
    } catch (reason) {
        yield put(loggFeil("hent soknad saga feilet: " + reason));
        yield put(navigerTilServerfeil());
    }
}

function* startSoknadSaga(action: StartSoknadAction): SagaIterator {
    try {
        yield put(startSoknadOk());
        yield put(tilSteg(1));
    } catch (reason) {
        yield put(loggFeil("start soknad saga feilet: " + reason));
        yield put(navigerTilServerfeil());
    }
}

function* slettSoknadSaga(action: SlettSoknadAction): SagaIterator {
    try {
        yield call(fetchDelete, "soknader/" + action.brukerBehandlingId);
        yield put(slettSoknadOk());
        if (action.destinasjon === "START") {
            yield put(tilStart());
        } else {
            yield put(navigerTilDittNav());
        }
    } catch (reason) {
        yield put(loggFeil("slett soknad saga feilet: " + reason));
        yield put(navigerTilServerfeil());
    }
}

function* sendSoknadSaga(action: SendSoknadAction): SagaIterator {
    try {
        yield call(
            fetchPost,
            `soknader/${action.brukerBehandlingId}/actions/send`,
            JSON.stringify({behandlingsId: action.brukerBehandlingId})
        );
        lastNedForsendelseSomZipFilHvisMockMiljoEllerDev(action.brukerBehandlingId);
        yield put(sendSoknadOk(action.brukerBehandlingId));
        yield put(navigerTilKvittering(action.brukerBehandlingId));
    } catch (reason) {
        yield put(loggFeil("send soknad saga feilet: " + reason));
        yield put(navigerTilServerfeil());
    }
}

function* hentKvitteringSaga(action: HentKvitteringAction): SagaIterator {
    try {
        const kvittering = yield call(
            fetchKvittering,
            "soknader/" + action.brukerBehandlingId + "?sprak=nb_NO"
        );
        yield put(hentKvitteringOk(kvittering));
    } catch (reason) {
        yield put(loggFeil("hent kvittering saga feilet: " + reason));
        yield put(navigerTilServerfeil());
    }
}

function* finnOgOppdaterSoknadsmottakerStatusSaga(action: FinnOgOppdaterSoknadsmottakerStatus): SagaIterator {
    const {brukerbehandlingId} = action;

    try {
        const navenheter: NavEnhet[] = yield call(fetchToJson, `soknader/${brukerbehandlingId}/${SoknadsSti.NAV_ENHETER}`);
        const valgtSoknadsmottaker: NavEnhet | undefined = navenheter.find((n: NavEnhet) => n.valgt);
        if (!valgtSoknadsmottaker) {
            yield put(push(`/skjema/${brukerbehandlingId}/1`));
        } else {
            yield put(oppdaterSoknadsmottakerStatus(valgtSoknadsmottaker));
        }
    } catch (e) {
        yield call(loggFeil, "feil i finnOgOppdaterSoknadsmottakerStatusSaga på side 9. Sender brukeren tilbake til steg 1 og håper dette i blir en infinite loop. Error message: " + e);
        yield put(push(`/skjema/${brukerbehandlingId}/2`));
    }
}

export {
    opprettSoknadSaga,
    startSoknadSaga,
    sendSoknadSaga,
    hentKvitteringSaga,
    slettSoknadSaga
};

function* soknadSaga(): SagaIterator {
    yield takeEvery(SoknadActionTypeKeys.START_SOKNAD, startSoknadSaga);
    yield takeEvery(SoknadActionTypeKeys.OPPRETT_SOKNAD, opprettSoknadSaga);
    yield takeEvery(SoknadActionTypeKeys.HENT_SOKNAD, hentSoknadSaga);
    yield takeEvery(SoknadActionTypeKeys.SLETT_SOKNAD, slettSoknadSaga);
    yield takeEvery(SoknadActionTypeKeys.SEND_SOKNAD, sendSoknadSaga);
    yield takeEvery(SoknadActionTypeKeys.HENT_KVITTERING, hentKvitteringSaga);
    yield takeEvery(SoknadActionTypeKeys.FINN_OG_OPPDATER_SOKNADSMOTTAKER_STATUS, finnOgOppdaterSoknadsmottakerStatusSaga);
}

export default soknadSaga;
