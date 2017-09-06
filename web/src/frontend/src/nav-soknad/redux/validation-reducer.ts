export type FaktumMap = Map<string, any>;
import { Reducer } from "./types";
import { ActionTypeKeys } from "./types";
import { ActionTypes } from "./actions";
import { Feil } from "nav-frontend-skjema";

interface Valideringsfeil {
	faktumKey: string;
	element: HTMLElement;
	feil: Feil;
}

export interface ValidationState {
	feil: Valideringsfeil[];
}

const defaultState = {
	feil: [] as Valideringsfeil[]
};

const updateFaktumValidering = (
	feil: Valideringsfeil[],
	valideringsfeil: Valideringsfeil
): Valideringsfeil[] => {
	const idx = feil.findIndex(f => f.faktumKey === valideringsfeil.faktumKey);
	if (!idx) {
		return [...feil, valideringsfeil];
	}
	return [...feil.slice(0, idx), valideringsfeil, ...feil.slice(idx + 1)];
};

const validationReducer: Reducer<ValidationState, ActionTypes> = (
	state = defaultState,
	action
): ValidationState => {
	switch (action.type) {
		case ActionTypeKeys.SET_FAKTUM_VALIDATION:
			return {
				...state,
				feil: updateFaktumValidering(state.feil, action)
			};
		default:
			return state;
	}
};

export default validationReducer;
