export type FaktumMap = Map<string, any>;
import { Reducer } from "./types";
import { ActionTypeKeys } from "./types";
import { ActionTypes } from "./actions";

export interface FaktumStoreState {
	faktumStore: FaktumState;
}

export interface FaktumState {
	fakta: Faktum[];
	faktumTekst?: any;
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
	fakta: [ { key: "arbeid.dinsituasjon.jobb", value: true, type: "" } ]
};

const faktumReducer: Reducer<FaktumState, ActionTypes> =
	(state = initialState, action): FaktumState => {
	switch (action.type) {
		case ActionTypeKeys.SET_FAKTUM_VERDI:
			const updatedFakta = state.fakta.map(faktum => {
					if (faktum.key === action.faktumKey) {
						return { ...faktum, value: action.value };
					}
					return faktum;
				}
			);
			return {
				...state,
				fakta: updatedFakta
			};
		case ActionTypeKeys.RESET_FAKTUM_VERDI:
			return {
				...state,
				fakta: state.fakta.filter(faktum => (faktum.key !== action.faktumKey))
			};
		case ActionTypeKeys.SET_FAKTA:
			return {
				...state,
				fakta: action.fakta
			};
		default:
			return state;
	}
};

export default faktumReducer;
