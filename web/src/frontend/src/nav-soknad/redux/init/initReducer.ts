import { InitActionTypeKeys, InitActionTypes, InitState } from "./initTypes";

const { OK, START, FEILET } = InitActionTypeKeys;
import { REST_STATUS } from "../../types";

const initialState: InitState = {
	restStatus: REST_STATUS.INITIALISERT,
	visSamtykkeInfo: false,
	bekreftSamtykkeInfo: false,
	visSamtykkeMangler: false
};

export default (state: InitState = initialState, action: InitActionTypes) => {
	switch (action.type) {
		case OK: {
			return {...state, restStatus: REST_STATUS.OK };
		}
		case START:
			return {...state, restStatus: REST_STATUS.PENDING };
		case FEILET:
			return {...state, restStatus: REST_STATUS.FEILET };
		case InitActionTypeKeys.SET_VIS_SAMTYKKE_INFO:
			return {
				...state,
				visSamtykkeInfo: action.visSamtykkeInfo,
			};
		case InitActionTypeKeys.SET_VIS_SAMTYKKE_MANGLER:
			return {
				...state,
				visSamtykkeMangler: action.visSamtykkeMangler
			};
		case InitActionTypeKeys.BEKREFT_SAMTYKKE:
			return {
				...state,
				bekreftSamtykkeInfo: !state.bekreftSamtykkeInfo,
				visSamtykkeMangler: false
			};
		default:
			return state;
	}
};
