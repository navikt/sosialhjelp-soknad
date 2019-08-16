import { call, put, takeEvery } from "redux-saga/effects";
import {TilgangActionTypeKeys, TilgangApiResponse} from "./tilgangTypes";
import {fetchGet, responseToJson, sjekkStatusKodeSaga, statusCodeOk} from "../../utils/rest-utils";
import {
	henterTilgang, hentetTilgang, hentTilgangFeilet,
} from "./tilgangActions";

export function* hentTilgangSaga() {
	try {
		yield put(henterTilgang());
		const response: Response = yield call(
			fetchGet,
			"informasjon/utslagskriterier/sosialhjelp"
		);
		yield* sjekkStatusKodeSaga(response);
		if(statusCodeOk(response)){
			const tilgangApiResponse: TilgangApiResponse = yield responseToJson(response);
			yield put(hentetTilgang(tilgangApiResponse.harTilgang, tilgangApiResponse.sperrekode));
		}
	} catch (reason) {
		yield put(hentTilgangFeilet(reason));
	}
}

function* tilgangSaga() {
	yield takeEvery(TilgangActionTypeKeys.INIT, hentTilgangSaga);
}

export default tilgangSaga;
