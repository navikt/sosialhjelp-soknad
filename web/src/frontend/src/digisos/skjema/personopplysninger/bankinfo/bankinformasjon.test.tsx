import * as React from "react";
import { configEnzyme, harCheckboks, harInputfelt, setupReactIntl } from "../../../../nav-soknad/utils/unitTestUtils";
import { Bankinformasjon } from "./bankinformasjonActions";
import { BankinformasjonView } from "./Bankinformasjon";

describe("Bankinformasjon react komponent", () => {

	configEnzyme();
	const intlMessages: any = {
		"kontakt.system.kontonummer.endreknapp.label": "Endre",
		"systeminfo.avbrytendringknapp.label": "Angre",
		"kontakt.kontonummer.label": "Kontonummer",
		"kontakt.kontonummer.harikke": "har ikke",
		"kontakt.system.kontonummer.infotekst.tekst": "Infotekst",
		"kontakt.system.kontonummer.label": "Systemkontonummer"
	};
	const mountWithIntl = setupReactIntl(intlMessages);

	it("Vis skjema, men ikke vis angreknapp, hvis systemverdi er null", () => {
		const tomBankinformasjon: Bankinformasjon = {
			"brukerdefinert": false,
			"systemverdi": null,
			"verdi": null,
			"harIkkeKonto": null
		};

		const wrapper = mountWithIntl(
			<BankinformasjonView
				brukerBehandlingId="110000001"
				bankinformasjon={tomBankinformasjon}
				nullstillBankinfoValideringsfeil={() => null}
				hentBankinformasjon={() => null}
				feil={[]}
				intl={null}
			/>
		);

		expect(harCheckboks(wrapper)).toBeTruthy();
		expect(harInputfelt(wrapper)).toBeTruthy();
		expect(wrapper.html()).not.toContain("Endre");
		expect(wrapper.html()).not.toContain("Angre");
	});

	it("Ikke vis skjema hvis systemverdi er satt", () => {
		const tomBankinformasjon: Bankinformasjon = {
			"brukerdefinert": false,
			"systemverdi": "12345678903",
			"verdi": null,
			"harIkkeKonto": null
		};

		const wrapper = mountWithIntl(
			<BankinformasjonView
				brukerBehandlingId="110000001"
				bankinformasjon={tomBankinformasjon}
				nullstillBankinfoValideringsfeil={() => null}
				hentBankinformasjon={() => null}
				feil={[]}
				intl={null}
			/>
		);

		expect(harCheckboks(wrapper)).toBeFalsy();
		expect(harInputfelt(wrapper)).toBeFalsy();
		expect(wrapper.html()).toContain("Endre");
		expect(wrapper.html()).not.toContain("Angre");
	});

	it("Vis skjema hvis brukerdefinert er true og systemverdi satt", () => {
		const bankinformasjon: Bankinformasjon = {
			"brukerdefinert": true,
			"systemverdi": "12345678903",
			"verdi": null,
			"harIkkeKonto": null
		};

		const wrapper = mountWithIntl(
			<BankinformasjonView
				brukerBehandlingId="110000001"
				bankinformasjon={bankinformasjon}
				nullstillBankinfoValideringsfeil={() => null}
				hentBankinformasjon={() => null}
				feil={[]}
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
