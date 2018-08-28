import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import {
	AdresseKategori, ErrorFarge,
	HentSoknadsmottakerAction,
	OppholdsadresseActionTypeKeys, settErrorFarge, settSoknadsmottakere,
	settSoknadsmottakerStatus, SoknadsMottakerStatus, VelgSoknadsmottakerAction
} from "./oppholdsadresseReducer";
import { navigerTilServerfeil } from "../../../../nav-soknad/redux/navigasjon/navigasjonActions";
import { loggFeil } from "../../../../nav-soknad/redux/navlogger/navloggerActions";
import { fetchToJson } from "../../../../nav-soknad/utils/rest-utils";
import { finnFaktum, oppdaterFaktumMedVerdier } from "../../../../nav-soknad/utils";
import { lagreFaktum } from "../../../../nav-soknad/redux/fakta/faktaActions";
import { Faktum } from "../../../../nav-soknad/types";
import { Adresse } from "./Oppholdsadresse";
import { lagreFaktumSaga } from "../../../../nav-soknad/redux/fakta/faktaSaga";
import { LagreFaktum } from "../../../../nav-soknad/redux/fakta/faktaTypes";

export function oppdaterSoknadsMottaker(soknadsmottaker: any, faktum: Faktum) {
	if (soknadsmottaker != null) {
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
	}
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

function* velgSoknadsmottakerOgOppdaterStatusSaga(action: VelgSoknadsmottakerAction): SagaIterator {
	const soknadsmottakerFaktum = finnFaktum("soknadsmottaker", action.fakta);
	if (action.soknadsmottaker == null) {
		console.error("Mangler søknadsmottaker.");
	}
	yield* lagreSoknadsmottakerOgOppdaterStatus(action.soknadsmottaker, soknadsmottakerFaktum);
}

function* lagreSoknadsmottakerOgOppdaterStatus(
	soknadsmottaker: any, soknadsmottakerFaktum: Faktum): any {

	yield* lagreFaktumSaga(lagreFaktum(
		oppdaterSoknadsMottaker(soknadsmottaker, soknadsmottakerFaktum)) as LagreFaktum) as any;
	if (soknadsmottaker.sosialOrgnr) {
		yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.GYLDIG));
	} else {
		yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.UGYLDIG));
	}
}

function* fetchOgSettSoknadsmottakerOgOppdaterStatus(
		brukerBehandlingId: any,
		oppholdsadressevalg: any,
		soknadsmottakerFaktum: Faktum): any {
	const url = `soknadsmottaker/${brukerBehandlingId}?valg=${oppholdsadressevalg}`;
	const response = yield call(fetchToJson, url);
	if (response && response.toString().length > 0) {
		const soknadsmottakere = response.filter((item: any) => item != null);
		yield put(settSoknadsmottakere(soknadsmottakere));
		if (soknadsmottakere.length === 1) {
			const soknadsmottaker = soknadsmottakere[0];
			if (soknadsmottaker == null) {
				console.error("Søknadsmottaker mangler");
				throw Error("Mangler soknadsmottaker");
			}
			yield* lagreSoknadsmottakerOgOppdaterStatus(soknadsmottaker, soknadsmottakerFaktum);
		}
	} else {
		soknadsmottakerFaktum = nullUtSoknadsmottakerFaktum(soknadsmottakerFaktum);
		yield* lagreFaktumSaga(lagreFaktum(soknadsmottakerFaktum) as LagreFaktum) as any;
		yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.MANGLER_NAV_KONTOR));
	}
}

function getOppholdsadresseFaktumValue(adresseKategori: AdresseKategori ) {
	if (adresseKategori === AdresseKategori.FOLKEREGISTRERT) {
		return "folkeregistrert";
	} else if (adresseKategori === AdresseKategori.MIDLERTIDIG) {
		return "midlertidig";
	} else if (adresseKategori === AdresseKategori.SOKNAD) {
		return "soknad";
	} else {
		return null;
	}
}

function* updateIfChanged(faktum: Faktum, value: string): any {
	if (faktum.value !== value) {
		faktum.value = value;
		yield* lagreFaktumSaga(lagreFaktum(faktum) as LagreFaktum) as any;
	}
}

function* lagreAdresseOgSoknadsmottakerSaga(action: HentSoknadsmottakerAction): SagaIterator {
	try {
		const adresse = action.adresse;

		const brukerValgFaktum = finnFaktum("kontakt.adresse.brukerendrettoggle", action.fakta);

		const oppholdsadresseFaktum = finnFaktum("kontakt.system.oppholdsadresse.valg", action.fakta);
		let adresseFaktum = finnFaktum("kontakt.adresse.bruker", action.fakta);
		let soknadsmottakerFaktum = finnFaktum("soknadsmottaker", action.fakta);

		const KOMMUNENUMMER = "kommunenummer";
		if (soknadsmottakerFaktum.properties[KOMMUNENUMMER] != null) {
			soknadsmottakerFaktum = nullUtSoknadsmottakerFaktum(soknadsmottakerFaktum);
			yield* lagreFaktumSaga(lagreFaktum(soknadsmottakerFaktum) as LagreFaktum) as any;
		}

		const newOppholdsadresseFaktumValue = getOppholdsadresseFaktumValue(action.adresseKategori);
		if (newOppholdsadresseFaktumValue == null) {
			return null;
		}

		yield* updateIfChanged(oppholdsadresseFaktum, newOppholdsadresseFaktumValue);
		yield put(settSoknadsmottakere([]));

		if (action.adresseKategori === AdresseKategori.SOKNAD) {
			if (adresse) {
				adresseFaktum = oppdaterAdresse(adresseFaktum, adresse);
				yield* lagreFaktumSaga(lagreFaktum(adresseFaktum) as LagreFaktum) as any;
				yield* updateIfChanged(brukerValgFaktum, "true");
			} else {
				yield put(settSoknadsmottakerStatus(SoknadsMottakerStatus.IKKE_VALGT));
				yield put(settErrorFarge(ErrorFarge.IKKE_VALGT));
				yield* updateIfChanged(brukerValgFaktum, "false");
				return null;
			}
		} else {
			yield* updateIfChanged(brukerValgFaktum, "false");
		}

		yield* fetchOgSettSoknadsmottakerOgOppdaterStatus(
			action.brukerBehandlingId,
			action.oppholdsadressevalg,
			soknadsmottakerFaktum);
	} catch (reason) {
		yield put(loggFeil("Hent soknadsmottaker feilet: " + reason.toString()));
		yield put(navigerTilServerfeil());
	}
}

function* oppholdsadresseSaga(): SagaIterator {
	yield takeEvery(OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER, lagreAdresseOgSoknadsmottakerSaga);
	yield takeEvery(OppholdsadresseActionTypeKeys.VELG_SOKNADSMOTTAKER, velgSoknadsmottakerOgOppdaterStatusSaga);
}

export default oppholdsadresseSaga;
