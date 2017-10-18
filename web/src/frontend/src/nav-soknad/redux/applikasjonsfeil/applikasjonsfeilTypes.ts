export enum ApplikasjonsfeilActionTypes {
	SET_APPLIKASJONSFEIL = "applikasjon/SET_APPLIKASJONSFEIL",
	CLEAR_APPLIKASJONSFEIL = "applikasjon/CLEAR_APPLIKASJONSFEIL"
}

export interface SetApplikasjonsfeilAction {
	type: ApplikasjonsfeilActionTypes.SET_APPLIKASJONSFEIL;
	feil: string;
}

export interface ClearApplikasjonsfeilAction {
	type: ApplikasjonsfeilActionTypes.CLEAR_APPLIKASJONSFEIL;
}

export type ApplikasjonsfeilActions =
	| SetApplikasjonsfeilAction
	| ClearApplikasjonsfeilAction;
