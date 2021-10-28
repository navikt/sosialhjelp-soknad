import {call, put, takeEvery} from "redux-saga/effects";
import {SagaIterator} from "redux-saga";
import {GaTilbake, GaVidere, NavigasjonActionTypes, Sider, TilKvittering, TilSteg} from "./navigasjonTypes";
import {tilStart, tilSteg} from "./navigasjonActions";
import {lesKommunenrFraUrl} from "../../../nav-soknad/utils";
import {push} from "connected-react-router";

const navigateTo = (path: string) => (window.location.href = path);

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

function* tilEttersendelse(action: TilKvittering): SagaIterator {
    yield put(push(`/skjema/${action.brukerbehandlingId}/ettersendelse`));
}

function* navigasjonSaga(): SagaIterator {
    yield takeEvery(NavigasjonActionTypes.TIL_STEG, tilStegSaga);
    yield takeEvery(NavigasjonActionTypes.GA_VIDERE, gaVidereSaga);
    yield takeEvery(NavigasjonActionTypes.GA_TILBAKE, gaTilbakeSaga);
    yield takeEvery(NavigasjonActionTypes.TIL_START, tilStartSaga);
    yield takeEvery(NavigasjonActionTypes.TIL_KVITTERING, tilEttersendelse);
}

export {gaVidereSaga, navigateTo, tilEttersendelse, tilStegSaga};

export default navigasjonSaga;
