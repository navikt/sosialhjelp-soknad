import { Reducer } from "./soknadTypes";
import { SoknadActionTypeKeys, REST_STATUS } from "./soknadTypes";
import { SoknadActionTypes } from "./soknadActions";

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

const soknadReducer: Reducer<SoknadState, SoknadActionTypes> = (
	state = defaultState,
	action
): SoknadState => {
	switch (action.type) {
		case SoknadActionTypeKeys.RESET_SOKNAD:
			return {
				...state,
				...defaultState
			};
		case SoknadActionTypeKeys.OPPRETT_SOKNAD:
			return {
				...state,
				brukerBehandlingId: "",
				restStatus: SoknadActionTypeKeys.PENDING
			};
		case SoknadActionTypeKeys.SET_SERVER_FEIL:
			return {
				...state,
				brukerBehandlingId: "",
				feilmelding: action.feilmelding,
				restStatus: SoknadActionTypeKeys.FEILET
			};
		case SoknadActionTypeKeys.SET_BRUKERBEHANDLING_ID:
			return {
				...state,
				brukerBehandlingId: action.brukerBehandlingId,
				restStatus: SoknadActionTypeKeys.OK
			};
		case SoknadActionTypeKeys.OK:
			return {
				...state,
				restStatus: REST_STATUS.OK
			};
		case SoknadActionTypeKeys.PENDING:
			return {
				...state,
				restStatus: REST_STATUS.PENDING
			};
		case SoknadActionTypeKeys.OK:
			return {
				...state,
				restStatus: REST_STATUS.OK
			};
		default:
			return state;
	}
};

export default soknadReducer;
