export type FaktumMap = Map<string, any>;
import { Reducer } from "./faktaTypes";
import { ValideringActionTypes } from "./valideringActions";
import { ValideringActionTypeKeys } from "./valideringTypes";
import { FaktumActionTypes } from "./faktaReducer";
import { FaktumActionTypeKeys } from "./faktaTypes";
import { FaktumValideringsregler, Valideringsfeil } from "../validering/types";

export interface ValideringState {
	feil: Valideringsfeil[];
	valideringsregler?: FaktumValideringsregler[];
	visValideringsfeil?: boolean;
	stegValidertCounter?: number;
}

const defaultState: ValideringState = {
	feil: [] as Valideringsfeil[],
	valideringsregler: [],
	visValideringsfeil: false,
	stegValidertCounter: 0
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

const setFaktumValideringsfeil = (
	feil: Valideringsfeil[],
	faktumKey: string,
	faktumValideringfeil: Valideringsfeil[]
) => {
	if (faktumValideringfeil.length === 0) {
		return feil.filter(v => v.faktumKey !== faktumKey);
	}
	const idx = feil.findIndex(v => v.faktumKey === faktumKey);
	if (idx === -1) {
		return feil.concat(faktumValideringfeil);
	}
	// For å ivareta samme rekkefølge på feilmeldingene i oppsummeringen
	return [
		...feil.slice(0, idx),
		faktumValideringfeil[0],
		...feil.slice(idx + 1)
	];
};

const valideringReducer: Reducer<
	ValideringState,
	ValideringActionTypes | FaktumActionTypes
> = (state = defaultState, action): ValideringState => {
	switch (action.type) {
		case FaktumActionTypeKeys.OPPDATER_FAKTUM:
			return {
				...state
			};
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
				visValideringsfeil: true,
				stegValidertCounter: state.stegValidertCounter + 1
			};
		case ValideringActionTypeKeys.CLEAR_FAKTA_VALIDERINGSFEIL:
			return {
				...state,
				feil: []
			};
		case ValideringActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL:
			return {
				...state,
				feil: setFaktumValideringsfeil(
					state.feil,
					action.faktumKey,
					action.valideringsfeil
				)
			};
		default:
			return state;
	}
};

export default valideringReducer;
