import { ValideringActionTypeKeys } from "./valideringActionTypes";
import { FaktumValideringsregler, Valideringsfeil } from "../validering/types";

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

export function unregisterFaktumValidering(
	faktumKey: string,
	property: string,
	faktumId: number
) {
	return {
		type: ValideringActionTypeKeys.UNREGISTER_FAKTUM_VALIDERING,
		faktumKey,
		property,
		faktumId
	};
}

export function setFaktumValideringsfeil(
	valideringsfeil: Valideringsfeil,
	faktumKey: string,
	property?: string,
	faktumId?: number
) {
	return {
		type: ValideringActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL,
		faktumKey,
		property,
		faktumId,
		valideringsfeil
	};
}
