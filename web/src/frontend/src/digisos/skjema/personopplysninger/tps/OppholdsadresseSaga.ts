import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import {
	AdresseKategori,
	HentSoknadsmottakerAction,
	OppholdsadresseActionTypeKeys,
	settSoknadsmottakerStatus, SoknadsMottakerStatus
} from "./oppholdsadresseReducer";
import { navigerTilServerfeil } from "../../../../nav-soknad/redux/navigasjon/navigasjonActions";
import { loggFeil } from "../../../../nav-soknad/redux/navlogger/navloggerActions";
import { fetchToJson } from "../../../../nav-soknad/utils/rest-utils";
import { finnFaktum, oppdaterFaktumMedVerdier } from "../../../../nav-soknad/utils";
import { lagreFaktum, setFaktum } from "../../../../nav-soknad/redux/fakta/faktaActions";
import { Faktum } from "../../../../nav-soknad/types";
import { Adresse } from "./Oppholdsadresse";

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

export function oppdaterAdresse(adresseFaktum: Faktum, adresse: Adresse) {

	const properties = [
		"husnummer",
		"husbokstav",
		"kommunenummer",
		"kommunenavn",
		"postnummer",
		"poststed",
		"geografiskTilknytning",
	];

	properties.map((propertyName: string) => {
		adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, adresse[propertyName], propertyName);
	});

	const ADRESSE = "adresse";
	adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, adresse[ADRESSE], "gatenavn");

	adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, "gateadresse", "type");

	return adresseFaktum;
}

function* fetchOgSettSoknadsmottakerOgOppdaterStatus(
		brukerBehandlingId: any,
		oppholdsadressevalg: any,
		soknadsmottakerFaktum: Faktum): any {
	const url = `soknadsmottaker/${brukerBehandlingId}?valg=${oppholdsadressevalg}`;
	const response = yield call(fetchToJson, url);
	if (response && response.toString().length > 0) {
		// TODO: Støtte visning av dropdown med NAV-kontor hvis mer enn én blir returnert.
		yield put(lagreFaktum(oppdaterSoknadsMottaker(response, soknadsmottakerFaktum)));

		response.sosialOrgnr ?
			yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.GYLDIG)) :
			yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.UGYLDIG));

	} else {
		soknadsmottakerFaktum = nullUtSoknadsmottakerFaktum(soknadsmottakerFaktum);
		yield put(lagreFaktum(soknadsmottakerFaktum));
		yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.UGYLDIG));
	}
}

function* lagreAdresseOgSoknadsmottakerSaga(action: HentSoknadsmottakerAction): SagaIterator {
	try {
		const adresse = action.adresse;
		const oppholdsadresseFaktum = finnFaktum("kontakt.system.oppholdsadresse.valg", action.fakta);
		let adresseFaktum = finnFaktum("kontakt.adresse.bruker", action.fakta);
		const soknadsmottakerFaktum = finnFaktum("soknadsmottaker", action.fakta);

		if (action.adresseKategori === AdresseKategori.FOLKEREGISTRERT) {

			oppholdsadresseFaktum.value = "folkeregistrert";
			yield put(setFaktum(oppholdsadresseFaktum));
			yield put(lagreFaktum(oppholdsadresseFaktum));

			yield* fetchOgSettSoknadsmottakerOgOppdaterStatus(
				action.brukerBehandlingId,
				action.oppholdsadressevalg,
				soknadsmottakerFaktum);

		} else if (action.adresseKategori === AdresseKategori.MIDLERTIDIG) {
			oppholdsadresseFaktum.value = "midlertidig";
			yield put(setFaktum(oppholdsadresseFaktum));
			yield put(lagreFaktum(oppholdsadresseFaktum));

			yield* fetchOgSettSoknadsmottakerOgOppdaterStatus(
				action.brukerBehandlingId,
				action.oppholdsadressevalg,
				soknadsmottakerFaktum);

		} else if (action.adresseKategori === AdresseKategori.SOKNAD) {
			oppholdsadresseFaktum.value = "soknad";
			yield put(setFaktum(oppholdsadresseFaktum));
			yield put(lagreFaktum(oppholdsadresseFaktum));

			if (adresse) {
				adresseFaktum = oppdaterAdresse(adresseFaktum, adresse);
				yield put(setFaktum(adresseFaktum));
				yield put(lagreFaktum(adresseFaktum));

				yield* fetchOgSettSoknadsmottakerOgOppdaterStatus(
					action.brukerBehandlingId,
					action.oppholdsadressevalg,
					soknadsmottakerFaktum);

			} else {
				yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.IKKE_VALGT));
			}
		}

	} catch (reason) {
		console.error("Error in sage: " + reason.toString());
		yield put(loggFeil("Hent soknadsmottaker feilet: " + reason.toString()));
		yield put(navigerTilServerfeil());
	}
}

function* oppholdsadresseSaga(): SagaIterator {
	yield takeEvery(OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER, lagreAdresseOgSoknadsmottakerSaga);
}

export default oppholdsadresseSaga;
