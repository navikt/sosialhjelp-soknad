import { Kommune, Bydel } from "../../nav-soknad/types";

const bydelsnavn: any = {
	"oslo": [
		{ id: "alna", navn: "Bydel Alna" },
		{ id: "bjerke", navn: "Bydel Bjerke" },
		{ id: "frogner", navn: "Bydel Frogner" },
		{ id: "gamleoslo", navn: "Bydel Gamle Oslo" },
		{ id: "grorud", navn: "Bydel Grorud" },
		{ id: "grunerlokka", navn: "Bydel Grünerløkka" },
		{ id: "nordreaker", navn: "Bydel Nordre Aker" },
		{ id: "nordstrand", navn: "Bydel Nordstrand" },
		{ id: "sagene", navn: "Bydel Sagene" },
		{ id: "sthanshaugen", navn: "Bydel St. Hanshaugen" },
		{ id: "stovner", navn: "Bydel Stovner" },
		{ id: "sondrenordstrand", navn: "Bydel Søndre Nordstrand" },
		{ id: "ullern", navn: "Bydel Ullern" },
		{ id: "vestreaker", navn: "Bydel Vestre Aker" },
		{ id: "ostonsjo", navn: "Bydel Østensjø" }
	],
	"bergen": [
		{ id: "bergenhus", navn: "Bydel Bergenhus"},
		{ id: "ytrebygda", navn: "Bydel Ytrebygda"}
	]
};

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
	{ id: "ytrebygda", navn: "Bydel Ytrebygda"}
];

export const Kommuner: Kommune[] = [
	{
		id: "horten",
		navn: "Horten"
	},
	{
		id:"askoy",
		navn:"Askøy"
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

export function getKommune(kommuneId: string): string {
	const kommune = Kommuner.find(k => k.id === kommuneId);
	if (!kommune) {
		return "N/A";
	}
	return kommune.navn;
}

export function getBydel(kommuneId: string, bydelId: string): string {
	const bydel = bydelsnavn[kommuneId] ? bydelsnavn[kommuneId].find((b: any) => b.id === bydelId) : undefined;
	return bydel ? bydel.navn : "";
}

export function getBosted(kommuneId: string, bydelId?: string): string {
	const bydel = getBydel(kommuneId, bydelId);
	return getKommune(kommuneId) + (bydel === "" ? "" : ", ") + bydel;
}

export const Horten = Kommuner.find(k => k.id === "horten");
