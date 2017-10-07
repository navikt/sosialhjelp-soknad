import { Reducer } from "./reduxTypes";
import {
	ValideringActionTypes,
	ValideringActionTypeKeys
} from "./valideringActionTypes";
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
		f =>
			f.faktumKey === faktumValidering.faktumKey &&
			(faktumValidering.property
				? f.property === faktumValidering.property
				: true) &&
			(faktumValidering.faktumId
				? f.faktumId === faktumValidering.faktumId
				: true)
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
	faktumKey: string,
	property?: string,
	faktumId?: number
) => {
	const idx = valideringsregler.findIndex(
		f =>
			f.faktumKey === faktumKey &&
			(property ? f.property === property : true) &&
			(faktumId ? f.faktumId === faktumId : true)
	);
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
	faktumValideringfeil: Valideringsfeil,
	faktumKey: string,
	property?: string,
	faktumId?: number
) => {
	if (!faktumValideringfeil) {
		/** Returner alle andre feil */
		const filtrerte = feil.filter(v => {
			return (
				v.faktumKey !== faktumKey ||
				v.faktumId !== faktumId ||
				v.property !== property
			);
		});
		return filtrerte;
	}
	const idx = feil.findIndex(
		v =>
			v.faktumKey === faktumKey &&
			(property ? v.property === property : true) &&
			(faktumId ? v.faktumId === faktumId : true)
	);
	if (idx === -1) {
		return feil.concat(faktumValideringfeil);
	}
	// For å ivareta samme rekkefølge på feilmeldingene i oppsummeringen
	return [...feil.slice(0, idx), faktumValideringfeil, ...feil.slice(idx + 1)];
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
					action.faktumKey,
					action.property,
					action.faktumId
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
				feil: [],
				visValideringsfeil: false
			};
		case ValideringActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL:
			const feil = setFaktumValideringsfeil(
				state.feil,
				action.valideringsfeil,
				action.faktumKey,
				action.property,
				action.faktumId
			);
			const visValideringsfeil = state.visValideringsfeil
				? feil.length > 0
				: state.visValideringsfeil;
			return {
				...state,
				feil,
				visValideringsfeil
			};
		default:
			return state;
	}
};

export default valideringReducer;
