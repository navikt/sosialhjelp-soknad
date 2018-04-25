import { finnBydeler, getNavEnhet, getKommune, NavEnhet, EnhetsType, alleKommuner } from "../data/kommuner";

const navEnheter: NavEnhet[] = [
	{
		id: "askoy",
		navn: "Askøy",
		kommuneId: null,
		fulltNavn: "NAV Askøy",
		type: EnhetsType.KOMMUNE
	},
	{
		id: "bergenhus",
		navn: "Bergenhus",
		kommuneId: "bergen",
		fulltNavn: "NAV Bergenhus, Bergen Kommune",
		type: EnhetsType.BYDEL
	},
	{
		id: "bergen",
		navn: "Bergen",
		fulltNavn: null,
		type: EnhetsType.KOMMUNE
	},
	{
		id: "horten",
		navn: "Horten",
		kommuneId: null,
		fulltNavn: "NAV Horten",
		type: EnhetsType.KOMMUNE
	},
	{
		id: "oslo",
		navn: "Oslo",
		kommuneId: null,
		fulltNavn: null,
		type: EnhetsType.KOMMUNE
	},
	{
		id: "ytrebygda",
		navn: "Ytrebygda",
		kommuneId: "bergen",
		fulltNavn: "NAV Ytrebygda, Bergen kommune",
		type: EnhetsType.BYDEL
	},
	{
		id: "frogner",
		navn: "Frogner",
		kommuneId: "oslo",
		fulltNavn: "NAV Frogner, Oslo kommune",
		type: EnhetsType.BYDEL
	},
	{
		id: "grorud",
		navn: "Grorud",
		kommuneId: "oslo",
		fulltNavn: "NAV Grorud, Oslo kommune",
		type: EnhetsType.BYDEL
	},
	{
		id: "grunerlokka",
		navn: "Grünerløkka",
		kommuneId: "oslo",
		fulltNavn: "NAV Grünerløkka, Oslo kommune",
		type: EnhetsType.BYDEL
	}
];

describe("kommuner", () => {

	it("should return name of 'kommune'", () => {
		const navn = getKommune("bergen", navEnheter);
		expect(navn).toEqual("Bergen");
	});

	it("should return a valid 'bosted 'string", () => {
		let intlMock = {
			messages: function() {
				return {}
			}
		};

		let bosted = getNavEnhet("bergen", navEnheter, "bergenhus", intlMock);
		expect(bosted).toEqual("NAV Bergenhus, Bergen Kommune");
	});

	it("should return a list of municipalities", () => {
		expect(alleKommuner(navEnheter).length).toBeGreaterThan(2);
	});

	it("should return a list of districts", () => {
		expect(finnBydeler("bergen", navEnheter).length).toBeGreaterThan(1);
	});
});
