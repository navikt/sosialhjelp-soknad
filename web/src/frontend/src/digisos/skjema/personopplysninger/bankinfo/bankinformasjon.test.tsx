import * as React from "react";
import { configEnzyme, harCheckboks, harInputfelt, setupReactIntl } from "../../../../nav-soknad/utils/unitTestUtils";
import { Kontonummer } from "./KontonummerType";
import { BankinformasjonView } from "./Bankinformasjon";
import { initialSoknadsdataState } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";

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
	const mountWithIntl = setupReactIntl(intlMessages);

	it("Vis skjema, men ikke vis angreknapp, hvis systemverdi er null", () => {
		const tomBankinformasjon: Kontonummer = {
			"brukerdefinert": false,
			"systemverdi": null,
			"verdi": null,
			"harIkkeKonto": null
		};

		const soknadsdata = initialSoknadsdataState;
		soknadsdata.personalia.kontonummer = tomBankinformasjon;
		const wrapper = mountWithIntl(
			<BankinformasjonView
				brukerBehandlingId="110000001"
				soknadsdata={soknadsdata}
				setValideringsfeil={() => null}
				hentSoknadsdata={() => null}
				intl={null}
			/>
		);

		expect(harCheckboks(wrapper)).toBeTruthy();
		expect(harInputfelt(wrapper)).toBeTruthy();
		expect(wrapper.html()).not.toContain("Endre");
		expect(wrapper.html()).not.toContain("Angre");
	});

	it("Ikke vis skjema hvis systemverdi er satt", () => {
		const tomBankinformasjon: Kontonummer = {
			"brukerdefinert": false,
			"systemverdi": "12345678903",
			"verdi": null,
			"harIkkeKonto": null
		};
		const soknadsdata = initialSoknadsdataState;
		soknadsdata.personalia.kontonummer = tomBankinformasjon;
		const wrapper = mountWithIntl(
			<BankinformasjonView
				brukerBehandlingId="110000001"
				soknadsdata={soknadsdata}
				setValideringsfeil={() => null}
				hentSoknadsdata={() => null}
				intl={null}
			/>
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
			"verdi": null,
			"harIkkeKonto": null
		};
		const soknadsdata = initialSoknadsdataState;
		soknadsdata.personalia.kontonummer = bankinformasjon;
		const wrapper = mountWithIntl(
			<BankinformasjonView
				brukerBehandlingId="110000001"
				soknadsdata={soknadsdata}
				setValideringsfeil={() => null}
				hentSoknadsdata={() => null}
				intl={null}
			/>
		);

		expect(harCheckboks(wrapper)).toBeTruthy();
		expect(harInputfelt(wrapper)).toBeTruthy();
		expect(wrapper.html()).not.toContain("Endre");
		expect(wrapper.html()).toContain("Angre");

		const DISABLED = "disabled";

		expect(wrapper.find(".input--s").first().getElement().props[DISABLED]).toBeFalsy();
		wrapper.setProps({bankinformasjon: {...bankinformasjon, ...{"harIkkeKonto": true}}});
		expect(wrapper.find(".input--s").first().getElement().props[DISABLED]).toBeTruthy();
	});
});
