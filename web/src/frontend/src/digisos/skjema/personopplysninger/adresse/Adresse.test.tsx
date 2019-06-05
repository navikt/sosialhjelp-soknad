import * as React from "react";
import { configEnzyme, createMockIntl, TestContext } from "../../../../nav-soknad/utils/unitTestUtils";
import { initialSoknadsdataState } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { mount } from "enzyme";
import { AdresseView } from "./Adresse";
import { AdresseKategori, AdresseType } from "./AdresseTypes";

const lagSoknadsdata = (options?: any) => {
	const soknadsdata = initialSoknadsdataState;
	soknadsdata.personalia.adresser = {
		"valg": AdresseKategori.FOLKEREGISTRERT,
		"folkeregistrert": {
			"type": AdresseType.GATEADRESSE,
			"gateadresse": {
				"landkode": null,
				"kommunenummer": "0701",
				"adresselinjer": [],
				"bolignummer": "1234",
				"postnummer": "0557",
				"poststed": "OSLO",
				"gatenavn": "SANNERGATA",
				"husnummer": "2",
				"husbokstav": "",
			},
			"matrikkeladresse": null,
			"ustrukturert": null
		},
		"midlertidig": null,
		"soknad": null
	};
	if (options && options.navEnheter === true) {
		soknadsdata.personalia.navEnheter = [
			{
				"orgnr": "910230158",
				"enhetsnavn": "NAV Bergenhus",
				"kommunenavn": "Bergen",
				"valgt": false
			},
			{
				"orgnr": "910230964",
				"enhetsnavn": "NAV Årstad",
				"kommunenavn": "Bergen",
				"valgt": false
			}
		];
	}
	return soknadsdata;
};

describe("AdressesokTreff react komponent", () => {

	configEnzyme();

	const intlMessages: any = {
		"kontakt.system.oppholdsadresse.folkeregistrertAdresse": "Folkeregistrert adresse",
		"kontakt.system.oppholdsadresse.valg.soknad": "Jeg oppholder meg på annen adresse",
		"kontakt.system.oppholdsadresse.velgMottaker": "Velg soknadsmottaker"
	};

	const intl = createMockIntl(intlMessages);

	it("bør håndtere happy case med folkevalgt adresse", () => {
		const wrapper = mount(
			<TestContext messages={intlMessages}>
				<AdresseView
					brukerBehandlingId="110000001"
					soknadsdata={lagSoknadsdata()}
					setValideringsfeil={() => null}
					hentSoknadsdata={() => null}
					intl={intl}
					disableLoadingAnimation={true}
					dispatch={null}
				/>
			</TestContext>);
		const radioKnapper = wrapper.find(".inputPanel");
		expect(radioKnapper.length).toBe(2);

		const valgteRadioKnapper = wrapper.find(".inputPanel__checked");
		expect(valgteRadioKnapper.length).toBe(1);

		const navEnhetListeElement = wrapper.find(".selectContainer");
		expect(navEnhetListeElement.length).toBe(0);
		wrapper.unmount();
	});

	it("bør vise nedtrekksmeny med nav-enheter", () => {
		const wrapper = mount(
			<TestContext messages={intlMessages}>
				<AdresseView
					brukerBehandlingId="110000001"
					soknadsdata={lagSoknadsdata({navEnheter: true})}
					setValideringsfeil={() => null}
					hentSoknadsdata={() => null}
					intl={intl}
					disableLoadingAnimation={true}
					dispatch={null}
				/>
			</TestContext>);

		const navEnhetElement = wrapper.find(".selectContainer");
		expect(navEnhetElement.length).toBe(1);

		wrapper.unmount();
	});

});

