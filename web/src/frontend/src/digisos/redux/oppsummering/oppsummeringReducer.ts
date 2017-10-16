import { Reducer } from "../../../nav-soknad/redux/reduxTypes";
import { OppsummeringActionTypeKeys } from "./oppsummeringTypes";
import { OppsummeringActionTypes } from "./oppsummeringActions";

export interface OppsummeringState {
	oppsummering?: string;
}

const defaultState: OppsummeringState = {
	oppsummering: undefined
};

const extractBody = (oppsummering: string): string => {
	if (!oppsummering) {
		return "";
	}
	const idx1 = oppsummering.indexOf("<body>") + 6;
	const idx2 = oppsummering.indexOf("</body>");
	return oppsummering.substring(idx1, idx2);
};

const OppsummeringReducer: Reducer<
	OppsummeringState,
	OppsummeringActionTypes
> = (state = defaultState, action): OppsummeringState => {
	switch (action.type) {
		case OppsummeringActionTypeKeys.SET_OPPSUMMERING:
			return {
				...state,
				oppsummering: extractBody(action.oppsummering)
			};
		default:
			return state;
	}
};

export default OppsummeringReducer;
