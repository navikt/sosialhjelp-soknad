import { InitActionTypeKeys, InitActionTypes } from "./initTypes";

export const initStart = (): InitActionTypes => {
	return {
		type: InitActionTypeKeys.START
	};
};

export const initFerdig = (): InitActionTypes => {
	return {
		type: InitActionTypeKeys.OK
	};
};

export const initFeilet = (): InitActionTypes => {
	return {
		type: InitActionTypeKeys.FEILET
	};
};

export function setVisSamtykkeInfo(visSamtykkeInfo: boolean): InitActionTypes {
	return {
		type: InitActionTypeKeys.SET_VIS_SAMTYKKE_INFO,
		visSamtykkeInfo
	};
}

export function lagreFornavnPaStore(fornavn: string): InitActionTypes {
	return {
		type: InitActionTypeKeys.LAGRE_FORNAVN_PA_STORE,
		fornavn
	}
}


export const tilgangOk = (): InitActionTypes => {
	return {
		type: InitActionTypeKeys.TILGANG_OK
	}
};

export const miljovariablerOk = (): InitActionTypes => {
	return {
		type: InitActionTypeKeys.MILJOVARIABLER_OK
	}
};

export const ledeteksterOk = (): InitActionTypes => {
	return {
		type: InitActionTypeKeys.LEDETEKSTER_OK
	}
};

export const fornavnOk = (): InitActionTypes => {
	return {
		type: InitActionTypeKeys.FORNAVN_OK
	}
};

