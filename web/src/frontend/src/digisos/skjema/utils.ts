import { Location } from "history";

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
