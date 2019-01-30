import {AuthenticateUser, AuthenticationActionTypeKeys, AuthenticationActionTypes} from "./authenticationTypes";
import {AUTHENTICATION_STATUS} from "../../types";

export const setAuthenticated = (): AuthenticationActionTypes => {
	return {
		type: AuthenticationActionTypeKeys.SET_AUTHENTICATED
	};
};

export const setUnauthenticated = (): AuthenticationActionTypes => {
	return {
		type: AuthenticationActionTypeKeys.SET_UNAUTHENTICATED
	};
};

export const authenticateUser = (authenticationStatus: AUTHENTICATION_STATUS): AuthenticateUser => {
	return {
		type: AuthenticationActionTypeKeys.AUTHENTICATE_USER,
		authenticationStatus
	};
};
