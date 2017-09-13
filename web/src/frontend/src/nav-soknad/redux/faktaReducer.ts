export type FaktumMap = Map<string, any>;
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

export type FaktumActionTypes =
	| SetFaktumVerdi
	| SetFaktaAction
	| SetFaktaPendingAction
	| SetFaktaOkAction
	| SetFaktaFailedAction;

interface SetFaktumVerdi {
	type: FaktumActionTypeKeys.SET_FAKTUM;
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

const FaktumReducer: Reducer<FaktumState, FaktumActionTypes> = (
	state = initialState,
	action
): FaktumState => {
	switch (action.type) {
		case FaktumActionTypeKeys.SET_FAKTUM:
			return {
				...state,
				data: updateFaktumVerdi(state.data, action.faktum)
			};
		case FaktaActionTypeKeys.SET_FAKTA:
			return {
				...state,
				data: action.fakta,
				restStatus: FaktaActionTypeKeys.OK
			};
		case FaktaActionTypeKeys.PENDING:
			return {
				...state,
				restStatus: FaktaActionTypeKeys.PENDING
			};
		case FaktaActionTypeKeys.OK:
			return {
				...state,
				restStatus: FaktaActionTypeKeys.OK
			};
		case FaktaActionTypeKeys.SET_SERVER_FEIL:
			return {
				...state,
				restStatus: FaktaActionTypeKeys.SET_SERVER_FEIL
			};
		default:
			return state;
	}
};

export default FaktumReducer;
