import { Reducer } from "./types";
import { ActionTypeKeys } from "./types";
import { ActionTypes } from "./actions";

export interface SoknadState {
	status: string;
	soknadType?: string;
	brukerBehandlingId?: string;
	feilmelding?: string;
	oppsummering?: string;
}

const defaultState: SoknadState = {
	status: "",
	soknadType: "NAV DIGISOS",
	brukerBehandlingId: "",
	feilmelding: "",
	oppsummering: undefined
};

const soknadReducer: Reducer<SoknadState, ActionTypes> = (
	state = defaultState,
	action
): SoknadState => {
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

export default soknadReducer;
