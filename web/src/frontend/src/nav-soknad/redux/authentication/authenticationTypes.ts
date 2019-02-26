export type AuthenticationActionTypes =
	| AuthenticateUser
	| LinkVisited


export interface AuthenticateUser {
	type: AuthenticationActionTypeKeys.AUTHENTICATE_USER;
}

export interface LinkVisited {
	type: AuthenticationActionTypeKeys.LINK_VISITED
}

export enum AuthenticationActionTypeKeys {
	AUTHENTICATE_USER = "authentication/AUTHENTICATE_USER",
	LINK_VISITED = "authentication/LINK_VISITED"
}

export interface AuthenticationState {
	linkVisited: boolean;
}