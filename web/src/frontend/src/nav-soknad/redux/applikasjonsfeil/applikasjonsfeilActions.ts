import { ApplikasjonsfeilActionTypes } from "./applikasjonsfeilTypes";

export function setApplikasjonsfeil(feil: string) {
	return {
		type: ApplikasjonsfeilActionTypes.SET_APPLIKASJONSFEIL,
		feil
	};
}

export function clearApplikasjonsfeil() {
	return {
		type: ApplikasjonsfeilActionTypes.CLEAR_APPLIKASJONSFEIL
	};
}
