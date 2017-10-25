import { put, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { push } from "react-router-redux";
import { NavigasjonActionTypes, Sider } from "./navigasjonTypes";

function* tilServerfeilSaga(): SagaIterator {
	yield put( push(Sider.SERVERFEIL ));
}

function* navigasjonSaga(): SagaIterator {
	yield takeEvery(NavigasjonActionTypes.TIL_SERVERFEIL, tilServerfeilSaga);
}

export default navigasjonSaga;
