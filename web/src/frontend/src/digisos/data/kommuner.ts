import { Kommune, Bydel } from "../../nav-soknad/types";

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
		id: "horten",
		navn: "Horten"
	},
	{
		id: "oslo",
		navn: "Oslo",
		bydeler: OsloBydeler
	}
];

/** Disse funksjonene fungerer kun så lenge kommune og bydel er hardkodet i frontend */

export function getKommune(kommuneId: string): string {
	const kommune = Kommuner.find(k => k.id === kommuneId);
	if (!kommune) {
		return "N/A";
	}
	return kommune.navn;
}

export function getBydel(kommuneId: string, bydelId: string): string {
	const bydel =
		kommuneId === "oslo" ? OsloBydeler.find(b => b.id === bydelId) : undefined;
	return bydel ? bydel.navn : "";
}

export function getBosted(kommuneId: string, bydelId?: string): string {
	let bydel = getBydel(kommuneId, bydelId);
	return getKommune(kommuneId) + (bydel === "" ? "" : ", ") + bydel;
}

export const Horten = Kommuner.find(k => k.id === "horten");
