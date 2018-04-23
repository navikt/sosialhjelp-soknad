import { REST_STATUS } from "../../types/restTypes";
import { EttersendelseActionTypeKeys, EttersendelseActionTypes, EttersendelseState } from "./ettersendelseTypes";
import { Reducer } from "../reduxTypes";

const initialState: EttersendelseState = {
	restStatus: REST_STATUS.INITIALISERT,
	opplastingStatus: REST_STATUS.INITIALISERT,
	ettersendStatus: REST_STATUS.INITIALISERT,
	data: [],
	brukerbehandlingId: null,
	innsendte: {
		originalSoknad: null,
		ettersendelser: null
	}
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
		case EttersendelseActionTypeKeys.ETTERSEND_PENDING: {
			return {
				...state,
				ettersendStatus: REST_STATUS.PENDING
			};
		}
		case EttersendelseActionTypeKeys.ETTERSEND_OK: {
			return {
				...state,
				ettersendStatus: REST_STATUS.OK
			};
		}
		case EttersendelseActionTypeKeys.LES_ETTERSENDELSER: {
			return {
				...state,
				restStatus: REST_STATUS.PENDING
			};
		}
		case EttersendelseActionTypeKeys.LES_ETTERSENDELSER_OK: {
			return {
				...state,
				restStatus: REST_STATUS.OK,
				innsendte: action.ettersendelser
			};
		}
		default:
			return state;
	}
};

export default ettersendelseReducer;
