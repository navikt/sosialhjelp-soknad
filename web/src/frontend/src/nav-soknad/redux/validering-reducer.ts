export type FaktumMap = Map<string, any>;
import { Reducer } from "./types";
import { ActionTypeKeys } from "./types";
import { FaktumValideringRules, Valideringsfeil } from "../validering/types";
import { ActionTypes } from "./actions";

export interface ValideringState {
	feil: Valideringsfeil[];
	visValideringsfeil?: boolean;
	items?: FaktumValideringRules[];
}

const defaultState: ValideringState = {
	feil: [] as Valideringsfeil[],
	visValideringsfeil: false,
	items: []
};

const registerFaktumValidering = (
	items: FaktumValideringRules[],
	faktumValidering: FaktumValideringRules
) => {
	const idx = items.findIndex(f => f.faktumKey === faktumValidering.faktumKey);
	if (idx === -1) {
		return [...items, faktumValidering];
	}
	return [...items.slice(0, idx), faktumValidering, ...items.slice(idx + 1)];
};

const unregisterFaktumValidering = (
	items: FaktumValideringRules[],
	faktumKey: string
) => {
	const idx = items.findIndex(f => f.faktumKey === faktumKey);
	if (idx === -1) {
		return items;
	}
	return [...items.slice(0, idx), ...items.slice(idx + 1)];
};

const valideringReducer: Reducer<ValideringState, ActionTypes> = (
	state = defaultState,
	action
): ValideringState => {
	switch (action.type) {
		case ActionTypeKeys.REGISTER_FAKTUM_VALIDERING:
			return {
				...state,
				items: registerFaktumValidering(state.items, action.faktumValidering)
			};
		case ActionTypeKeys.UNREGISTER_FAKTUM_VALIDERING:
			return {
				...state,
				items: unregisterFaktumValidering(state.items, action.faktumKey)
			};
		case ActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL:
			return {
				...state,
				feil: action.valideringsfeil
			};
		case ActionTypeKeys.CLEAR_FAKTUM_VALIDERINGSFEIL:
			return {
				...state,
				feil: []
			};
		default:
			return state;
	}
};

export default valideringReducer;
