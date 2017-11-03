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

export const initFeilet = (feilmelding: string): InitActionTypes => {
	return {
		type: InitActionTypeKeys.FEILET,
		feilmelding
	};
};
