import { finnBydeler, getNavEnhet, getKommune, alleKommuner } from "../data/kommuner";

const navEnheter: any[] = [
	{
		id: "askoy",
		navn: "Askøy",
		kommuneId: null,
		fulltNavn: "NAV Askøy",
		type: "KOMMUNE"
	},
	{
		id: "bergenhus",
		navn: "Bergenhus",
		kommuneId: "bergen",
		fulltNavn: "NAV Bergenhus, Bergen Kommune",
		type: "BYDEL"
	},
	{
		id: "bergen",
		navn: "Bergen",
		fulltNavn: null,
		type: "KOMMUNE"
	},
	{
		id: "horten",
		navn: "Horten",
		kommuneId: null,
		fulltNavn: "NAV Horten",
		type: "KOMMUNE"
	},
	{
		id: "oslo",
		navn: "Oslo",
		kommuneId: null,
		fulltNavn: null,
		type: "KOMMUNE"
	},
	{
		id: "ytrebygda",
		navn: "Ytrebygda",
		kommuneId: "bergen",
		fulltNavn: "NAV Ytrebygda, Bergen kommune",
		type: "BYDEL"
	},
	{
		id: "frogner",
		navn: "Frogner",
		kommuneId: "oslo",
		fulltNavn: "NAV Frogner, Oslo kommune",
		type: "BYDEL"
	},
	{
		id: "grorud",
		navn: "Grorud",
		kommuneId: "oslo",
		fulltNavn: "NAV Grorud, Oslo kommune",
		type: "BYDEL"
	},
	{
		id: "grunerlokka",
		navn: "Grünerløkka",
		kommuneId: "oslo",
		fulltNavn: "NAV Grünerløkka, Oslo kommune",
		type: "BYDEL"
	}
];

describe("navEnheter", () => {

	it("should return name of 'kommune'", () => {
		const navn = getKommune("bergen", navEnheter);
		expect(navn).toEqual("Bergen");
	});

	it("should return a valid 'bosted 'string", () => {
		const intlMock = {
			messages() {
				return {}
			}
		};

		const bosted = getNavEnhet("bergen", navEnheter, "bergenhus", intlMock);
		expect(bosted).toEqual("NAV Bergenhus, Bergen Kommune");
	});

	it("should return a list of municipalities", () => {
		expect(alleKommuner(navEnheter).length).toBeGreaterThan(2);
	});

	it("should return a list of districts", () => {
		expect(finnBydeler("bergen", navEnheter).length).toBeGreaterThan(1);
	});
});
