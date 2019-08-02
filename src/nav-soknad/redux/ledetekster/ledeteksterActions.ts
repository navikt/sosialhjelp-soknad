import {
	LedeteksterActionTypeKeys,
	InformasjonActionTypes
} from "./ledeteksterTypes";

const hentTekster = (): InformasjonActionTypes => {
	return {
		type: LedeteksterActionTypeKeys.INIT
	};
};

const henterTekster = (): InformasjonActionTypes => {
	return {
		type: LedeteksterActionTypeKeys.PENDING
	};
};

const hentetTekster = (tekster: object): InformasjonActionTypes => {
	return {
		type: LedeteksterActionTypeKeys.OK,
		data: tekster
	};
};

const hentTeksterFeilet = (feilmelding: string): InformasjonActionTypes => {
	return {
		type: LedeteksterActionTypeKeys.FEILET,
		feilmelding
	};
};

export { hentTekster, henterTekster, hentetTekster, hentTeksterFeilet };
