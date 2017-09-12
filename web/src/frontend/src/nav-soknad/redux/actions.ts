import {
	ActionTypeKeys,
	SetFaktumVerdiAction,
	SetFaktaAction,
	ResetFaktumVerdiAction,
	ValiderFaktumAction,
	SetFaktumValideringsfeilAction,
	ClearFaktumValideringsfeilAction,
	RegisterFaktumValideringAction,
	UnregisterFaktumValideringAction,
	FaktumValueType
} from "./types";

import { FaktumValideringsregler, Valideringsfeil } from "../validering/types";

export type ActionTypes =
	| SetFaktumVerdiAction
	| ResetFaktumVerdiAction
	| SetFaktaAction
	| SetFaktumValideringsfeilAction
	| ValiderFaktumAction
	| ClearFaktumValideringsfeilAction
	| RegisterFaktumValideringAction
	| UnregisterFaktumValideringAction;

export function setFaktumVerdi(
	faktumKey: string,
	value: FaktumValueType,
	properties?: any
) {
	return {
		type: ActionTypeKeys.SET_FAKTUM_VERDI,
		faktumKey,
		value,
		properties
	};
}

export function setFakta(fakta: any) {
	return {
		type: ActionTypeKeys.SET_FAKTA,
		fakta
	};
}

export function validerFaktum(faktumKey: string) {
	return {
		type: ActionTypeKeys.VALIDER_FAKTUM,
		faktumKey
	};
}

export function setFaktumValideringsfeil(valideringsfeil: Valideringsfeil[]) {
	return {
		type: ActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL,
		valideringsfeil
	};
}

export function clearFaktumValideringsfeil() {
	return {
		type: ActionTypeKeys.CLEAR_FAKTUM_VALIDERINGSFEIL
	};
}

export function registerFaktumValidering(
	faktumValidering: FaktumValideringsregler
) {
	return {
		type: ActionTypeKeys.REGISTER_FAKTUM_VALIDERING,
		faktumValidering
	};
}

export function unregisterFaktumValidering(faktumKey: string) {
	return {
		type: ActionTypeKeys.UNREGISTER_FAKTUM_VALIDERING,
		faktumKey
	};
}
