import { call, put, select, takeEvery } from "redux-saga/effects";
import { OppsummeringActionTypeKeys } from "./oppsummeringTypes";
import { selectBrukerBehandlingId } from "../selectors";
import {fetchOppsummering, HttpStatus} from "../../utils/rest-utils";
import { hentOppsumeringFeilet, setOppsumering } from "./oppsummeringActions";
import {loggAdvarsel} from "../navlogger/navloggerActions";

function* hentOppsummeringSaga() {
	try {
		const behandlingsID = yield select(selectBrukerBehandlingId);
		const response = yield call( fetchOppsummering, `soknader/${behandlingsID}/` );
		yield put(setOppsumering(response));
	} catch (reason) {
		if (reason.message === HttpStatus.UNAUTHORIZED){
			yield put(loggAdvarsel("opprettEttersendelseSaga: " + reason));
		} else {
			yield put(hentOppsumeringFeilet(reason))
		}
	}
}

function* oppsummeringSaga() {
	yield takeEvery(OppsummeringActionTypeKeys.HENT_OPPSUMMERING, hentOppsummeringSaga);
}

export {
	hentOppsummeringSaga
};

export default oppsummeringSaga;
