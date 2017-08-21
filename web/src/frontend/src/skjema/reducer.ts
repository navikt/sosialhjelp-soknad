export type FaktumMap = Map<string, any>;
import { Reducer } from "./types";
import { ActionTypeKeys } from "./types";
import { ActionTypes } from "./actions";

export interface FaktumState {
	faktum: FaktumMap;
	faktumTekst?: any;
}

const defaultFaktumMap: FaktumMap = new Map();
defaultFaktumMap.set("arbeid.dinsituasjon.jobb", true);

const defaultState: FaktumState = {
	faktum: new Map(defaultFaktumMap)
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
				faktum: new Map(state.faktum).set(action.faktumKey, action.value)
			};
		case ActionTypeKeys.RESET_FAKTUM_VERDI:
			return {
				...state,
				faktum: deleteFaktumFromMap(state.faktum, action.faktumKey)
			};
		default:
			return state;
	}
};

export default faktumReducer;
