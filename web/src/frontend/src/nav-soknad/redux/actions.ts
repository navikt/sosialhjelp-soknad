import {
	ActionTypeKeys,
	SetFaktumVerdiAction,
	SetFaktaAction,
	ResetFaktumVerdiAction,
	SetFaktumValideringFeilAction,
	SetFaktumValideringOkAction,
	RegisterFaktumValidering,
	UnregisterFaktumValidering,
	FaktumValidering,
	FaktumValueType
} from "./types";

import { Feil } from "nav-frontend-skjema";

export type ActionTypes =
	| SetFaktumVerdiAction
	| ResetFaktumVerdiAction
	| SetFaktaAction
	| SetFaktumValideringFeilAction
	| SetFaktumValideringOkAction
	| RegisterFaktumValidering
	| UnregisterFaktumValidering;

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

export function setFaktumValideringsFeil(
	faktumKey: string,
	element: HTMLElement,
	feil: Feil
) {
	return {
		type: ActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL,
		faktumKey,
		element,
		feil
	};
}
export function setFaktumValideringOk(faktumKey: string) {
	return {
		type: ActionTypeKeys.CLEAR_FAKTUM_VALIDERINGSFEIL,
		faktumKey
	};
}

export function registerFaktumValidering(faktumValidering: FaktumValidering) {
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
