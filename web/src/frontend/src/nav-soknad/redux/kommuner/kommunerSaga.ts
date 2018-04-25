import { SagaIterator } from "redux-saga";
import { loggFeil } from "../navlogger/navloggerActions";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchToJson } from "../../utils/rest-utils";
import { navigerTilServerfeil } from "../navigasjon/navigasjonActions";
import { KommunerActionTypeKeys, KommunerActionTypes } from "./kommunerTypes";
import { lesKommunerOk } from "./kommuneActions";

function* lesKommunerSaga(action: KommunerActionTypes): SagaIterator {
	try {
		const url = `informasjon/kommunevalg`;
		const response = yield call(fetchToJson, url);
		if (response) {
			yield put(lesKommunerOk(response));
		}
	} catch (reason) {
		yield put(loggFeil("Lese inn kommuner feilet: " + reason.toString()));
		yield put(navigerTilServerfeil());
	}
}

function* kommunerSaga(): SagaIterator {
	yield takeEvery(KommunerActionTypeKeys.LES_KOMMUNER, lesKommunerSaga);
}

export default kommunerSaga;
