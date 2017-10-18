export enum ApplikasjonsfeilActionTypeKeys {
	SET_APPLIKASJONSFEIL = "applikasjonsfeil/SET_APPLIKASJONSFEIL",
	CLEAR_APPLIKASJONSFEIL = "applikasjonsfeil/CLEAR_APPLIKASJONSFEIL"
}

export interface Applikasjonsfeil {
	tittel: string;
	innhold: React.ReactNode;
}

export interface SetApplikasjonsfeilAction {
	type: ApplikasjonsfeilActionTypeKeys.SET_APPLIKASJONSFEIL;
	feil: Applikasjonsfeil;
}

export interface ClearApplikasjonsfeilAction {
	type: ApplikasjonsfeilActionTypeKeys.CLEAR_APPLIKASJONSFEIL;
}

export type ApplikasjonsfeilActionTypes =
	| SetApplikasjonsfeilAction
	| ClearApplikasjonsfeilAction;
