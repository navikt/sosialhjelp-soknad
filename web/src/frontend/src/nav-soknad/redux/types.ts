import { FaktumValideringsregler, Valideringsfeil } from "../validering/types";

export type Dispatch = (action: any) => void;

export type Reducer<S, AT> = (state: S, action: AT) => S;

export interface DispatchProps {
	dispatch: Dispatch;
}

export enum ActionTypeKeys {
	SET_FAKTUM_VERDI = "SET_FAKTUM_VERDI",
	SET_FAKTA = "SET_FAKTA",
	SOKNAD_OPPRETTET = "SOKNAD_OPPRETTET",
	RESET_FAKTUM_VERDI = "RESET_FAKTUM_VERDI",
	SET_FAKTUM_VALIDERINGSFEIL = "SET_FAKTUM_VALIDATION_FEIL",
	CLEAR_FAKTUM_VALIDERINGSFEIL = "SET_FAKTUM_VALIDATION_OK",
	REGISTER_FAKTUM_VALIDERING = "REGISTER_FAKTUM_VALIDERING",
	UNREGISTER_FAKTUM_VALIDERING = "UNREGISTER_FAKTUM_VALIDERING",
	VALIDER_FAKTUM = "VALIDER_FAKTUM",
	OTHER_ACTION = "__any_other_action_type__"
}

export type FaktumValueType = string | number | boolean;

export interface Faktum {
	key: string;
	value: string;
}

export interface Fakta {
	faktum: Faktum[];
}

export interface SetFaktumVerdiAction {
	type: ActionTypeKeys.SET_FAKTUM_VERDI;
	faktumKey: string;
	value: FaktumValueType;
	properties?: any;
}

export interface SetFaktaAction {
	type: ActionTypeKeys.SET_FAKTA;
	fakta: any;
}

export interface SoknadOpprettetAction {
	type: ActionTypeKeys.SOKNAD_OPPRETTET;
}

export interface ResetFaktumVerdiAction {
	type: ActionTypeKeys.RESET_FAKTUM_VERDI;
	faktumKey: string;
}

export interface SetFaktumValideringsfeilAction {
	type: ActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL;
	valideringsfeil: Valideringsfeil[];
}

export interface ClearFaktumValideringsfeilAction {
	type: ActionTypeKeys.CLEAR_FAKTUM_VALIDERINGSFEIL;
}

export interface RegisterFaktumValideringAction {
	type: ActionTypeKeys.REGISTER_FAKTUM_VALIDERING;
	faktumValidering: FaktumValideringsregler;
}

export interface UnregisterFaktumValideringAction {
	type: ActionTypeKeys.UNREGISTER_FAKTUM_VALIDERING;
	faktumKey: string;
}

export interface ValiderFaktumAction {
	type: ActionTypeKeys.VALIDER_FAKTUM;
	faktumKey: string;
}

export interface OtherAction {
	type: ActionTypeKeys.OTHER_ACTION;
}
