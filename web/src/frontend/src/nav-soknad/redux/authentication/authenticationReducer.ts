import {
	AuthenticationActionTypeKeys,
	AuthenticationActionTypes,
	AuthenticationState
} from "./authenticationTypes";
import {AUTHENTICATION_STATUS} from "../../types/";

const { SET_AUTHENTICATED, SET_UNAUTHENTICATED, AUTHENTICATE_USER } = AuthenticationActionTypeKeys;


const initialState: AuthenticationState = {
	status: AUTHENTICATION_STATUS.UNAUTHENTICATED,
};

export default (state: AuthenticationState = initialState, action: AuthenticationActionTypes) => {
	switch (action.type) {
		case SET_AUTHENTICATED: {
			return {...state, status: AUTHENTICATION_STATUS.AUTHENTICATED };
		}
		case SET_UNAUTHENTICATED:
			return {...state, status: AUTHENTICATION_STATUS.UNAUTHENTICATED };
		case AUTHENTICATE_USER:
			return state;

		default:
			return state;
	}
};
