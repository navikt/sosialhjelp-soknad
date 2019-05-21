import { configEnzyme, createMockIntl, TestContext } from "../../../../nav-soknad/utils/unitTestUtils";
import { initialSoknadsdataState } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { mount } from "enzyme";
import * as React from "react";
import { NavYtelserView } from "./NavYtelser";

describe("NAV Ytelser komponent", () => {

	configEnzyme();
	const INGEN_UTBETALINGER = "Ingen utbetalinger tekst";
	const intlMessages: any = {
		"utbetalinger.ingen.true": INGEN_UTBETALINGER,
		"utbetalinger.utbetaling.erutbetalt.label": "er utbetalt label",
		"utbetalinger.infotekst.tekst": "infotekst"
	};

	const intl = createMockIntl(intlMessages);

	it("should not crash when given nulls", () => {
		const soknadsdata = initialSoknadsdataState;
		soknadsdata.inntekt.utbetalinger = {
			"bekreftelse": true,
			"utbytte": true,
			"salg": false,
			"forsikring": true,
			"annet": true,
			"beskrivelseAvAnnet": "Lorem ipsum"
		};
		soknadsdata.inntekt.systemdata = {
			"systeminntekter": []
		};

		const wrapper = mount(
			<TestContext messages={intlMessages}>
				<NavYtelserView
					brukerBehandlingId="110000001"
					soknadsdata={soknadsdata}
					hentSoknadsdata={() => null}
					disableLoadingAnimation={true}
					intl={intl}
				/>
			</TestContext>
		);

		// console.warn(pretty(wrapper.html()));
		expect(wrapper.text()).toContain(INGEN_UTBETALINGER);
	});

	it("should not crash when given nulls", () => {
		const soknadsdata = initialSoknadsdataState;
		soknadsdata.inntekt.utbetalinger = {
			"bekreftelse": true,
			"utbytte": true,
			"salg": false,
			"forsikring": true,
			"annet": true,
			"beskrivelseAvAnnet": "Lorem ipsum"
		};

		soknadsdata.inntekt.systemdata = {
			"systeminntekter": [ {
				"inntektType": "Barnetrygd",
				"utbetalingsdato": null,
				"belop": 3880.0
			}, {
				"inntektType": "Onkel Skrue penger",
				"utbetalingsdato": "2019-04-13",
				"belop": 60000.0
			}, {
				"inntektType": "Sykepenger",
				"utbetalingsdato": "2019-04-28",
				"belop": 18201.0
			}, {
				"inntektType": "Utdatert",
				"utbetalingsdato": null,
				"belop": null
			} ]
		};

		const wrapper = mount(
			<TestContext messages={intlMessages}>
				<NavYtelserView
					brukerBehandlingId="110000001"
					soknadsdata={soknadsdata}
					hentSoknadsdata={() => null}
					disableLoadingAnimation={true}
					intl={intl}
				/>
			</TestContext>
		);

		// console.warn(pretty(wrapper.html()));
		expect(wrapper.html()).toContain("<span>0.00</span>");
	});

});