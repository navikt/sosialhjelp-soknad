import { REST_STATUS } from "../../types";
import { Reducer } from "../reduxTypes";
import { KommunerActionTypeKeys, KommunerActionTypes, KommunerState } from "./adresseAutocompleteTypes";

const defaultState: KommunerState = {
	restStatus: REST_STATUS.INITIALISERT,
	data: [],
	error: ""
};

const adresseAutocompleteReducer: Reducer<KommunerState, KommunerActionTypes> = (state = defaultState, action) => {
	switch (action.type) {
		case KommunerActionTypeKeys.LES_KOMMUNER:
			return {
				...state,
				restStatus: REST_STATUS.PENDING
			};

		case KommunerActionTypeKeys.LES_KOMMUNER_OK:
			return {
				...state,
				restStatus: REST_STATUS.OK,
				data: action.adresseAutocomplete
			};
		case KommunerActionTypeKeys.LES_KOMMUNER_FEILET:
			return {
				...state,
				restStatus: REST_STATUS.FEILET,
				data: [],
				error: action.error
			};
		default:
			return state;
	}
};

export default adresseAutocompleteReducer;
