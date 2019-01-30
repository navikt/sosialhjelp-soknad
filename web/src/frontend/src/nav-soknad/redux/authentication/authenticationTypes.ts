import {AUTHENTICATION_STATUS} from "../../types/authenticationTypes";

export type AuthenticationActionTypes =
	SetUnauthenticated |
	SetAuthenticated |
	AuthenticateUser

interface SetUnauthenticated {
	type: AuthenticationActionTypeKeys.SET_UNAUTHENTICATED;
}

interface SetAuthenticated {
	type: AuthenticationActionTypeKeys.SET_AUTHENTICATED;
}

export interface AuthenticateUser {
	type: AuthenticationActionTypeKeys.AUTHENTICATE_USER;
	authenticationStatus: AUTHENTICATION_STATUS;
}

export enum AuthenticationActionTypeKeys {
	SET_AUTHENTICATED = "authentication/SET_AUTHENTICATED",
	SET_UNAUTHENTICATED = "authentication/SET_UNAUTHENTICATED",
	AUTHENTICATE_USER = "authentication/AUTHENTICATE"
}

export interface AuthenticationState {
	status: AUTHENTICATION_STATUS;
}
