import { configEnzyme, setupShallowReactIntl } from "../../../nav-soknad/utils/unitTestUtils";
import { Begrunnelse } from "./begrunnelseTypes";
import { BegrunnelseSkjema } from "./Begrunnelse";
import * as React from "react";
import { initialSoknadsdataState, Soknadsdata } from "../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";

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
		const soknadsdata: Soknadsdata = initialSoknadsdataState;
		soknadsdata.begrunnelse = begrunnelseState;

		const wrapper = shallowWithIntl(
			<BegrunnelseSkjema
				soknadsdata={soknadsdata}
				brukerBehandlingId="110000001"
				// nullstillValideringsfeil={() => null}
				hentSoknadsdata={() => null}
				setValideringsfeil={() => null}
				intl={null}
			/>);

		expect(wrapper.text()).toContain("Sporsmal");
	});
});