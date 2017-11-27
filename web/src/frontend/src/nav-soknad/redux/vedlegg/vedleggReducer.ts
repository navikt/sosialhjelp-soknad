import {
	VedleggActionTypeKeys,
	VedleggActionTypes,
	VedleggApiType
} from "./vedleggTypes";
import { REST_STATUS } from "../../types/restTypes";

const {
	INIT,
	LASTOPP_PENDING,
	MOTTATT_VEDLEGG_LISTE,
	HENT_VEDLEGGSFORVENTNING,
	HENT_VEDLEGGSFORVENTNING_OK,
	HENT_VEDLEGGSFORVENTNING_FEILET
} = VedleggActionTypeKeys;

const initialState: VedleggApiType = {
	restStatus: REST_STATUS.INITIALISERT,
	data: {},
	filer: [],
	status: INIT
};

export default (
	state: VedleggApiType = initialState,
	action: VedleggActionTypes
) => {
	switch (action.type) {
		case LASTOPP_PENDING: {
			return { ...state, status: LASTOPP_PENDING};
		}
		case MOTTATT_VEDLEGG_LISTE: {
			return {...state, status: MOTTATT_VEDLEGG_LISTE, filer: action.data};
		}
		case HENT_VEDLEGGSFORVENTNING:
			return {...state, restStatus: REST_STATUS.PENDING
			};
		case HENT_VEDLEGGSFORVENTNING_OK:
			return {
				...state,
				restStatus: REST_STATUS.OK,
				data: action.data
			};
		case HENT_VEDLEGGSFORVENTNING_FEILET:
			return {
				...state,
				restStatus: REST_STATUS.FEILET
			};
		default:
			return state;
	}
};
