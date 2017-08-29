export type FaktumMap = Map<string, any>;
import { Reducer } from "./types";
import { ActionTypeKeys } from "./types";
import { ActionTypes } from "./actions";

export interface FaktumStoreState {
	faktumStore: FaktumState;
}

export interface FaktumState {
	fakta: FaktumMap;
	faktumTekst?: any;
}

export interface FaktumComponentProps {
	fakta: FaktumMap;
}

const defaultFaktumMap: FaktumMap = new Map();
defaultFaktumMap.set("arbeid.dinsituasjon.jobb", true);

const defaultState: FaktumState = {
	fakta: new Map(defaultFaktumMap)
};

export const deleteFaktumFromMap = (faktumMap: FaktumMap, key: string) => {
	const copyMap = new Map(faktumMap);
	copyMap.delete(key);
	return copyMap;
};

const faktumReducer: Reducer<FaktumState, ActionTypes> = (
	state = defaultState,
	action
): FaktumState => {
	switch (action.type) {
		case ActionTypeKeys.SET_FAKTUM_VERDI:
			return {
				...state,
				fakta: new Map(state.fakta).set(action.faktumKey, action.value)
			};
		case ActionTypeKeys.RESET_FAKTUM_VERDI:
			return {
				...state,
				fakta: deleteFaktumFromMap(state.fakta, action.faktumKey)
			};
		default:
			return state;
	}
};

export default faktumReducer;
