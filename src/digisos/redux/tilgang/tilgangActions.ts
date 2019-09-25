import {
	TilgangActionTypeKeys,
	TilgangActionTypes,
	TilgangSperrekode
} from "./tilgangTypes";

export const hentTilgang = (): TilgangActionTypes => {
	return {
		type: TilgangActionTypeKeys.INIT
	};
};

export const henterTilgang = (): TilgangActionTypes => {
	return {
		type: TilgangActionTypeKeys.PENDING
	};
};

export const hentetTilgang = (
	harTilgang: boolean,
	sperrekode: TilgangSperrekode
): TilgangActionTypes => {
	return {
		type: TilgangActionTypeKeys.OK,
		harTilgang,
		sperrekode
	};
};

export const hentTilgangFeilet = (feilmelding: string): TilgangActionTypes => {
	return {
		type: TilgangActionTypeKeys.FEILET,
		feilmelding
	};
};

export { hentTilgang, henterTilgang, hentetTilgang, hentTilgangFeilet };
