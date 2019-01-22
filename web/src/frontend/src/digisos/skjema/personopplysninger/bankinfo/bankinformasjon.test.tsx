import * as React from "react";
import { configEnzyme, setupReactIntl } from "../../../../nav-soknad/utils/unitTestUtils";
import { Bankinformasjon } from "./bankinformasjonActions";
import { BankinformasjonView } from "./Bankinformasjon";

describe("Bankinformasjon komponent", () => {

	configEnzyme();
	const intlMessages: any = {
		"kontakt.system.kontonummer.endreknapp.label": "Endre",
		"systeminfo.avbrytendringknapp.label": "Angre",
		"kontakt.kontonummer.label": "Kontonummer",
		"kontakt.kontonummer.harikke": "har ikke"
	};
	const mountWithIntl = setupReactIntl(intlMessages);

	it("Skal vise 'Endre' link", () => {
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
		expect(wrapper.html()).toContain("Endre");
		expect(wrapper.html()).not.toContain("Angre");

		const endretBnkinformasjon: Bankinformasjon = {
			"brukerdefinert": true,
			"systemverdi": null,
			"verdi": "16141203111",
			"harIkkeKonto":false
		};
		wrapper.setProps({bankinformasjon: endretBnkinformasjon});
		// console.warn("html:" + wrapper.html());
		expect(wrapper.html()).not.toContain("Endre");
		expect(wrapper.html()).toContain("Angre");

	});

});
