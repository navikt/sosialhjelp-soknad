import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import {
	HentSoknadsmottakerAction,
	OppholdsadresseActionTypeKeys,
	settSoknadsmottakerStatus, SoknadsMottakerStatus
} from "./oppholdsadresseReducer";
import { navigerTilServerfeil } from "../../../../nav-soknad/redux/navigasjon/navigasjonActions";
import { loggFeil } from "../../../../nav-soknad/redux/navlogger/navloggerActions";
import { fetchToJson } from "../../../../nav-soknad/utils/rest-utils";
import { finnFaktum, oppdaterFaktumMedVerdier } from "../../../../nav-soknad/utils";
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

export function nullUtSoknadsmottakerFaktum(soknadsmottakerFaktum: Faktum) {
	const properties = ["enhetsId", "enhetsnavn", "kommunenummer", "kommunenavn", "bydelsnummer", "sosialOrgnr"];
	properties.map((propertyName: string) => {
		soknadsmottakerFaktum = oppdaterFaktumMedVerdier(soknadsmottakerFaktum, null, propertyName);
	});
	return soknadsmottakerFaktum;
}

function* hentSoknadsmottakerSaga(action: HentSoknadsmottakerAction): SagaIterator {
	try {
		if (action.adresse) {
			yield put(lagreFaktum(action.adresseFaktum));
			const url = `soknadsmottaker/${action.brukerBehandlingId}`;
			const response = yield call(fetchToJson, url);
			if (response && response.toString().length > 0) {
				yield put(lagreFaktum(oppdaterSoknadsMottaker(response, action.soknadsmottakerFaktum)));
				yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.GYLDIG));
			} else {
				let soknadsmottakerFaktum = finnFaktum("soknadsmottaker", action.fakta);
				soknadsmottakerFaktum = nullUtSoknadsmottakerFaktum(soknadsmottakerFaktum);
				yield put(lagreFaktum(soknadsmottakerFaktum));
				yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.UGYLDIG));
			}
		} else {
			let adresseFaktum = finnFaktum("kontakt.adresse.bruker", action.fakta);

			adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "postnummer");
			adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "husbokstav");
			adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "husnummer");
			adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "kommunenummer");
			adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "gatenavn");
			adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "type");
			adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "geografiskTilknytning");
			adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "poststed");

			let soknadsmottakerFaktum = finnFaktum("soknadsmottaker", action.fakta);
			soknadsmottakerFaktum = nullUtSoknadsmottakerFaktum(soknadsmottakerFaktum);
			yield put(lagreFaktum(adresseFaktum));
			yield put(lagreFaktum(soknadsmottakerFaktum));
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
