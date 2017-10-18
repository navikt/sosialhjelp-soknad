import {
	ApplikasjonsfeilActionTypeKeys,
	ApplikasjonsfeilActionTypes
} from "./applikasjonsfeilTypes";

export function setApplikasjonsfeil(feil: string): ApplikasjonsfeilActionTypes {
	return {
		type: ApplikasjonsfeilActionTypeKeys.SET_APPLIKASJONSFEIL,
		feil
	};
}

export function clearApplikasjonsfeil(): ApplikasjonsfeilActionTypes {
	return {
		type: ApplikasjonsfeilActionTypeKeys.CLEAR_APPLIKASJONSFEIL
	};
}
