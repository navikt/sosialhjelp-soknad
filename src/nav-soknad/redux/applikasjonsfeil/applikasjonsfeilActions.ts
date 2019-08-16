import {
	ApplikasjonsfeilActionTypeKeys,
	ApplikasjonsfeilActionTypes,
	Applikasjonsfeil
} from "./applikasjonsfeilTypes";

export function setApplikasjonsfeil(
	feil: Applikasjonsfeil
): ApplikasjonsfeilActionTypes {
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
