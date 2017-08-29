import { Reducer } from "./types";
import { ActionTypeKeys } from "./types";
import { ActionTypes } from "./actions";

export interface SoknadState {
	status: string;
	soknadType?: string;
	brukerBehandlingId?: string;
	feilmelding?: string;
}

const defaultState: SoknadState = {
	status: "",
	soknadType: "NAV DIGISOS",
	brukerBehandlingId: "",
	feilmelding: ""
};

const soknadReducer: Reducer<SoknadState, ActionTypes> = (
	state = defaultState,
	action
): SoknadState => {
	switch (action.type) {

		case ActionTypeKeys.OPPRETT_SOKNAD:
			return {
				...state,
				brukerBehandlingId: "",
				status: ActionTypeKeys.PENDING
			};

		case ActionTypeKeys.SET_SERVER_FEIL:
			return {
				...state,
				brukerBehandlingId: "",
				feilmelding: action.feilmelding,
				status: ActionTypeKeys.FEILET
			};

		case ActionTypeKeys.SET_BRUKERBEHANDLING_ID:
			return {
				...state,
				brukerBehandlingId: action.brukerBehandlingId,
				status: ActionTypeKeys.OK
			};
		default:
			return state;
	}
};

export default soknadReducer;
