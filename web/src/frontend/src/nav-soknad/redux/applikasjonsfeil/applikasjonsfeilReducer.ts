import { Reducer } from "../reduxTypes";
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

const applikasjonsfeilReducer: Reducer<
	ApplikasjonsfeilState,
	ApplikasjonsfeilActionTypes
> = (state = defaultState, action) => {
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

export default applikasjonsfeilReducer;
