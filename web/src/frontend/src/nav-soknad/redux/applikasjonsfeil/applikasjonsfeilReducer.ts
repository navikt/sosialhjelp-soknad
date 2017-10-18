import { Reducer } from "../reduxTypes";
import {
	ApplikasjonsfeilActions,
	ApplikasjonsfeilActionTypes
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
	ApplikasjonsfeilActions
> = (state = defaultState, action) => {
	switch (action.type) {
		case ApplikasjonsfeilActionTypes.SET_APPLIKASJONSFEIL:
			return {
				...state,
				feil: action.feil,
				visDialog: true
			};
		case ApplikasjonsfeilActionTypes.CLEAR_APPLIKASJONSFEIL:
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
