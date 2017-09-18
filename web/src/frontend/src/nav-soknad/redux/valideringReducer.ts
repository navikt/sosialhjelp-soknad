export type FaktumMap = Map<string, any>;
import { Reducer } from "./faktaTypes";
import { ValideringActionTypes } from "./valideringActions";
import { ValideringActionTypeKeys } from "./valideringTypes";
import { FaktumValideringsregler, Valideringsfeil } from "../validering/types";

export interface ValideringState {
	feil: Valideringsfeil[];
	visValideringsfeil?: boolean;
	valideringsregler?: FaktumValideringsregler[];
}

const defaultState: ValideringState = {
	feil: [] as Valideringsfeil[],
	visValideringsfeil: false,
	valideringsregler: []
};

const registerFaktumValidering = (
	valideringsregler: FaktumValideringsregler[],
	faktumValidering: FaktumValideringsregler
) => {
	const idx = valideringsregler.findIndex(
		f => f.faktumKey === faktumValidering.faktumKey
	);
	if (idx === -1) {
		return [...valideringsregler, faktumValidering];
	}
	return [
		...valideringsregler.slice(0, idx),
		faktumValidering,
		...valideringsregler.slice(idx + 1)
	];
};

const unregisterFaktumValidering = (
	valideringsregler: FaktumValideringsregler[],
	faktumKey: string
) => {
	const idx = valideringsregler.findIndex(f => f.faktumKey === faktumKey);
	if (idx === -1) {
		return valideringsregler;
	}
	return [
		...valideringsregler.slice(0, idx),
		...valideringsregler.slice(idx + 1)
	];
};

const valideringReducer: Reducer<ValideringState, ValideringActionTypes> = (
	state = defaultState,
	action
): ValideringState => {
	switch (action.type) {
		case ValideringActionTypeKeys.REGISTER_FAKTUM_VALIDERING:
			return {
				...state,
				valideringsregler: registerFaktumValidering(
					state.valideringsregler,
					action.faktumValidering
				)
			};
		case ValideringActionTypeKeys.UNREGISTER_FAKTUM_VALIDERING:
			return {
				...state,
				valideringsregler: unregisterFaktumValidering(
					state.valideringsregler,
					action.faktumKey
				)
			};
		case ValideringActionTypeKeys.SET_FAKTA_VALIDERINGSFEIL:
			return {
				...state,
				feil: action.valideringsfeil,
				visValideringsfeil: true
			};
		case ValideringActionTypeKeys.CLEAR_FAKTA_VALIDERINGSFEIL:
			return {
				...state,
				feil: []
			};
		case ValideringActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL:
			return {
				...state,
				feil: state.feil
					.filter(v => v.faktumKey !== action.faktumKey)
					.concat(action.valideringsfeil)
			};
		default:
			return state;
	}
};

export default valideringReducer;
