import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { HentSoknadsmottakerAction, OppholdsadresseActionTypeKeys } from "./oppholdsadresseReducer";
import { navigerTilServerfeil } from "../../../../nav-soknad/redux/navigasjon/navigasjonActions";
import { loggFeil } from "../../../../nav-soknad/redux/navlogger/navloggerActions";
import { fetchToJson } from "../../../../nav-soknad/utils/rest-utils";
import { oppdaterFaktumMedVerdier } from "../../../../nav-soknad/utils";
import { lagreFaktum } from "../../../../nav-soknad/redux/fakta/faktaActions";
import { Faktum } from "../../../../nav-soknad/types";

function oppdaterSoknadsMottaker(soknadsmottaker: any, faktum: Faktum) {
	const properties = [
		"enhetsId",
		"enhetsnavn",
		"kommunenummer",
		"kommunenavn",
		"sosialOrgnr"
	];
	properties.map((property: string) => {
		let value = null;
		if (soknadsmottaker !== null) {
			value = soknadsmottaker[property];
		}
		faktum = oppdaterFaktumMedVerdier(faktum, value, property);
	});
	return faktum;
}

function* hentSoknadsmottakerSaga(action: HentSoknadsmottakerAction): SagaIterator {
	try {
		const url = `soknadsmottaker/${action.brukerBehandlingId}`;
		const response = yield call(fetchToJson, url);
		if (response && response.toString().length > 0) {
			yield put(lagreFaktum(oppdaterSoknadsMottaker(response, action.faktum)));
		} else {
			yield put(lagreFaktum(oppdaterSoknadsMottaker(null, action.faktum)));
		}
	} catch (reason) {
		yield put(loggFeil("Hent soknadsmottaker feilet: " + reason.toString()));
		yield put(navigerTilServerfeil());
	}
}

function* oppholdsadresseSaga(): SagaIterator {
	yield takeEvery(OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER, hentSoknadsmottakerSaga);
}

export default oppholdsadresseSaga;
