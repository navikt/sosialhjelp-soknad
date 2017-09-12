export type FaktumMap = Map<string, any>;
import { FaktumActionTypeKeys, FaktumValidering, Reducer, Valideringsfeil } from "./faktaTypes";
import { ActionTypes } from "./faktaActions";

export interface ValideringState {
	feil: Valideringsfeil[];
	visValideringsfeil?: boolean;
	items?: FaktumValidering[];
}

const defaultState: ValideringState = {
	feil: [] as Valideringsfeil[],
	visValideringsfeil: false,
	items: []
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

const registerFaktumValidering = (
	items: FaktumValidering[],
	faktumValidering: FaktumValidering
) => {
	const idx = items.findIndex(f => f.faktumKey === faktumValidering.faktumKey);
	if (idx === -1) {
		return [...items, faktumValidering];
	}
	return [...items.slice(0, idx), faktumValidering, ...items.slice(idx + 1)];
};

const unregisterFaktumValidering = (
	items: FaktumValidering[],
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
		case FaktumActionTypeKeys.REGISTER_FAKTUM_VALIDERING:
			return {
				...state,
				items: registerFaktumValidering(state.items, action.faktumValidering)
			};
		case FaktumActionTypeKeys.UNREGISTER_FAKTUM_VALIDERING:
			return {
				...state,
				items: unregisterFaktumValidering(state.items, action.faktumKey)
			};
		case FaktumActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL:
			return {
				...state,
				feil: setFaktumValidering(state.feil, action)
			};
		case FaktumActionTypeKeys.CLEAR_FAKTUM_VALIDERINGSFEIL:
			return {
				...state,
				feil: clearFaktumValidering(state.feil, action.faktumKey)
			};
		default:
			return state;
	}
};

export default valideringReducer;
