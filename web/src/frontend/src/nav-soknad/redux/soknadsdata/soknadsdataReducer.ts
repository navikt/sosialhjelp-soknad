import { Reducer } from "../reduxTypes";
import {
	Bankinformasjon,
	initialBankinfoState
} from "../../../digisos/skjema/personopplysninger/bankinfo/bankinformasjonActions";
import {
	Begrunnelse,
	initialBegrunnelseState
} from "../../../digisos/skjema/personopplysninger/begrunnelse/begrunnelseActions";

export enum SoknadsdataActionTypeKeys {
	OPPDATER_SOKNADSDATA = "soknadsdata/OPPDATER"
}

export interface SoknadsdataState {
	bankinformasjon: Bankinformasjon;
	begrunnelse: Begrunnelse;
}

const initialState: SoknadsdataState = {
	bankinformasjon: initialBankinfoState,
	begrunnelse: initialBegrunnelseState
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
