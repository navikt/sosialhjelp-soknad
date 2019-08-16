import {
	TilgangActionTypeKeys,
	TilgangActionTypes,
	TilgangSperrekode
} from "./tilgangTypes";

const hentTilgang = (): TilgangActionTypes => {
	return {
		type: TilgangActionTypeKeys.INIT
	};
};

const henterTilgang = (): TilgangActionTypes => {
	return {
		type: TilgangActionTypeKeys.PENDING
	};
};

const hentetTilgang = (
	harTilgang: boolean,
	sperrekode: TilgangSperrekode
): TilgangActionTypes => {
	return {
		type: TilgangActionTypeKeys.OK,
		harTilgang,
		sperrekode
	};
};

const hentTilgangFeilet = (feilmelding: string): TilgangActionTypes => {
	return {
		type: TilgangActionTypeKeys.FEILET,
		feilmelding
	};
};

export { hentTilgang, henterTilgang, hentetTilgang, hentTilgangFeilet };
