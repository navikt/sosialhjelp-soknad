import { TilgangActionTypeKeys, TilgangActionTypes } from "./tilgangTypes";

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

const hentetTilgang = (harTilgang: boolean): TilgangActionTypes => {
	return {
		type: TilgangActionTypeKeys.OK,
		harTilgang
	};
};

const hentTilgangFeilet = (feilmelding: string): TilgangActionTypes => {
	return {
		type: TilgangActionTypeKeys.FEILET,
		feilmelding
	};
};

export { hentTilgang, henterTilgang, hentetTilgang, hentTilgangFeilet };
