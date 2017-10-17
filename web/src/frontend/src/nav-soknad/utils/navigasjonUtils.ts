import { SkjemaConfig } from "../types";

interface RouterHistoryType {
	push: (url: string) => void;
}

export function getStegUrl(brukerBehandlingId: string, steg: number) {
	return `/skjema/${brukerBehandlingId}/${steg}`;
}

export function gaTilSteg(
	steg: number,
	brukerBehandlingId: string,
	history: RouterHistoryType
) {
	history.push(getStegUrl(brukerBehandlingId, steg));
}

export function gaVidere(
	aktivtSteg: number,
	brukerBehandlingId: string,
	history: RouterHistoryType,
	skjemaConfig: SkjemaConfig
) {
	const steg = Math.min(skjemaConfig.steg.length, aktivtSteg + 1);
	gaTilSteg(steg, brukerBehandlingId, history);
}

export function gaTilStart(
	history: RouterHistoryType,
	skjemaConfig: SkjemaConfig
) {
	history.push(`/bosted`);
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
