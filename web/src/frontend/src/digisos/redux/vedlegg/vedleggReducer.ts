import { Reducer } from "../../../nav-soknad/redux/reduxTypes";
import { REST_STATUS } from "../../../nav-soknad/types/restTypes";
import { VedleggsforventingActionType, VedleggsforventingActionTypeKeys, VedleggState } from "./vedleggTypes";

const defaultState: VedleggState = {
	restStatus: REST_STATUS.INITIALISERT,
	data: {}
};

const vedleggReducer: Reducer<VedleggState, VedleggsforventingActionType> = (state = defaultState, action) => {

	switch (action.type) {
		case VedleggsforventingActionTypeKeys.HENT_VEDLEGG:
			return {
				...defaultState,
				restStatus: REST_STATUS.PENDING
			};
		case VedleggsforventingActionTypeKeys.HENT_VEDLEGG_OK:
			return {
				...state,
				restStatus: REST_STATUS.OK,
				data: action.data
			};
		case VedleggsforventingActionTypeKeys.HENT_VEDLEGG_FEILET:
			return {
				...state,
				restStatus: REST_STATUS.FEILET
			};
		default:
			return state;
	}
};

export default vedleggReducer;
