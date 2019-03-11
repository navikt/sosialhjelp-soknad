import * as React from "react";
import {
	configEnzyme, createMockIntl, harCheckboks, harInputfelt, TestContext
} from "../../../../nav-soknad/utils/unitTestUtils";
import { Kontonummer } from "./KontonummerType";
import { BankinformasjonView } from "./Bankinformasjon";
import { initialSoknadsdataState } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { mount } from "enzyme";

describe("Bankinformasjon react komponent", () => {

	configEnzyme();
	const intlMessages: any = {
		"kontakt.system.kontonummer.endreknapp.label": "Endre",
		"systeminfo.avbrytendringknapp.label": "Angre",
		"kontakt.kontonummer.label": "Kontonummer",
		"kontakt.kontonummer.harikke": "har ikke",
		"kontakt.system.kontonummer.infotekst.tekst": "Infotekst",
		"kontakt.kontonummer.infotekst.tekst": "Mer infotekst",
		"kontakt.system.kontonummer.label": "Systemkontonummer"
	};

	const intl = createMockIntl(intlMessages);

	it("Vis skjema, men ikke vis angreknapp, hvis systemverdi er null", () => {
		const tomBankinformasjon: Kontonummer = {
			"brukerdefinert": false,
			"systemverdi": null,
			"brukerutfyltVerdi": null,
			"harIkkeKonto": null
		};

		const soknadsdata = initialSoknadsdataState;
		soknadsdata.personalia.kontonummer = tomBankinformasjon;

		const wrapper = mount(
			<TestContext messages={intlMessages}>
				<BankinformasjonView
					brukerBehandlingId="110000001"
					soknadsdata={soknadsdata}
					setValideringsfeil={() => null}
					hentSoknadsdata={() => null}
					intl={intl}
				/>
			</TestContext>
		);
		expect(harCheckboks(wrapper)).toBeTruthy();
		expect(harInputfelt(wrapper)).toBeFalsy();
		expect(wrapper.html()).not.toContain("Endre");
		expect(wrapper.html()).not.toContain("Angre");
	});

	it("Ikke vis skjema hvis systemverdi er satt", () => {
		const tomBankinformasjon: Kontonummer = {
			"brukerdefinert": false,
			"systemverdi": "12345678903",
			"brukerutfyltVerdi": null,
			"harIkkeKonto": null
		};
		const soknadsdata = initialSoknadsdataState;
		soknadsdata.personalia.kontonummer = tomBankinformasjon;
		const wrapper = mount(
			<TestContext messages={intlMessages}>
				<BankinformasjonView
					brukerBehandlingId="110000001"
					soknadsdata={soknadsdata}
					setValideringsfeil={() => null}
					hentSoknadsdata={() => null}
					intl={intl}
				/>
			</TestContext>
		);

		expect(harCheckboks(wrapper)).toBeFalsy();
		expect(harInputfelt(wrapper)).toBeFalsy();
		expect(wrapper.html()).toContain("Endre");
		expect(wrapper.html()).not.toContain("Angre");
	});

	it("Vis skjema hvis brukerdefinert er true og systemverdi satt", () => {
		const bankinformasjon: Kontonummer = {
			"brukerdefinert": true,
			"systemverdi": "12345678903",
			"brukerutfyltVerdi": null,
			"harIkkeKonto": null
		};
		const soknadsdata = initialSoknadsdataState;
		soknadsdata.personalia.kontonummer = bankinformasjon;
		const wrapper = mount(
			<TestContext messages={intlMessages}>
				<BankinformasjonView
					brukerBehandlingId="110000001"
					soknadsdata={soknadsdata}
					setValideringsfeil={() => null}
					hentSoknadsdata={() => null}
					intl={intl}
				/>
			</TestContext>
		);

		expect(harCheckboks(wrapper)).toBeTruthy();
		expect(harInputfelt(wrapper)).toBeFalsy();
		expect(wrapper.html()).not.toContain("Endre");
		expect(wrapper.html()).toContain("Angre");

		const DISABLED = "disabled";

		expect(wrapper.find(".input--s").first().getElement().props[DISABLED]).toBeFalsy();
		// wrapper.setProps({bankinformasjon: {...bankinformasjon, ...{"harIkkeKonto": true}}});
		// expect(wrapper.find(".input--s").first().getElement().props[DISABLED]).toBeTruthy();
	});
});
