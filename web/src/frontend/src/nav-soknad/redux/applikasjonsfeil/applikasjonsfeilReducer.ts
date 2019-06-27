import {
	ApplikasjonsfeilActionTypes,
	ApplikasjonsfeilActionTypeKeys
} from "./applikasjonsfeilTypes";

export interface ApplikasjonsfeilState {
	feil: any;
	visDialog: boolean;
}

const defaultState: ApplikasjonsfeilState = {
	feil: null,
	visDialog: false
};

export default (state: ApplikasjonsfeilState = defaultState, action: ApplikasjonsfeilActionTypes) => {
	switch (action.type) {
		case ApplikasjonsfeilActionTypeKeys.SET_APPLIKASJONSFEIL:
			return {
				...state,
				feil: action.feil,
				visDialog: true
			};
		case ApplikasjonsfeilActionTypeKeys.CLEAR_APPLIKASJONSFEIL:
			return {
				...state,
				feil: undefined,
				visDialog: false
			};
		default:
			return state;
	}
};
