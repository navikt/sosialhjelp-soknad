import { Faktum } from "../soknadTypes";

export type FaktumMap = Map<string, any>;
import { ActionTypeKeys, Reducer } from "./faktaTypes";
import { ValideringState } from "./validering-reducer";

export interface SoknadAppState {
	faktum: FaktumState;
	validering: ValideringState;
}

export interface FaktumState {
	data: Faktum[];
}

export interface FaktumComponentProps {
	fakta: Faktum[];
}

const initialState: FaktumState = {
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
		return [
			...fakta.slice(0, index),
			faktum,
			...fakta.slice(index + 1)
		];
	}
}

export type FaktumActionTypes = SetFaktumVerdi | SetFaktaAction;

interface SetFaktumVerdi {
	type: ActionTypeKeys.SET_FAKTUM_VERDI;
	faktum: Faktum;
}

interface SetFaktaAction {
	type: ActionTypeKeys.SET_FAKTA;
	fakta: Faktum[];
}

const FaktumReducer: Reducer<FaktumState, FaktumActionTypes> = (
	state = initialState,
	action
): FaktumState => {
	switch (action.type) {
		case ActionTypeKeys.SET_FAKTUM_VERDI:
			return {
				...state,
				data: updateFaktumVerdi(state.data, action.faktum)
			};
		case ActionTypeKeys.SET_FAKTA:
			return {
				...state,
				data: action.fakta
			};
		default:
			return state;
	}
};

export default FaktumReducer;
