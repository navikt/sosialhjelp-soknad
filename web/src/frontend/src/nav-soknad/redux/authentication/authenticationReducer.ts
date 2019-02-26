import {AuthenticationActionTypeKeys, AuthenticationActionTypes, AuthenticationState} from "./authenticationTypes";

const initialState: AuthenticationState = {
	linkVisited: false,
};

export default (
	state: AuthenticationState = initialState,
	action: AuthenticationActionTypes
) => {
	switch (action.type) {
		case AuthenticationActionTypeKeys.LINK_VISITED:
			return {...state, linkVisited: true};
		default:
			return state;
	}
};

