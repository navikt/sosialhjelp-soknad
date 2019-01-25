import { configEnzyme, setupShallowReactIntl } from "../../../nav-soknad/utils/unitTestUtils";
import { Begrunnelse } from "./begrunnelseActions";
import { BegrunnelseSkjema }from "./Begrunnelse";
import * as React from "react";

describe("Begrunnelse visningskomponent", () => {

	configEnzyme();
	const intlMessages: any = {
		"begrunnelse.hva.placeholder": "Placeholder hva",
		"begrunnelse.hvorfor.placeholder": "Placeholder hvorfor",
		"kontakt.kontonummer.label": "Kontonummer",
		"kontakt.kontonummer.harikke": "har ikke",
		"kontakt.system.kontonummer.infotekst.tekst": "Infotekst",
		"kontakt.system.kontonummer.label": "Systemkontonummer"
	};
	const shallowWithIntl = setupShallowReactIntl(intlMessages);

	it("Les valideringsfeil", () => {
		const begrunnelseState: Begrunnelse = {
			hvaSokesOm: "",
			hvorforSoke: ""
		};

		const wrapper = shallowWithIntl(
			<BegrunnelseSkjema
				begrunnelse={begrunnelseState}
				brukerBehandlingId="110000001"
				nullstillValideringsfeil={() => null}
				hentBegrunnelse={() => null}
				intl={null}
			/>);

		expect(wrapper.text()).toContain("Sporsmal");
	});
});