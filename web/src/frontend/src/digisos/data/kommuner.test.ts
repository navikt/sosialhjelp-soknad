import { finnBydeler, getNavEnhet, getKommune, kommuner } from "../data/kommuner";

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

		let bosted = getNavEnhet("bergen", "bergenhus", intlMock);
		expect(bosted).toEqual("NAV Bergenhus, Bergen Kommune");
	});

	it("should return a list of municipalities", () => {
		expect(kommuner.length).toBeGreaterThan(2);
	});

	it("should return a list of districts", () => {
		expect(finnBydeler("bergen").length).toBeGreaterThan(1);
	});
});
