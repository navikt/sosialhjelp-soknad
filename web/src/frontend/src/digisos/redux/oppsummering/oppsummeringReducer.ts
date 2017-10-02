import { Reducer } from "../../../nav-soknad/redux/reduxTypes";
import { OppsummeringActionTypeKeys } from "./oppsummeringTypes";
import { OppsummeringActionTypes } from "./oppsummeringActions";

export interface OppsummeringState {
	oppsummering?: string;
}

const defaultState: OppsummeringState = {
	oppsummering: undefined
};

const OppsummeringReducer: Reducer<
	OppsummeringState,
	OppsummeringActionTypes
> = (state = defaultState, action): OppsummeringState => {
	switch (action.type) {
		case OppsummeringActionTypeKeys.SET_OPPSUMMERING:
			return {
				...state,
				oppsummering: action.oppsummering
			};
		default:
			return state;
	}
};

export default OppsummeringReducer;
