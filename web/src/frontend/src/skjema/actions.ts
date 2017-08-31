import {
	ActionTypeKeys,
	SetFaktumVerdiAction,
	SetFaktumAction,
	ResetFaktumVerdiAction,
	FaktumValueType
} from "./types";

export type ActionTypes = SetFaktumVerdiAction | ResetFaktumVerdiAction | SetFaktumAction;

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

export function setFaktum( faktum: any ) {
	return {
		type: ActionTypeKeys.SET_FAKTUM,
		faktum
	};
}
