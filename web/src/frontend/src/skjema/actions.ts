import {
	ActionTypeKeys,
	SetFaktumVerdiAction,
	SetFaktaAction,
	ResetFaktumVerdiAction,
	FaktumValueType
} from "./types";

export type ActionTypes = SetFaktumVerdiAction | ResetFaktumVerdiAction | SetFaktaAction;

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

export function setFakta(fakta: any ) {
	return {
		type: ActionTypeKeys.SET_FAKTA,
		fakta
	};
}
