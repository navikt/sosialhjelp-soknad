import { call, put, takeEvery } from "redux-saga/effects";
import { TilgangActionTypeKeys, TilgangApiResponse } from "./tilgangTypes";
import {fetchToJson, HttpStatus} from "../../utils/rest-utils";
import {
	henterTilgang,
	hentetTilgang,
	hentTilgangFeilet
} from "./tilgangActions";
import {loggAdvarsel} from "../navlogger/navloggerActions";

export function* hentTilgangSaga() {
	try {
		yield put(henterTilgang());
		const response: TilgangApiResponse = yield call(
			fetchToJson,
			"informasjon/utslagskriterier/sosialhjelp"
		);
		yield put(hentetTilgang(response.harTilgang, response.sperrekode));
	} catch (reason) {
		if (reason.message === HttpStatus.UNAUTHORIZED){
			yield put(loggAdvarsel("hentTilgangSaga: " + reason));
		} else {
			yield put(hentTilgangFeilet(reason));
		}
	}
}

function* tilgangSaga() {
	yield takeEvery(TilgangActionTypeKeys.INIT, hentTilgangSaga);
}

export default tilgangSaga;
