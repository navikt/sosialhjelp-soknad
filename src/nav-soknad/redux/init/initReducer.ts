import {InitActionTypeKeys, InitActionTypes, InitState} from "./initTypes";
import {REST_STATUS} from "../../types";

const { OK, START, FEILET } = InitActionTypeKeys;

const initialState: InitState = {
	restStatus: REST_STATUS.INITIALISERT,
	visSamtykkeInfo: false,
	fornavn: undefined,
	restStatusTilgang: REST_STATUS.PENDING,
	restStatusMiljovariabler: REST_STATUS.PENDING,
	restStatusLedetekster: REST_STATUS.PENDING,
	restStatusFornavn: REST_STATUS.PENDING
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
		case InitActionTypeKeys.LAGRE_FORNAVN_PA_STORE:
			return {...state, fornavn: action.fornavn};
		case InitActionTypeKeys.TILGANG_OK: return {...state, restStatusTilgang: REST_STATUS.OK};
		case InitActionTypeKeys.MILJOVARIABLER_OK: return {...state, restStatusMiljovariabler: REST_STATUS.OK};
		case InitActionTypeKeys.LEDETEKSTER_OK: return {...state, restStatusLedetekster: REST_STATUS.OK};
		case InitActionTypeKeys.FORNAVN_OK: return {...state, restStatusFornavn: REST_STATUS.OK};
		default:
			return state;
	}
};
