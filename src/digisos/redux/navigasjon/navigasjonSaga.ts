import {call, put, select, takeEvery} from "redux-saga/effects";
import {SagaIterator} from "redux-saga";
import {GaTilbake, GaVidere, NavigasjonActionTypes, Sider, TilDittNav, TilKvittering, TilSteg} from "./navigasjonTypes";
import {tilStart, tilSteg} from "./navigasjonActions";
import {lesKommunenrFraUrl} from "../../../nav-soknad/utils";
import {push} from "connected-react-router";
import {State} from "../reducers";

const navigateTo = (path: string) => (window.location.href = path);

function* tilFinnDittNavKontorSaga(): SagaIterator {
    yield call(navigateTo, Sider.FINN_DITT_NAV_KONTOR);
}

function* tilStartSaga(): SagaIterator {
    yield call(navigateTo, Sider.START);
}

function* tilStegSaga(action: TilSteg): SagaIterator {
    const {behandlingsId, stegnummer} = action;
    let url = `/skjema/${behandlingsId}/${stegnummer}`;
    const kommunenr = lesKommunenrFraUrl();
    if (kommunenr) {
        url = url + "?kommunenr=" + kommunenr;
    }
    yield put(push(url));
}

function* gaVidereSaga(action: GaVidere): SagaIterator {
    yield put(tilSteg(action.stegnummer + 1, action.behandlingsId));
}

function* gaTilbakeSaga(action: GaTilbake): SagaIterator {
    if (action.stegnummer === 1) {
        yield put(tilStart());
    } else {
        yield put(tilSteg(action.stegnummer - 1, action.behandlingsId));
    }
}

function* tilDittNav(action: TilDittNav): SagaIterator {
    const url = yield select((state: State) => state.miljovariabler.data["dittnav.link.url"]);
    yield call(navigateTo, url);
}

function* tilEttersendelse(action: TilKvittering): SagaIterator {
    yield put(push(`/skjema/${action.brukerbehandlingId}/ettersendelse`));
}

function* navigasjonSaga(): SagaIterator {
    yield takeEvery(NavigasjonActionTypes.TIL_STEG, tilStegSaga);
    yield takeEvery(NavigasjonActionTypes.GA_VIDERE, gaVidereSaga);
    yield takeEvery(NavigasjonActionTypes.GA_TILBAKE, gaTilbakeSaga);
    yield takeEvery(NavigasjonActionTypes.TIL_FINN_DITT_NAV_KONTOR, tilFinnDittNavKontorSaga);
    yield takeEvery(NavigasjonActionTypes.TIL_START, tilStartSaga);
    yield takeEvery(NavigasjonActionTypes.TIL_DITT_NAV, tilDittNav);
    yield takeEvery(NavigasjonActionTypes.TIL_KVITTERING, tilEttersendelse);
}

export {gaVidereSaga, navigateTo, tilFinnDittNavKontorSaga, tilEttersendelse, tilStegSaga};

export default navigasjonSaga;
