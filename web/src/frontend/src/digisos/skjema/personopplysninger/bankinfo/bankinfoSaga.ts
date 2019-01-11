import { SagaIterator } from "redux-saga";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchPut, fetchToJson } from "../../../../nav-soknad/utils/rest-utils";
import { navigerTilServerfeil } from "../../../../nav-soknad/redux/navigasjon/navigasjonActions";
import { BankinfoActionTypeKeys, LesBankinfoAction, lesBankinfoOk, OppdaterBankinfoAction } from "./bankinfoReducer";
import { selectBrukerBehandlingId } from "../../../../nav-soknad/redux/selectors";

function* lesBankinfoSaga(action: LesBankinfoAction): SagaIterator {
	try {
		const brukerBehandlingId = yield select(selectBrukerBehandlingId);
		const url = `soknader/${brukerBehandlingId}/personalia/kontonummer`;
		const response: any = yield call(fetchToJson, url);
		yield put(lesBankinfoOk(response.verdi));

	} catch (reason) {
		yield put(navigerTilServerfeil());
	}
}

function* oppdaterBankinfoSaga(action: OppdaterBankinfoAction): SagaIterator {
	try {
		const payload: string = JSON.stringify(
			{brukerdefinert: true, systemverdi: action.verdi, verdi: action.verdi, harIkkeKonto: false}
		);
		const brukerBehandlingId = yield select(selectBrukerBehandlingId);
		const url = `soknader/${brukerBehandlingId}/personalia/kontonummer`;
		yield call(fetchPut, url, payload);
	} catch (reason) {
		yield put(navigerTilServerfeil());
	}
}

function* bankinfoSaga(): SagaIterator {
	yield takeEvery(BankinfoActionTypeKeys.LES_BANKINFO, lesBankinfoSaga);
	yield takeEvery(BankinfoActionTypeKeys.OPPDATER_BANKINFO, oppdaterBankinfoSaga);
}

export default bankinfoSaga;
