import {AuthenticationActionTypeKeys, AuthenticationActionTypes} from "./authenticationTypes";

export const authenticateUser = (): AuthenticationActionTypes => {
	return {
		type: AuthenticationActionTypeKeys.AUTHENTICATE_USER
	};
};

export const setLinkVisited = (): AuthenticationActionTypes => {
	return {
		type: AuthenticationActionTypeKeys.LINK_VISITED
	};
};