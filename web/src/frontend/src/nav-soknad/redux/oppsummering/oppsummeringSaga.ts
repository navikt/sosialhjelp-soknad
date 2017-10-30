import { call, put, select, takeEvery } from "redux-saga/effects";
import { OppsummeringActionTypeKeys } from "./oppsummeringTypes";
import { selectBrukerBehandlingId } from "../selectors";
import { fetchOppsummering } from "../../utils/rest-utils";
import { hentOppsumeringFeilet, setOppsumering } from "./oppsummeringActions";

function* hentOppsummeringSaga() {
	try {
		const behandlingsID = yield select(selectBrukerBehandlingId);
		const response = yield call( fetchOppsummering, `soknader/${behandlingsID}/` );
		yield put(setOppsumering(response));
	} catch (reason) {
		yield put(hentOppsumeringFeilet(reason));
	}
}

function* oppsummeringSaga() {
	yield takeEvery(OppsummeringActionTypeKeys.HENT_OPPSUMMERING, hentOppsummeringSaga);
}

export default oppsummeringSaga;
