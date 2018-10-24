import { Faktum } from "../../../../nav-soknad/types";
import {nullUtSoknadsmottakerFaktum} from "./OppholdsadresseSaga";

describe("oppholdsadresse saga", () => {

	it("should reset all properties in faktum", () => {

		const testFaktum: Faktum = {
			"faktumId": 2165,
			"soknadId": 14,
			"parrentFaktum": null,
			"key": "soknadsmottaker",
			"value": null,
			"faktumEgenskaper": [
				{
					"faktumId": 2165,
					"soknadId": 14,
					"key": "enhetsnavn",
					"value": "NAV Bergenhus",
					"systemEgenskap": 0
				},
				{
					"faktumId": 2165,
					"soknadId": 14,
					"key": "kommunenavn",
					"value": "Bergen",
					"systemEgenskap": 0
				},
				{
					"faktumId": 2165,
					"soknadId": 14,
					"key": "kommunenummer",
					"value": "1201",
					"systemEgenskap": 0
				},
				{
					"faktumId": 2165,
					"soknadId": 14,
					"key": "bydelsnummer",
					"value": null,
					"systemEgenskap": 0
				},
				{
					"faktumId": 2165,
					"soknadId": 14,
					"key": "enhetsId",
					"value": "1209",
					"systemEgenskap": 0
				},
				{
					"faktumId": 2165,
					"soknadId": 14,
					"key": "sosialOrgnr",
					"value": "910230158",
					"systemEgenskap": 0
				}
			],
			"properties": {
				"kommunenavn": "Bergen",
				"enhetsId": "1209",
				"kommunenummer": "1201",
				"enhetsnavn": "NAV Bergenhus",
				"bydelsnummer": null,
				"sosialOrgnr": "910230158"
			},
			"type": "BRUKERREGISTRERT",
			"lagret": {
				"value": null,
				"properties": {
					"kommunenavn": "Bergen",
					"enhetsId": "1209",
					"kommunenummer": "1201",
					"enhetsnavn": "NAV Bergenhus",
					"bydelsnummer": null,
					"sosialOrgnr": "910230158"
				}
			}
		};

		const newFaktum = nullUtSoknadsmottakerFaktum(testFaktum);
		expect(newFaktum.properties["kommunenavn"]).toBe(null);
	});

});