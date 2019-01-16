import { Reducer } from "../reduxTypes";

export enum SoknadsdataActionTypeKeys {
	OPPDATER_SOKNADSDATA = "soknadsdata/OPPDATER"
}

export interface BankinfoState {
	brukerdefinert: boolean;
	systemverdi: "" | "true" | "false";
	verdi: string | null;
	harIkkeKonto: boolean | null;
}

const initialBankinfoState: BankinfoState = {
	brukerdefinert: true,
	systemverdi: "",
	verdi: "",
	harIkkeKonto: null
};

export interface SoknadsdataState {
	bankinformasjon: BankinfoState;
}

const initialState: SoknadsdataState = {
	bankinformasjon: initialBankinfoState
};

const SoknadsdataReducer: Reducer<SoknadsdataState, any> = (
	state = initialState,
	action
): any => {
	switch (action.type) {
		case SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA: {
			return {
				...state,
				...action.verdi
			};
		}
		default:
			return state;
	}
};

export const oppdaterSoknadsdata = (verdi: any): any => {
	return {
		type: SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA,
		verdi
	}
};

export default SoknadsdataReducer;
