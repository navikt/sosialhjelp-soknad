import {
	AdresseKategori,
	default as oppholdsadresseReducer, ErrorFarge,
	OppholdsadresseActionTypeKeys,
	OppholdsAdresseState,
	SoknadsMottakerStatus
} from "./oppholdsadresseReducer";
import {Adresse} from "./Oppholdsadresse";

describe("oppholdsadresse", () => {

	const defaultState: OppholdsAdresseState = {
		valgtAdresse: null,
		soknadsmottaker: null,
		soknadsmottakerStatus: SoknadsMottakerStatus.IKKE_VALGT,
		adresseKategori: AdresseKategori.IKKE_VALGT,
		errorFarge: ErrorFarge.IKKE_VALGT,
		soknadsmottakere: []
	};

	const defaultAdresse: Adresse  = {
		"adresse": "rakei",
		"husnummer": "",
		"husbokstav": "",
		"kommunenummer": "",
		"kommunenavn": "",
		"postnummer": "",
		"poststed": "",
		"geografiskTilknytning":  "",
		"gatekode": "",
		"bydel": "",
		"type": "",
	};
	const reducer = oppholdsadresseReducer;

	// it("should not have any selected adresses on first view", () => {
	//
	// });

	it("tests", () => {
		const newState = reducer(defaultState,
			{
				type: OppholdsadresseActionTypeKeys.VELG_FOLKEREGISTRERT_ADRESSE,
				adresse: defaultAdresse
			});
		expect(newState.valgtAdresse.adresse).toEqual("rakei");
	});


});
