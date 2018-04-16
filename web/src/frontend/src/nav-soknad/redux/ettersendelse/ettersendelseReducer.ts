import { REST_STATUS } from "../../types/restTypes";
import { EttersendelseActionTypeKeys, EttersendelseActionTypes, EttersendelseState } from "./ettersendelseTypes";
import { Reducer } from "../reduxTypes";

const initialState: EttersendelseState = {
	restStatus: REST_STATUS.INITIALISERT,
	opplastingStatus: REST_STATUS.OK,
	data: [],
	brukerbehandlingId: null
};

const ettersendelseReducer: Reducer<EttersendelseState, EttersendelseActionTypes> = (
	state = initialState,
	action
): EttersendelseState => {
	switch (action.type) {
		case EttersendelseActionTypeKeys.NY_OK: {
			return {
				...state,
				brukerbehandlingId: action.brukerbehandlingId
			};
		}
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
		case EttersendelseActionTypeKeys.SEND_PENDING: {
			return {
				...state,
				restStatus: REST_STATUS.PENDING
			};
		}
		case EttersendelseActionTypeKeys.SEND_OK: {
			return {
				...state,
				restStatus: REST_STATUS.OK
			};
		}
		default:
			return state;
	}
};

export default ettersendelseReducer;
