import { call, put, takeEvery } from "redux-saga/effects";
import { ActionTypeKeys, TilgangApiResponse } from "./tilgangTypes";
import { fetchToJson } from "../../utils/rest-utils";
import {
	henterTilgang,
	hentetTilgang,
	hentTilgangFeilet
} from "./tilgangActions";

function* hentTilgangSaga(): IterableIterator<any> {
	try {
		yield put(henterTilgang());
		const response: TilgangApiResponse = yield call(
			fetchToJson,
			"informasjon/utslagskriterier/adresse"
		);
		yield put(hentetTilgang(response.pilotSosialhjelp));
	} catch (reason) {
		yield put(hentTilgangFeilet(reason));
	}
}

function* tilgangSaga() {
	yield takeEvery(ActionTypeKeys.INIT, hentTilgangSaga);
}

export default tilgangSaga;
