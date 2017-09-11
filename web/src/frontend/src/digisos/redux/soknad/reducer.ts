import { Reducer } from "./types";
import { ActionTypeKeys, REST_STATUS } from "./types";
import { ActionTypes } from "./actions";

export interface SoknadState {
	restStatus: string;
	soknadType?: string;
	brukerBehandlingId?: string;
	feilmelding?: string;
}

const defaultState: SoknadState = {
	restStatus: "",
	soknadType: "NAV DIGISOS",
	brukerBehandlingId: "",
	feilmelding: ""
};

const soknadReducer: Reducer<SoknadState, ActionTypes> = (
	state = defaultState,
	action
): SoknadState => {
	switch (action.type) {
		case ActionTypeKeys.RESET_SOKNAD:
			return {
				...state,
				...defaultState
			};
		case ActionTypeKeys.OPPRETT_SOKNAD:
			return {
				...state,
				brukerBehandlingId: "",
				restStatus: ActionTypeKeys.PENDING
			};
		case ActionTypeKeys.SET_SERVER_FEIL:
			return {
				...state,
				brukerBehandlingId: "",
				feilmelding: action.feilmelding,
				restStatus: ActionTypeKeys.FEILET
			};
		case ActionTypeKeys.SET_BRUKERBEHANDLING_ID:
			return {
				...state,
				brukerBehandlingId: action.brukerBehandlingId,
				restStatus: ActionTypeKeys.OK
			};
		case ActionTypeKeys.PENDING:
			return {
				...state,
				restStatus: REST_STATUS.PENDING
			};
		case ActionTypeKeys.OK:
			return {
				...state,
				restStatus: REST_STATUS.OK
			};
		default:
			return state;
	}
};

export default soknadReducer;
