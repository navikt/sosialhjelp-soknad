import { Kommune, Bydel } from "../../nav-soknad/types";

const bydelsnavn: any = {
	"oslo": [
		{ id: "alna", navn: "Alna" },
		{ id: "bjerke", navn: "Bjerke" },
		{ id: "frogner", navn: "Frogner" },
		{ id: "gamleoslo", navn: "Gamle Oslo" },
		{ id: "grorud", navn: "Grorud" },
		{ id: "grunerlokka", navn: "Grünerløkka" },
		{ id: "nordreaker", navn: "Nordre Aker" },
		{ id: "nordstrand", navn: "Nordstrand" },
		{ id: "sagene", navn: "Sagene" },
		{ id: "sthanshaugen", navn: "St. Hanshaugen" },
		{ id: "stovner", navn: "Stovner" },
		{ id: "sondrenordstrand", navn: "Søndre Nordstrand" },
		{ id: "ullern", navn: "Ullern" },
		{ id: "vestreaker", navn: "Vestre Aker" },
		{ id: "ostonsjo", navn: "Østensjø" }
	],
	"bergen": [
		{ id: "bergenhus", navn: "Bergenhus" },
		{ id: "ytrebygda", navn: "Ytrebygda" }
	]
};

const OsloBydeler: Bydel[] = [
	// { id: "alna", navn: "Alna" },
	// { id: "bjerke", navn: "Bjerke" },
	{ id: "frogner", navn: "Frogner" },
	// { id: "gamleoslo", navn: "Gamle Oslo" },
	{ id: "grorud", navn: "Grorud" },
	{ id: "grunerlokka", navn: "Grünerløkka" },
	// { id: "nordreaker", navn: "Nordre Aker" },
	// { id: "nordstrand", navn: "Nordstrand" },
	// { id: "sagene", navn: "Sagene" },
	// { id: "sthanshaugen", navn: "St. Hanshaugen" },
	// { id: "stovner", navn: "Stovner" },
	// { id: "sondrenordstrand", navn: "Søndre Nordstrand" },
	// { id: "ullern", navn: "Ullern" },
	// { id: "vestreaker", navn: "Vestre Aker" },
	// { id: "ostonsjo", navn: "Østensjø" }
];

const BergenBydeler: Bydel[] = [
	{ id: "bergenhus", navn: "Bergenhus" },
	{ id: "ytrebygda", navn: "Ytrebygda" }
];

export const Kommuner: Kommune[] = [
	{
		id: "horten",
		navn: "Horten"
	},
	{
		id: "askoy",
		navn: "Askøy"
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
	const bydel = bydelsnavn[ kommuneId ] ? bydelsnavn[ kommuneId ].find((b: any) => b.id === bydelId) : undefined;
	return bydel ? bydel.navn : "";
}

export function getBosted(kommuneId: string, bydelId?: string, intl?: any): string {
	const kommune = getKommune(kommuneId);
	const bydel = getBydel(kommuneId, bydelId);
	if (bydel === "") {
		return `NAV ${kommune}`;
	} else {
		return `NAV ${bydel}`;
	}
}

export const Horten = Kommuner.find(k => k.id === "horten");
