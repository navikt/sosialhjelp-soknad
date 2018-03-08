import { getBosted, getKommune } from "../data/kommuner";

describe("kommuner", () => {

	it("should return name of 'kommune'", () => {
		const navn = getKommune("bergen");
		expect(navn).toEqual("Bergen");
	});

	it("should return a valid 'bosted 'string", () => {
		let bosted = getBosted("bergen", "bergenhus");
		expect(bosted).toEqual("Bergen, Bydel Bergenhus");
	});

});
