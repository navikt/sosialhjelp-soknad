import {InitActionTypeKeys, InitActionTypes, InitState} from "./initTypes";
import {REST_STATUS} from "../../types";

const { OK, START, FEILET } = InitActionTypeKeys;

const initialState: InitState = {
	restStatus: REST_STATUS.INITIALISERT,
	visSamtykkeInfo: false,
	fornavn: undefined
};

export default (state: InitState = initialState, action: InitActionTypes) => {
	switch (action.type) {
		case OK: {
			console.warn("Inni initReducer");
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
		case InitActionTypeKeys.LAGRE_FORNAVN_PA_STORE:
			return {...state, fornavn: action.fornavn};
		default:
			return state;
	}
};
