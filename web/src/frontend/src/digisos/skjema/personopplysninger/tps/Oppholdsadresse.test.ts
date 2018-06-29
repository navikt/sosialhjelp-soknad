/*
import {faktumHarLogvligAdresse} from "./Oppholdsadresse";
*/

describe("oppholdsadresse react component", () => {

	it("should detect if user have added a valid address", () => {

		const validFaktum: any = {
			"faktumId": 3327,
			"properties": {
				"kommunenavn": "Bergen",
				"enhetsId": "1209",
				"kommunenummer": "1201",
				"enhetsnavn": "NAV Bergenhus",
				"sosialOrgnr": "910230158"
			}
		};
		const notValidFaktum: any = {
			"faktumId": 3327,
			"properties": {},
		};

		const alsoNotValidFaktum: any = {
			"faktumId": 3327,
			"properties": {
				"kommunenavn": null,
				"enhetsId": null,
				"kommunenummer": null,
				"enhetsnavn": null,
				"bydelsnummer": null,
				"sosialOrgnr": null
			}
		};

		const anotherNotValidFaktum: any = null;

		/* Utkommentert grunnet for gammel nodeversjon på byggtjener:
		expect(faktumHarLogvligAdresse(validFaktum)).toBeTruthy();
		expect(faktumHarLogvligAdresse(notValidFaktum)).toBeFalsy();
		expect(faktumHarLogvligAdresse(alsoNotValidFaktum)).toBeFalsy();
		expect(faktumHarLogvligAdresse(anotherNotValidFaktum)).toBeFalsy();
		*/
	});
});