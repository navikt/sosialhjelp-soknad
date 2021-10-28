import {call, put, takeEvery} from "redux-saga/effects";
import {SagaIterator} from "redux-saga";
import {NavigasjonActionTypes, Sider, TilKvittering} from "./navigasjonTypes";
import {push} from "connected-react-router";

const navigateTo = (path: string) => (window.location.href = path);

function* tilStartSaga(): SagaIterator {
    yield call(navigateTo, Sider.START);
}

function* tilEttersendelse(action: TilKvittering): SagaIterator {
    yield put(push(`/skjema/${action.brukerbehandlingId}/ettersendelse`));
}

function* navigasjonSaga(): SagaIterator {
    yield takeEvery(NavigasjonActionTypes.TIL_START, tilStartSaga);
    yield takeEvery(NavigasjonActionTypes.TIL_KVITTERING, tilEttersendelse);
}

export {navigateTo, tilEttersendelse};

export default navigasjonSaga;
