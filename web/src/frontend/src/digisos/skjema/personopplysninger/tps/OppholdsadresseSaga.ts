import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import {
	AdresseKategori,
	HentSoknadsmottakerAction,
	OppholdsadresseActionTypeKeys,
	settSoknadsmottakerStatus, SoknadsMottakerStatus
} from "./oppholdsadresseReducer";
import { navigerTilServerfeil } from "../../../../nav-soknad/redux/navigasjon/navigasjonActions";
import { loggFeil, loggInfo } from "../../../../nav-soknad/redux/navlogger/navloggerActions";
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

function* lagreAdresseOgSoknadsmottakerSaga(action: HentSoknadsmottakerAction): SagaIterator {
	try {
		if (action.adresseKategori === AdresseKategori.FOLKEREGISTRERT) {
			const oppholdsadresseFaktum = finnFaktum("kontakt.system.oppholdsadresse.valg", action.fakta);
			oppholdsadresseFaktum.value = "folkeregistrert";
			yield put(loggInfo("lagre folkeregistrert oppholdsadresse...."));
			yield put(lagreFaktum(oppholdsadresseFaktum));
		}

		// TODO Fjerne denne if testen!
		if (12 > 14) {
			yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.IKKE_VALGT));

			if (action.oppholdsadressevalg === "soknad") {
				if (action.adresseFaktum != null
						&& (action.adresseFaktum.properties as any).gatenavn != null
						&& (action.adresseFaktum.properties as any).gatenavn.trim() !== "") {
					yield put(lagreFaktum(action.adresseFaktum));
				} else {
					let soknadsmottakerFaktum = finnFaktum("soknadsmottaker", action.fakta);
					soknadsmottakerFaktum = nullUtSoknadsmottakerFaktum(soknadsmottakerFaktum);

					/*
					let adresseFaktum = finnFaktum("kontakt.adresse.bruker", action.fakta);

					adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "postnummer");
					adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "husbokstav");
					adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "husnummer");
					adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "kommunenummer");
					adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "gatenavn");
					adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "type");
					adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "geografiskTilknytning");
					adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, null, "poststed");
					yield put(lagreFaktum(adresseFaktum));
					*/

					yield put(lagreFaktum(soknadsmottakerFaktum));
					return null;
				}
			}
			const url = `soknadsmottaker/${action.brukerBehandlingId}?valg=${action.oppholdsadressevalg}`;
			const response = yield call(fetchToJson, url);
			if (response && response.toString().length > 0) {
				// TODO: Støtte visning av dropdown med NAV-kontor hvis mer enn én blir returnert.
				yield put(lagreFaktum(oppdaterSoknadsMottaker(response, action.soknadsmottakerFaktum)));
				if (response.sosialOrgnr) {
					yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.GYLDIG));
				} else {
					yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.UGYLDIG));
				}
			} else {
				let soknadsmottakerFaktum = finnFaktum("soknadsmottaker", action.fakta);
				soknadsmottakerFaktum = nullUtSoknadsmottakerFaktum(soknadsmottakerFaktum);
				yield put(lagreFaktum(soknadsmottakerFaktum));
				yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.UGYLDIG));
			}
		}

	} catch (reason) {
		yield put(loggFeil("Hent soknadsmottaker feilet: " + reason.toString()));
		yield put(navigerTilServerfeil());
	}
}

function* oppholdsadresseSaga(): SagaIterator {
	yield takeEvery(OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER, lagreAdresseOgSoknadsmottakerSaga);
}

export default oppholdsadresseSaga;
