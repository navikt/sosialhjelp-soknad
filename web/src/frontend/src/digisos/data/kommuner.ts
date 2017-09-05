export interface Bydel {
	id: string;
	navn: string;
}

export interface Kommune {
	id: string;
	navn: string;
	bydeler?: Bydel[];
}

export const OsloBydeler: Bydel[] = [
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
];

export const Kommuner: Kommune[] = [
	{
		id: "bærum",
		navn: "Bærum"
	},
	{
		id: "horten",
		navn: "Horten"
	},
	{
		id: "oslo",
		navn: "Oslo",
		bydeler: OsloBydeler
	},
	{
		id: "stavanger",
		navn: "Stavanger"
	},
	{
		id: "trondheim",
		navn: "Trondheim"
	}
];

export function getBosted(kommuneId: string, bydelId?: string): string {
	const kommune = Kommuner.find(k => k.id === kommuneId);
	if (!kommune) {
		return "N/A";
	}
	const bydel =
		kommuneId === "oslo" ? OsloBydeler.find(b => b.id === bydelId) : undefined;
	return `${kommune.navn}${bydel ? `, ${bydel.navn}` : ""}`;
}
