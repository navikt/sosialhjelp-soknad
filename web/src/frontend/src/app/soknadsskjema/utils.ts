import { Location } from "history";

export function finnStegFraLocation(location: Location): number {
	const stegInfo = location.pathname.split("/steg");
	if (stegInfo.length === 2) {
		return parseInt(stegInfo[1], 10);
	}
	return -1;
}
