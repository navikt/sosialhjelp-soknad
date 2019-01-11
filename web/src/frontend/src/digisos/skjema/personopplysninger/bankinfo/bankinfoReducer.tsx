import { Reducer } from "../../../../nav-soknad/redux/reduxTypes";

export enum BankinfoActionTypeKeys {
	LES_BANKINFO = "bankinfo/LES_BANKINFO",
	LES_BANKINFO_OK = "bankinfo/LES_BANKINFO_OK",
	OPPDATER_BANKINFO = "bankinfo/OPPDATER_BANKINFO",
	OPPDATER_BANKINFO_OK = "bankinfo/OPPDATER_BANKINFO_OK",
	FEILET = "bankinfo/FEILET"
}

export const enum BankinfoStatus {
	INITIELL = "INITIELL",
	LESER = "LESER",
	LES_OK = "LES_OK",
	OPPDATERER = "OPPDATERER",
	OPPDATER_OK = "OPPDATER_OK"
}

export interface OppdaterBankinfoAction {
	type: BankinfoActionTypeKeys.OPPDATER_BANKINFO;
	behandlingsId: string;
	brukerdefinert: boolean;
	verdi: string;
	harIkkeKonto: boolean;
}

export interface LesBankinfoAction {
	type: BankinfoActionTypeKeys.LES_BANKINFO;
	behandlingsId: string;
}

export interface BankinfoState {
	brukerdefinert: boolean;
	systemverdi: "" | "true" | "false";
	verdi: string | null;
	harIkkeKonto: boolean | null;
	status: BankinfoStatus;
}

const initialState: BankinfoState = {
	brukerdefinert: true,
	systemverdi: "",
	verdi: "",
	harIkkeKonto: null,
	status: BankinfoStatus.INITIELL
};

const BankinfoReducer: Reducer<BankinfoState, any> = (
	state = initialState,
	action
): any => {

	switch (action.type) {
		case BankinfoActionTypeKeys.LES_BANKINFO: {
			return {
				...state,
				status: BankinfoStatus.LESER
			};
		}
		case BankinfoActionTypeKeys.LES_BANKINFO_OK: {
			return {
				...state,
				status: BankinfoStatus.LES_OK,
				verdi: action.verdi
			};
		}
		default:
			return state;
	}
};

export interface LesBankInfoOkAction {
	brukerdefinert: boolean;
	systemverdi: boolean;
	verdi: string;
	harIkkeKonto: boolean;
}

export const lesBankinfoAction = (): any => {
	return {
		type: BankinfoActionTypeKeys.LES_BANKINFO
	}
};

export const oppdaterBankinfoAction = (verdi: string): any => {
	return {
		type: BankinfoActionTypeKeys.OPPDATER_BANKINFO,
		verdi
	}
};

export const lesBankinfoOk = (verdi: string): any => {
	return {
		type: BankinfoActionTypeKeys.LES_BANKINFO_OK,
		verdi
	};
};

export default BankinfoReducer;
