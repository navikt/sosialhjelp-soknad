import { configEnzyme, createMockIntl, pretty, TestContext } from "../../../../nav-soknad/utils/unitTestUtils";
import { initialSoknadsdataState } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { mount } from "enzyme";
import * as React from "react";
import {BostotteView} from "./Bostotte";

describe("Bostøtte komponent", () => {

	configEnzyme();
	const intlMessages: any = {
		"inntekt.bostotte.hjelpetekst.tittel": "tittel"
	};

	const intl = createMockIntl(intlMessages);

	it("should not crash when given nulls", () => {
		const soknadsdata = initialSoknadsdataState;
		soknadsdata.inntekt.bostotte.bekreftelse = null;
		const wrapper = mount(
			<TestContext messages={intlMessages}>
				<BostotteView
					brukerBehandlingId="110000001"
					soknadsdata={soknadsdata}
					hentSoknadsdata={() => null}
					intl={intl}
				/>
			</TestContext>
		);

		// console.warn(pretty(wrapper.html()));
		expect(wrapper.find("#inntekt_bostotte_radio_ja").first().getElement().props["value"]).toBe("true");
	});

});
