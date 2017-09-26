import { Reducer } from "./reduxTypes";
import {
	ValideringActionTypes,
	ValideringActionTypeKeys
} from "./valideringActionTypes";
import { FaktumActionTypeKeys } from "./faktaActionTypes";
import { FaktumActionTypes } from "./faktaReducer";
import { FaktumValideringsregler, Valideringsfeil } from "../validering/types";

export interface ValideringState {
	/** Alle valideringsfeil som finnes for registrerte regler */
	feil: Valideringsfeil[];
	/** Alle registrerte valideringsregler */
	valideringsregler?: FaktumValideringsregler[];
	/** Om feiloppsummering skal vises */
	visValideringsfeil?: boolean;
	/** Økes hver gang hele steget valideres - brukes til å fokusere på oppsummering */
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
	faktumValideringfeil: Valideringsfeil
) => {
	if (!faktumValideringfeil) {
		return feil.filter(v => v.faktumKey !== faktumKey);
	}
	const idx = feil.findIndex(v => v.faktumKey === faktumKey);
	if (idx === -1) {
		return feil.concat(faktumValideringfeil);
	}
	// For å ivareta samme rekkefølge på feilmeldingene i oppsummeringen
	return [...feil.slice(0, idx), faktumValideringfeil, ...feil.slice(idx + 1)];
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
