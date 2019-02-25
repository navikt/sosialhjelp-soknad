import {AUTHENTICATION_STATUS} from "../../types/authenticationTypes";

export type AuthenticationActionTypes =
	| AuthenticateUser


export interface AuthenticateUser {
	type: AuthenticationActionTypeKeys.AUTHENTICATE_USER;
	authenticationStatus: AUTHENTICATION_STATUS;
}

export enum AuthenticationActionTypeKeys {
	AUTHENTICATE_USER = "authentication/AUTHENTICATE_USER"
}

