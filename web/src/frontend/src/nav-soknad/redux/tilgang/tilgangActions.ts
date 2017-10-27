import { ActionTypeKeys, TilgangActionTypes } from "./tilgangTypes";

const hentTilgang = (): TilgangActionTypes => {
	return {
		type: ActionTypeKeys.INIT
	};
};

const henterTilgang = (): TilgangActionTypes => {
	return {
		type: ActionTypeKeys.PENDING
	};
};

const hentetTilgang = (harTilgang: boolean): TilgangActionTypes => {
	return {
		type: ActionTypeKeys.OK,
		harTilgang
	};
};

const hentTilgangFeilet = (feilmelding: string): TilgangActionTypes => {
	return {
		type: ActionTypeKeys.FEILET,
		feilmelding
	};
};

export { hentTilgang, henterTilgang, hentetTilgang, hentTilgangFeilet };
