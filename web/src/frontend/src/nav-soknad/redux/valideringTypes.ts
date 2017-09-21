import { FaktumValideringsregler, Valideringsfeil } from "../validering/types";

export enum ValideringActionTypeKeys {
	SET_FAKTA_VALIDERINGSFEIL = "validering/SET_FAKTA_VALIDERINGSFEIL",
	CLEAR_FAKTA_VALIDERINGSFEIL = "validering/CLEAR_FAKTA_VALIDERINGSFEIL",
	SET_FAKTUM_VALIDERINGSFEIL = "validering/SET_FAKTUM_VALIDERINGSFEIL",
	CLEAR_FAKTUM_VALIDERINGSFEIL = "validering/CLEAR_FAKTUM_VALIDERINGSFEIL",
	REGISTER_FAKTUM_VALIDERING = "validering/REGISTER_FAKTUM_VALIDERING",
	UNREGISTER_FAKTUM_VALIDERING = "validering/UNREGISTER_FAKTUM_VALIDERING",
	SET_PROGRESJON = "validering/PROGRESJON"
}

export interface SetFaktaValideringsfeilAction {
	type: ValideringActionTypeKeys.SET_FAKTA_VALIDERINGSFEIL;
	valideringsfeil: Valideringsfeil[];
}

export interface ClearFaktaValideringsfeilAction {
	type: ValideringActionTypeKeys.CLEAR_FAKTA_VALIDERINGSFEIL;
	faktumKey: string;
}
export interface RegisterFaktumValideringAction {
	type: ValideringActionTypeKeys.REGISTER_FAKTUM_VALIDERING;
	faktumValidering: FaktumValideringsregler;
}

export interface UnregisterFaktumValideringAction {
	type: ValideringActionTypeKeys.UNREGISTER_FAKTUM_VALIDERING;
	faktumKey: string;
}

export interface SetFaktumValideringsfeilAction {
	type: ValideringActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL;
	faktumKey: string;
	valideringsfeil: Valideringsfeil;
}

export interface SetProgresjonAction {
	type: ValideringActionTypeKeys.SET_PROGRESJON;
	steg: number;
}
