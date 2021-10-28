import {call, takeEvery} from "redux-saga/effects";
import {SagaIterator} from "redux-saga";
import {NavigasjonActionTypes, Sider} from "./navigasjonTypes";

const navigateTo = (path: string) => (window.location.href = path);

function* tilStartSaga(): SagaIterator {
    yield call(navigateTo, Sider.START);
}

function* navigasjonSaga(): SagaIterator {
    yield takeEvery(NavigasjonActionTypes.TIL_START, tilStartSaga);
}

export {navigateTo};

export default navigasjonSaga;
