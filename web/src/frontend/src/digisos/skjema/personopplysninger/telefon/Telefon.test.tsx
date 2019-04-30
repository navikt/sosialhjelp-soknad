import { configEnzyme,  harInputfelt, TestContext } from "../../../../nav-soknad/utils/unitTestUtils";
import { mount } from "enzyme";
import * as React from "react";
import TelefonView from "./Telefon";
import { initialSoknadsdataState } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";

describe("Telefon react komponent", () => {

	configEnzyme();

	const intlMessages: any = {
		"kontakt.system.telefon.endreknapp.label": "Endre",
		"systeminfo.avbrytendringknapp.label": "Avbryt",
		"kontakt.system.telefon.label": "Telefon"
	};

	it("ikke vise inputfelt", () => {
		const soknadsdata = initialSoknadsdataState;
		soknadsdata.personalia.telefonnummer = {
			brukerdefinert: false,
			systemverdi: "12345678",
			brukerutfyltVerdi: null
		};
		const wrapper = mount(
			<TestContext messages={intlMessages}>
				<TelefonView
					brukerBehandlingId="110000001"
					soknadsdata={soknadsdata}
					setValideringsfeil={() => null}
					hentSoknadsdata={() => null}
				/>
			</TestContext>
		);

		expect(harInputfelt(wrapper, "tel")).toBeFalsy();
		wrapper.unmount()
	});

	it("vise inputfelt", () => {
		const soknadsdata = initialSoknadsdataState;
		soknadsdata.personalia.telefonnummer = {
			brukerdefinert: true,
			systemverdi: null,
			brukerutfyltVerdi: "12345678"
		};
		const wrapper = mount(
			<TestContext messages={intlMessages}>
				<TelefonView
					brukerBehandlingId="110000001"
					soknadsdata={soknadsdata}
					setValideringsfeil={() => null}
					hentSoknadsdata={() => null}
				/>
			</TestContext>
		);

		expect(harInputfelt(wrapper, "tel")).toBeTruthy();
		wrapper.unmount()
	});

});
