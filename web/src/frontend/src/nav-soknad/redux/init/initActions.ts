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
