import { call, put, takeEvery } from "redux-saga/effects";
import { TilgangActionTypeKeys, TilgangApiResponse } from "./tilgangTypes";
import { fetchToJson } from "../../utils/rest-utils";
import {
	henterTilgang,
	hentetTilgang,
	hentTilgangFeilet
} from "./tilgangActions";

function* initSaga(): IterableIterator<any> {
	try {
		yield put(henterTilgang());
		yield put(hentetTilgang());
	} catch (reason) {
		yield put(hentTilgangFeilet(reason));
	}
}

function* tilgangSaga() {
	yield takeEvery(TilgangActionTypeKeys.INIT, hentTilgangSaga);
}

export default tilgangSaga;
