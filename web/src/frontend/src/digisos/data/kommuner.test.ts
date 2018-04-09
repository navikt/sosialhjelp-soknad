import { getBosted, getKommune } from "../data/kommuner";

describe("kommuner", () => {

	it("should return name of 'kommune'", () => {
		const navn = getKommune("bergen");
		expect(navn).toEqual("Bergen");
	});

	it("should return a valid 'bosted 'string", () => {
		let intlMock = {
			messages: function() {
				return {}
			}
		};

		let bosted = getBosted("bergen", "bergenhus", intlMock);
		expect(bosted).toEqual("NAV Bydel Bergenhus, Bergen generelt.kommune");
	});

});
