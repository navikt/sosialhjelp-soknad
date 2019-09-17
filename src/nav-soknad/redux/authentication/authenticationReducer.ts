import {AuthenticationActionTypeKeys, AuthenticationActionTypes, AuthenticationState} from "./authenticationTypes";

const initialState: AuthenticationState = {
	linkVisited: false,
};

export default (
	state: AuthenticationState = initialState,
	action: AuthenticationActionTypes
) => {
	switch (action.type) {
		case AuthenticationActionTypeKeys.LINK_VISITED: {
			const AUTH_LINK_VISITED = "sosialhjelpSoknadAuthLinkVisited";
			// @ts-ignore
			// window[AUTH_LINK_VISITED] = window[AUTH_LINK_VISITED] ? window[AUTH_LINK_VISITED]+1 :  1;
			window[AUTH_LINK_VISITED] = true;
			return state;
        }
		default:
			return state;
	}
};

