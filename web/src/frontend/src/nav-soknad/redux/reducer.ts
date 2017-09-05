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

export const setFaktumValue = (faktumMap: FaktumMap, key: string, value: any) => {
	const fakta = Object.assign({}, faktumMap.get(key));
	fakta.value = value;
	return new Map(faktumMap).set(key, fakta);
};

const faktumReducer: Reducer<FaktumState, ActionTypes> = (
	state = defaultState,
	action
): FaktumState => {
	switch (action.type) {
		case ActionTypeKeys.SET_FAKTUM_VERDI:
			return {
				...state,
				fakta: setFaktumValue(state.fakta, action.faktumKey, action.value)
			};
		case ActionTypeKeys.RESET_FAKTUM_VERDI:
			return {
				...state,
				fakta: deleteFaktumFromMap(state.fakta, action.faktumKey)
			};
		case ActionTypeKeys.SET_FAKTA:
			return {
				...state,
				fakta: new Map(action.fakta.map((faktum: any) =>
					([faktum.key, faktum])
				))
			};
		default:
			return state;
	}
};

export default faktumReducer;
