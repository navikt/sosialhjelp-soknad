import { Location } from "history";
import { ANTALL_STEG } from "./konstanter";

export function finnStegFraLocation(location: Location): number {
	const stegInfo = location.pathname.split("skjema/");
	if (stegInfo.length === 2) {
		return parseInt(stegInfo[1], 10);
	}
	return -1;
}

interface RouterHistoryType {
	push: (url: string) => void;
}

export function gaTilSteg(steg: number, history: RouterHistoryType) {
	history.push(`/skjema/${steg}`);
}
export function gaVidere(aktivtSteg: number, history: RouterHistoryType) {
	const steg = Math.min(ANTALL_STEG, aktivtSteg + 1);
	gaTilSteg(steg, history);
}
export function gaTilbake(aktivtSteg: number, history: RouterHistoryType) {
	gaTilSteg(Math.max(1, aktivtSteg - 1), history);
}

export function avbryt() {
	alert("TODO");
}
