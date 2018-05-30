import { SagaIterator } from "redux-saga";
import { loggFeil } from "../navlogger/navloggerActions";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchToJson } from "../../utils/rest-utils";
import { navigerTilServerfeil } from "../navigasjon/navigasjonActions";
import { AdresseAutocompleteActionTypeKeys, AdresseAutocompleteActionTypes } from "./adresseAutocompleteTypes";
import { lesAdresseAutocompleteOk } from "./kommuneActions";

function* lesAdresseAutocompleteSaga(action: AdresseAutocompleteActionTypes): SagaIterator {
	try {
		const url = `informasjon/kommunevalg`;
		const response = yield call(fetchToJson, url);
		if (response) {
			yield put(lesAdresseAutocompleteOk(response));
		}
	} catch (reason) {
		yield put(loggFeil("Lese inn navEnheter feilet: " + reason.toString()));
		yield put(navigerTilServerfeil());
	}
}

function* adresseAutocompleteSaga(): SagaIterator {
	yield takeEvery(AdresseAutocompleteActionTypeKeys.LES_ADRESSEAUTOCOMPLETE, lesAdresseAutocompleteSaga);
}

export default adresseAutocompleteSaga;
