import { REST_STATUS } from "../../types/restTypes";
import { EttersendelseActionTypeKeys, EttersendelseActionTypes, EttersendelseState } from "./ettersendelseTypes";
import { Reducer } from "../reduxTypes";

const initialState: EttersendelseState = {
	restStatus: REST_STATUS.INITIALISERT,
	opplastingStatus: REST_STATUS.OK,
	data: []
};

const ettersendelseReducer: Reducer<EttersendelseState, EttersendelseActionTypes> = (
	state = initialState,
	action
): EttersendelseState => {
	switch (action.type) {
		case EttersendelseActionTypeKeys.LAST_OPP: {
			return {
				...state,
				opplastingStatus: REST_STATUS.PENDING
			};
		}
		case EttersendelseActionTypeKeys.LAST_OPP_OK: {
			return {
				...state,
				opplastingStatus: REST_STATUS.OK
			};
		}
		case EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG_OK: {
			return {
				...state,
				data: action.vedlegg
			};
		}
		default:
			return state;
	}
};

export default ettersendelseReducer;
