import { Reducer } from "../reduxTypes";
import { Bankinformasjon, initialBankinfoState } from "./bankinformasjonService";

export enum SoknadsdataActionTypeKeys {
	OPPDATER_SOKNADSDATA = "soknadsdata/OPPDATER"
}

export interface SoknadsdataState {
	bankinformasjon: Bankinformasjon;
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

export const oppdaterSoknadsdataAction = (verdi: any): any => {
	return {
		type: SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA,
		verdi
	}
};

export default SoknadsdataReducer;
