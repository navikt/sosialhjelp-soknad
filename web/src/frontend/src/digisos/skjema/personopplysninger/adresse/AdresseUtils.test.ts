import { ekstraherHusnummerHusbokstav } from "./AdresseUtils";

describe("AdresseUtils", () => {

	it("should extract number from address typed by user", () => {
		let svar = ekstraherHusnummerHusbokstav("SANNERGATA 2, 1337 Leet");
		expect(svar.husnummer).toEqual("2");
		expect(svar.husbokstav).toEqual("");

		svar = ekstraherHusnummerHusbokstav("SANNERGATA 35B, 1337 Leet");
		expect(svar.husnummer).toEqual("35");
		expect(svar.husbokstav).toEqual("B");

		svar = ekstraherHusnummerHusbokstav("SANNERGATA    37 CD , 1337 Leet");
		expect(svar.husnummer).toEqual("37");
		expect(svar.husbokstav).toEqual("CD");

		svar = ekstraherHusnummerHusbokstav("SANNERGATA , 1337 Leet");
		expect(svar.husnummer).toEqual("");
		expect(svar.husbokstav).toEqual("");

		svar = ekstraherHusnummerHusbokstav("SANNERGATA XYZ, 1337 Leet");
		expect(svar.husnummer).toEqual("");
		expect(svar.husbokstav).toEqual("");
	});
});