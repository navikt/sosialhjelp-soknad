export type FaktumMap = Map<string, any>;
import { ActionTypes } from "./actions";
import { Reducer, ActionTypeKeys } from "./types";
import { ValideringState } from "./validering-reducer";

export interface SoknadAppState {
	faktum: FaktumState;
	validering: ValideringState;
}

export interface FaktumState {
	data: Faktum[];
}

export interface Faktum {
	key: string;
	value: any;
	type: string;
}

export interface FaktumComponentProps {
	fakta: Faktum[];
}

const initialState: FaktumState = {
	data: [{ key: "arbeid.dinsituasjon.jobb", value: true, type: "" }]
};

function updateFaktumVerdi(fakta: Faktum[], key: string, value: any) {
	const index: number = fakta.findIndex(faktum => {
		return faktum.key === key;
	});
	if (index === -1) {
		return [...fakta, { key, value, type: "BRUKERREGISTRERT" }];
	} else {
		return [
			...fakta.slice(0, index),
			{ ...fakta[index], value },
			...fakta.slice(index + 1)
		];
	}
}

const FaktumReducer: Reducer<FaktumState, ActionTypes> = (
	state = initialState,
	action
): FaktumState => {
	switch (action.type) {
		case ActionTypeKeys.SET_FAKTUM_VERDI:
			return {
				...state,
				data: updateFaktumVerdi(state.data, action.faktumKey, action.value)
			};
		case ActionTypeKeys.RESET_FAKTUM_VERDI:
			return {
				...state,
				data: state.data.filter(faktum => faktum.key !== action.faktumKey)
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
