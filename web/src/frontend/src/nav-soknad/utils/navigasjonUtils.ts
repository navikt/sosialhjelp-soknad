import { SkjemaConfig, SkjemaStegType } from "../soknadTypes";
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

interface RouterHistoryType {
	push: (url: string) => void;
}

const getAntallSteg = (config: SkjemaConfig): number => {
	return config.steg.filter(steg => steg.type === SkjemaStegType.skjema).length;
};

export function gaTilSteg(
	steg: number,
	brukerBehandlingId: string,
	history: RouterHistoryType
) {
	history.push(`/skjema/${brukerBehandlingId}/${steg}`);
}

export function gaVidere(
	aktivtSteg: number,
	brukerBehandlingId: string,
	history: RouterHistoryType,
	skjemaConfig: SkjemaConfig
) {
	const steg = Math.min(getAntallSteg(skjemaConfig), aktivtSteg + 1);
	gaTilSteg(steg, brukerBehandlingId, history);
}

export function gaTilStart(
	history: RouterHistoryType,
	skjemaConfig: SkjemaConfig
) {
	history.push(`/informasjon`);
}

export function gaTilbake(
	aktivtSteg: number,
	brukerBehandlingId: string,
	history: RouterHistoryType,
	skjemaConfig: SkjemaConfig
) {
	if (aktivtSteg === 1) {
		gaTilStart(history, skjemaConfig);
	} else {
		gaTilSteg(Math.max(1, aktivtSteg - 1), brukerBehandlingId, history);
	}
}

export function avbryt(skjemaConfig: SkjemaConfig) {
	alert("TODO");
}
