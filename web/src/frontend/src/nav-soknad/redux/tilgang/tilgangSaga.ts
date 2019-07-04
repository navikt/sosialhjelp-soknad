import { call, put, takeEvery } from "redux-saga/effects";
import { TilgangActionTypeKeys, TilgangApiResponse } from "./tilgangTypes";
import { fetchToJson } from "../../utils/rest-utils";
import {
	henterTilgang,
	hentetTilgang,
	hentTilgangFeilet
} from "./tilgangActions";

function* hentTilgangSaga() {
	try {
		yield put(henterTilgang());
		const response: TilgangApiResponse = yield call(
			fetchToJson,
			"informasjon/utslagskriterier/sosialhjelp"
		);
		yield put(hentetTilgang(response.harTilgang, response.sperrekode));
	} catch (reason) {
		yield put(hentTilgangFeilet(reason));
	}
}

function* tilgangSaga() {
	yield takeEvery(TilgangActionTypeKeys.INIT, hentTilgangSaga);
}

export default tilgangSaga;
