export type FaktumMap = Map<string, any>;
import { Reducer } from "./types";
import { ActionTypeKeys } from "./types";
// import { ActionTypes } from "./actions";

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

function updateFaktumVerdi(fakta: Faktum[], key: string, value: any) {
	const index: number = fakta.findIndex(faktum => {
		return faktum.key === key;
	});
	if (index === -1) {
		return [ ...fakta, { key, value, type: "BRUKERREGISTRERT" } ];
	} else {
		return [
			...fakta.slice(0, index),
			{...fakta[ index ], value},
			...fakta.slice(index + 1)
		];
	}
}

// const faktumReducer: Reducer<FaktumState, ActionTypes> =
const faktumReducer: Reducer<FaktumState, any> =
	(state = initialState, action): FaktumState => {
	switch (action.type) {
		case ActionTypeKeys.SET_FAKTUM_VERDI:
			return {
				...state,
				fakta: updateFaktumVerdi(state.fakta, action.faktumKey, action.value)
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
