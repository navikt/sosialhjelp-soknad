import {
	ActionTypeKeys,
	SetFaktumVerdiAction,
	SetFaktaAction,
	ResetFaktumVerdiAction,
	SetFaktumValideringAction,
	FaktumValueType
} from "./types";

import { Feil } from "nav-frontend-skjema";

export type ActionTypes =
	| SetFaktumVerdiAction
	| ResetFaktumVerdiAction
	| SetFaktaAction
	| SetFaktumValideringAction;

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

export function setFaktumValidering(
	faktumKey: string,
	element: HTMLElement,
	feil: Feil
) {
	return {
		type: ActionTypeKeys.SET_FAKTUM_VALIDATION,
		faktumKey,
		element,
		feil
	};
}
