export type FaktumMap = Map<string, any>;
import { Reducer } from "../utils/types";
import Types from "./types";

export interface SkjemaState {
	faktum: FaktumMap;
}

const defaultFaktumMap: FaktumMap = new Map();
defaultFaktumMap.set("arbeid.dinsituasjon.jobb", true);

const defaultState: SkjemaState = {
	faktum: new Map(defaultFaktumMap)
};

const skjemaReducer: Reducer<any> = (
	state = defaultState,
	action
): SkjemaState => {
	switch (action.type) {
		case Types.SET_FAKTUM:
			return {
				...state,
				faktum: new Map(state.faktum).set(
					action.payload.faktumKey,
					action.payload.value
				)
			};
		default:
			return state;
	}
};

export default skjemaReducer;
