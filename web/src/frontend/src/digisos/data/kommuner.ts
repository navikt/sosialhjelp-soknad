import { Kommune, Bydel } from "../../nav-soknad/types";

const OsloBydeler: Bydel[] = [
	// { id: "alna", navn: "Bydel Alna" },
	// { id: "bjerke", navn: "Bydel Bjerke" },
	{ id: "frogner", navn: "Bydel Frogner" },
	// { id: "gamleoslo", navn: "Bydel Gamle Oslo" },
	{ id: "grorud", navn: "Bydel Grorud" },
	{ id: "grunerlokka", navn: "Bydel Grünerløkka" },
	// { id: "nordreaker", navn: "Bydel Nordre Aker" },
	// { id: "nordstrand", navn: "Bydel Nordstrand" },
	// { id: "sagene", navn: "Bydel Sagene" },
	// { id: "sthanshaugen", navn: "Bydel St. Hanshaugen" },
	// { id: "stovner", navn: "Bydel Stovner" },
	// { id: "sondrenordstrand", navn: "Bydel Søndre Nordstrand" },
	// { id: "ullern", navn: "Bydel Ullern" },
	// { id: "vestreaker", navn: "Bydel Vestre Aker" },
	// { id: "ostonsjo", navn: "Bydel Østensjø" }
];

const BergenBydeler: Bydel[] = [
	{ id: "bergenhus", navn: "Bydel Bergenhus"},
	{ id: "ytrebygda", navn: "Bydel Ytebygda"}
];

export const Kommuner: Kommune[] = [
	{
		id: "horten",
		navn: "Horten"
	},
	{
		id: "bergen",
		navn: "Bergen",
		bydeler: BergenBydeler
	},
	{
		id: "oslo",
		navn: "Oslo",
		bydeler: OsloBydeler
	}
];

export function getBosted(kommuneId: string, bydelId?: string): string {
	/** Denne koden fungerer kun så lenge kommune og bydel er hardkodet i frontend */
	const kommune = Kommuner.find(k => k.id === kommuneId);

	const bydel = kommune.bydeler ?
		kommune.bydeler.find(b => b.id === bydelId)
		: undefined;

	if (!kommune) {
		return "N/A";
	}
	return `${kommune.navn}${bydel ? `, ${bydel.navn}` : ""}`;
}

export const Horten = Kommuner.find(k => k.id === "horten");
