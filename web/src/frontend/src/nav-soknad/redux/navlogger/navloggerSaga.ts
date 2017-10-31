import { call, takeEvery, put } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { fetchPost } from "../../../nav-soknad/utils/rest-utils";
import { ActionTypeKeys, NavLogInitAction } from "./navloggerTypes";
import { loggingTilServerFeilet, } from "./navloggerActions";

function* loggTilServerSaga(action: NavLogInitAction): SagaIterator {
	try {
		yield call(fetchPost, "actions/logg", JSON.stringify(action.logEntry));
	} catch (reason) {
		yield put( loggingTilServerFeilet() );
	}
}

function* navloggerSaga(): SagaIterator {
	yield takeEvery(ActionTypeKeys.INIT, loggTilServerSaga);
}

export {
	loggTilServerSaga
};

export default navloggerSaga;
