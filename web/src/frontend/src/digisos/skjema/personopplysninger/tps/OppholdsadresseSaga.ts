import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import {HentSoknadsmottakerAction, OppholdsadresseActionTypeKeys} from "./oppholdsadresseReducer";
import { navigerTilServerfeil } from "../../../../nav-soknad/redux/navigasjon/navigasjonActions";
import { loggFeil } from "../../../../nav-soknad/redux/navlogger/navloggerActions";
import { fetchToJson } from "../../../../nav-soknad/utils/rest-utils";

function* hentSoknadsmottakerSaga(action: HentSoknadsmottakerAction): SagaIterator {
	try {
		const url = `soknadsmottaker/${action.brukerBehandlingId}`;
		const response = yield call(fetchToJson, url);
		if (response) {
			console.warn("hentSoknadsmottakerSaga: " + JSON.stringify(response, null, 4));
			// yield put(settEttersendelser(response));
		}
	} catch (reason) {
		// yield put(lagreFaktumFeilet(reason));
		yield put(loggFeil("Lag ettersendelse feilet: " + reason.toString()));
		yield put(navigerTilServerfeil());
	}
}

function* oppholdsadresseSaga(): SagaIterator {
	yield takeEvery(OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER, hentSoknadsmottakerSaga);
}

export default oppholdsadresseSaga;