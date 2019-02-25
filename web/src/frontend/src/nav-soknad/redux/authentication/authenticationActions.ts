import { AuthenticationActionTypeKeys, AuthenticationActionTypes} from "./authenticationTypes";
import {AUTHENTICATION_STATUS} from "../../types";

export const authenticateUser = (authenticationStatus: AUTHENTICATION_STATUS): AuthenticationActionTypes => {
	return {
		type: AuthenticationActionTypeKeys.AUTHENTICATE_USER,
		authenticationStatus
	};
};
