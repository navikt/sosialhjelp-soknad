import { ActionTypeKeys, InformasjonActionTypes } from "./informasjonTypes";

const hentTekster = (): InformasjonActionTypes  => {
	return {
		type: ActionTypeKeys.INIT
	};
};

const henterTekster = (): InformasjonActionTypes => {
	return {
		type: ActionTypeKeys.PENDING
	};
};

const hentetTekster = ( tekster: object ): InformasjonActionTypes => {
	return {
		type: ActionTypeKeys.OK,
		data: tekster
	};
};

const hentTeksterFeilet = (feilmelding: string): InformasjonActionTypes => {
	return {
		type: ActionTypeKeys.FEILET,
		feilmelding
	};
};

export {
	hentTekster,
	henterTekster,
	hentetTekster,
	hentTeksterFeilet
};
