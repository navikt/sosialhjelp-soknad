import { Kommuner, getBosted, getKommune } from "../data/kommuner";
import { Kommune } from "../../nav-soknad/types";

describe("kommuner", () => {

	// it("should return list of 'bydeler'", () => {
	// 	let oslo: Kommune = Kommuner.find(k => k.id === "oslo");
	// 	const antallBydeler = oslo.bydeler.length;
	// 	expect(antallBydeler).toBeGreaterThanOrEqual(2);
	// });
	//
	// it("should return name of 'kommune'", () => {
	// 	const navn = getKommune("oslo");
	// 	expect(navn).toEqual("Oslo");
	// });
	//
	// it("should return a valid 'bosted 'string", () => {
	// 	let bosted = getBosted("oslo", "frogner");
	// 	expect(bosted).toEqual("Oslo, Bydel Frogner");
	//
	// 	bosted = getBosted("oslo", "sondrenordstrand");
	// 	expect(bosted).toEqual("Oslo, Bydel Søndre Nordstrand");
	// });

});
