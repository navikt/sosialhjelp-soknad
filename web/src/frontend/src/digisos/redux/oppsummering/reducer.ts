import { Reducer } from "./types";
import { ActionTypeKeys } from "./types";
import { ActionTypes } from "./actions";

export interface OppsummeringState {
	oppsummering?: string;
}

const defaultState: OppsummeringState = {
	oppsummering: undefined
};

const OppsummeringReducer: Reducer<OppsummeringState, ActionTypes> = (
	state = defaultState,
	action
): OppsummeringState => {
	switch (action.type) {
		case ActionTypeKeys.SET_OPPSUMMERING:
			return {
				...state,
				oppsummering: action.oppsummering
			};
		default:
			return state;
	}
};

export default OppsummeringReducer;
