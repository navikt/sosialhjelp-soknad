export type FaktumMap = Map<string, any>;
import { Reducer } from "./types";
import { ActionTypeKeys, Valideringsfeil } from "./types";
import { ActionTypes } from "./actions";

export interface ValideringState {
	feil: Valideringsfeil[];
}

const defaultState = {
	feil: [] as Valideringsfeil[]
};

const setFaktumValidering = (
	feil: Valideringsfeil[],
	valideringsfeil: Valideringsfeil
): Valideringsfeil[] => {
	const idx = feil.findIndex(f => f.faktumKey === valideringsfeil.faktumKey);
	if (idx === -1) {
		return [...feil, valideringsfeil];
	}
	return [...feil.slice(0, idx), valideringsfeil, ...feil.slice(idx + 1)];
};

const clearFaktumValidering = (
	feil: Valideringsfeil[],
	faktumKey: string
): Valideringsfeil[] => {
	const idx = feil.findIndex(f => f.faktumKey === faktumKey);
	if (idx === -1) {
		return feil;
	}
	return [...feil.slice(0, idx), ...feil.slice(idx + 1)];
};

const validationReducer: Reducer<ValideringState, ActionTypes> = (
	state = defaultState,
	action
): ValideringState => {
	switch (action.type) {
		case ActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL:
			return {
				...state,
				feil: setFaktumValidering(state.feil, action)
			};
		case ActionTypeKeys.CLEAR_FAKTUM_VALIDERINGSFEIL:
			return {
				...state,
				feil: clearFaktumValidering(state.feil, action.faktumKey)
			};
		default:
			return state;
	}
};

export default validationReducer;
