import {
	ValideringActionTypeKeys,
	SetFaktaValideringsfeilAction,
	ClearFaktaValideringsfeilAction,
	RegisterFaktumValideringAction,
	UnregisterFaktumValideringAction,
	SetFaktumValideringsfeilAction
} from "./valideringTypes";
import { FaktumValideringsregler, Valideringsfeil } from "../validering/types";

export type ValideringActionTypes =
	| SetFaktaValideringsfeilAction
	| ClearFaktaValideringsfeilAction
	| RegisterFaktumValideringAction
	| UnregisterFaktumValideringAction
	| SetFaktumValideringsfeilAction;

export function setFaktaValideringsfeil(valideringsfeil: Valideringsfeil[]) {
	return {
		type: ValideringActionTypeKeys.SET_FAKTA_VALIDERINGSFEIL,
		valideringsfeil
	};
}

export function clearFaktaValideringsfeil() {
	return {
		type: ValideringActionTypeKeys.CLEAR_FAKTA_VALIDERINGSFEIL
	};
}

export function registerFaktumValidering(
	faktumValidering: FaktumValideringsregler
) {
	return {
		type: ValideringActionTypeKeys.REGISTER_FAKTUM_VALIDERING,
		faktumValidering
	};
}

export function unregisterFaktumValidering(faktumKey: string) {
	return {
		type: ValideringActionTypeKeys.UNREGISTER_FAKTUM_VALIDERING,
		faktumKey
	};
}

export function setFaktumValideringsfeil(
	faktumKey: string,
	valideringsfeil: Valideringsfeil[] = []
) {
	return {
		type: ValideringActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL,
		faktumKey,
		valideringsfeil
	};
}
