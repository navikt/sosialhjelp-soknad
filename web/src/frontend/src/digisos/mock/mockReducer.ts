export enum MockActionTypeKeys {
	SETT_IDENT = "mock/SETT_IDENT"
}

export function settMockIdent(ident: string) {
	return {
		type: MockActionTypeKeys.SETT_IDENT,
		ident
	};
}

export type MockActionTypes = SettIdentAction

export interface SettIdentAction {
	type: MockActionTypeKeys.SETT_IDENT;
	ident: string;
}

export interface MockState {
	ident: string
}

export const defaultState: MockState = {
	ident: "007"
};

export default (state: MockState = defaultState, action: MockActionTypes) => {
	switch (action.type) {
		case MockActionTypeKeys.SETT_IDENT:
			return {
				...state,
				ident: action.ident
			};
		default:
			return state;
	}
};
