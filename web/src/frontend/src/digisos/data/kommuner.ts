import { Kommuner } from "../../nav-soknad/types";

export function getBosted(kommuneId: string, bydelId?: string): string {
	const kommune = Kommuner.find(k => k.id === kommuneId);
	if (!kommune) {
		return "N/A";
	}
	return kommune.navn;
}

export const Horten = Kommuner.find(k => k.id === "horten");
