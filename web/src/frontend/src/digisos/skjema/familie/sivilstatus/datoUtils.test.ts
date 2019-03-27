import { konverterFdatoFraServer, konverterFdatoTilServer } from "./datoUtils";

describe("konvertering av dato", () => {

	const serverFormat: string = "1976-06-19";
	const localFormat: string = "19061976";

	it("should convert from format used on server", () => {
		expect(konverterFdatoFraServer(serverFormat)).toEqual("19061976");
		expect(konverterFdatoFraServer("19061976")).toEqual("19061976");
		expect(konverterFdatoFraServer("1906")).toEqual("1906");
		expect(konverterFdatoFraServer("")).toEqual("");
		expect(konverterFdatoFraServer(null)).toEqual(null);
	});

	it("should convert to format used on server", () => {
		expect(konverterFdatoTilServer(localFormat)).toEqual(serverFormat);
		expect(konverterFdatoTilServer(serverFormat)).toEqual(serverFormat);
		expect(konverterFdatoFraServer("1976-06")).toEqual("1976-06");
		expect(konverterFdatoFraServer(null)).toEqual(null);
	});

});