import { REST_STATUS } from "../../digisos/redux/soknad/soknadTypes";
import {
	FaktumActionTypeKeys,
	Reducer,
	FaktaActionTypeKeys,
	Faktum
} from "./faktaTypes";
import { ValideringState } from "./valideringReducer";

export interface SoknadAppState {
	fakta: FaktumState;
	validering: ValideringState;
}

export interface FaktumState {
	restStatus: string;
	data: Faktum[];
}

export interface FaktumComponentProps {
	fakta: Faktum[];
}

const initialState: FaktumState = {
	restStatus: "",
	data: []
};

export type FaktumActionTypes =
	| OppdatertFaktumVerdi
	| OppdaterFaktumVerdi
	| OpprettFaktumVerdi
	| OpprettetFaktumVerdi
	| SetFaktaAction
	| SetFaktaPendingAction
	| SetFaktaOkAction
	| SetFaktaFailedAction
	| SetFaktumFailedAction;

interface OppdaterFaktumVerdi {
	type: FaktumActionTypeKeys.OPPDATER_FAKTUM;
}

interface OppdatertFaktumVerdi {
	type: FaktumActionTypeKeys.OPPDATERT_FAKTUM;
	faktum: Faktum;
}

interface OpprettFaktumVerdi {
	type: FaktumActionTypeKeys.OPPRETT_FAKTUM;
}

interface OpprettetFaktumVerdi {
	type: FaktumActionTypeKeys.OPPRETTET_FAKTUM;
	faktum: Faktum;
}

interface SetFaktaAction {
	type: FaktaActionTypeKeys.SET_FAKTA;
	fakta: Faktum[];
}

interface SetFaktaPendingAction {
	type: FaktaActionTypeKeys.PENDING;
}

interface SetFaktaOkAction {
	type: FaktaActionTypeKeys.OK;
}

interface SetFaktaFailedAction {
	type: FaktaActionTypeKeys.SET_SERVER_FEIL;
}

interface SetFaktumFailedAction {
	type: FaktumActionTypeKeys.FEILET;
	feilmelding: string;
}

const FaktumReducer: Reducer<FaktumState, FaktumActionTypes> = (
	state = initialState,
	action
): FaktumState => {
	switch (action.type) {
		case FaktumActionTypeKeys.OPPDATER_FAKTUM:
			return { ...state, restStatus: REST_STATUS.OK };
		case FaktumActionTypeKeys.OPPDATERT_FAKTUM:
			return {
				...state,
				data: updateFaktumVerdi(state.data, action.faktum)
			};
		case FaktumActionTypeKeys.OPPRETT_FAKTUM: {
			return {...state, restStatus: REST_STATUS.PENDING};
		}
		case FaktumActionTypeKeys.OPPRETTET_FAKTUM: {
			return {...state, restStatus: REST_STATUS.OK, data: [...state.data, action.faktum]};
		}
		case FaktaActionTypeKeys.SET_FAKTA:
			return {
				...state,
				data: action.fakta,
				restStatus: REST_STATUS.OK
			};
		case FaktaActionTypeKeys.PENDING:
			return { ...state, 	restStatus: REST_STATUS.PENDING	};
		case FaktaActionTypeKeys.OK:
			return { ...state, restStatus: REST_STATUS.OK };
		case FaktaActionTypeKeys.SET_SERVER_FEIL:
			return { ...state, restStatus: REST_STATUS.FEILET };
		default:
			return state;
	}
};

function updateFaktumVerdi(fakta: Faktum[], faktum: Faktum) {
	const index: number = fakta.findIndex(item => {
		return item.faktumId === faktum.faktumId;
	});
	if (index === -1) {
		console.error("Manglende faktum " + JSON.stringify(faktum, null, 4));
		return [...fakta];
	} else {
		return [...fakta.slice(0, index), faktum, ...fakta.slice(index + 1)];
	}
}

export default FaktumReducer;
