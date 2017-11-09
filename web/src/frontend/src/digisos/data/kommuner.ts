export interface Bydel {
	id: string;
	navn: string;
}

export interface Kommune {
	id: string;
	navn: string;
	bydeler?: Bydel[];
}

export const Kommuner: Kommune[] = [
	{
		id: "horten",
		navn: "Horten"
	}
];

export function getBosted(kommuneId: string, bydelId?: string): string {
	const kommune = Kommuner.find(k => k.id === kommuneId);
	if (!kommune) {
		return "N/A";
	}
	return kommune.navn;
}

export const Horten = Kommuner.find(k => k.id === "horten");
