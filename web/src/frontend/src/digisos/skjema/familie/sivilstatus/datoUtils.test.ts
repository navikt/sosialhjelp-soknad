import { konverterFraISODato, konverterTilISODato } from "./datoUtils";

describe("konvertering av dato", () => {

	const serverFormat: string = "1976-06-19";
	const localFormat: string = "19061976";

	it("should convert from format used on server", () => {
		expect(konverterFraISODato(serverFormat)).toEqual("19061976");
		expect(konverterFraISODato("19061976")).toEqual("19061976");
		expect(konverterFraISODato("1906")).toEqual("1906");
		expect(konverterFraISODato("")).toEqual("");
		expect(konverterFraISODato(null)).toEqual(null);
	});

	it("should convert to format used on server", () => {
		expect(konverterTilISODato(localFormat)).toEqual(serverFormat);
		expect(konverterTilISODato(serverFormat)).toEqual(serverFormat);
		expect(konverterFraISODato("1976-06")).toEqual("1976-06");
		expect(konverterFraISODato(null)).toEqual(null);
	});

});