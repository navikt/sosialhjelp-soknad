import { call, put, select, takeEvery } from "redux-saga/effects";
import { OppsummeringActionTypeKeys } from "./oppsummeringTypes";
import { selectBrukerBehandlingId } from "../selectors";
import {fetchOppsummering, responseToText, sjekkStatusKodeSaga, statusCodeOk} from "../../utils/rest-utils";
import { hentOppsumeringFeilet, setOppsumering } from "./oppsummeringActions";

function* hentOppsummeringSaga() {
	try {
		const behandlingsID = yield select(selectBrukerBehandlingId);
		const response: Response = yield call( fetchOppsummering, `soknader/${behandlingsID}/` );

		yield* sjekkStatusKodeSaga(response);
		if (statusCodeOk(response)){
			const responseText: string = yield responseToText(response);
			yield put(setOppsumering(responseText));
		}
	} catch (reason) {
		yield put(hentOppsumeringFeilet(reason));
	}
}

function* oppsummeringSaga() {
	yield takeEvery(OppsummeringActionTypeKeys.HENT_OPPSUMMERING, hentOppsummeringSaga);
}

export {
	hentOppsummeringSaga
};

export default oppsummeringSaga;
