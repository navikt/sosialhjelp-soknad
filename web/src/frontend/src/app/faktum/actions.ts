import { ActionTypeKeys } from "./types";
import {
	SetFaktumVerdiAction,
	ResetFaktumVerdiAction,
	FaktumValueType
} from "./types";

export type ActionTypes = SetFaktumVerdiAction | ResetFaktumVerdiAction;

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
