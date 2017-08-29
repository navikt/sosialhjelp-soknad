import { Location } from "history";
import { ANTALL_STEG } from "./konstanter";

export function finnStegFraLocation(location: Location): number {
	const stegInfo = location.pathname.split(/skjema\/[^\/]*\//);
	if (stegInfo.length === 2) {
		return parseInt(stegInfo[1], 10);
	}
	return -1;
}

export function finnBrukerBehandlingIdFraLocation(location: Location): string {
	const matches = location.pathname.match(/skjema\/([^\/]*)\//);
	if (matches && matches.length === 2) {
		return matches[1];
	}
	return "";
}
interface RouterHistoryType {
	push: (url: string) => void;
}

export function gaTilSteg(steg: number, brukerBehandlingId: string, history: RouterHistoryType) {
	history.push(`/skjema/${brukerBehandlingId}/${steg}`);
}
export function gaVidere(aktivtSteg: number, brukerBehandlingId: string, history: RouterHistoryType) {
	const steg = Math.min(ANTALL_STEG, aktivtSteg + 1);
	gaTilSteg(steg, brukerBehandlingId, history);
}
export function gaTilbake(aktivtSteg: number, brukerBehandlingId: string, history: RouterHistoryType) {
	gaTilSteg(Math.max(1, aktivtSteg - 1), brukerBehandlingId, history);
}

export function avbryt() {
	alert("TODO");
}
