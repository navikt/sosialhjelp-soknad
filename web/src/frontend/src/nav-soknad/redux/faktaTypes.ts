import { FaktumValideringsregler, Valideringsfeil } from "../validering/types";
import { FaktumActionTypes } from "./faktaReducer";

export type Dispatch = (action: any) => void;
export type SoknadDispatch<AT> = (action: AT) => void;

export type Reducer<S, AT> = (state: S, action: AT) => S;

export interface DispatchProps {
	dispatch: Dispatch;
}

export type FaktaActionTypes =
	FaktumActionTypes
	| SetFaktumValideringFeilAction
	| SetFaktumValideringOkAction
	| RegisterFaktumValidering
	| UnregisterFaktumValidering;

export enum FaktumActionTypeKeys {
	OPPDATER_FAKTUM = "faktum/OPPDATER_FAKTUM",
	OPPDATERT_FAKTUM = "faktum/OPPDATERT_FAKTUM",
	FEILET = "faktum/FEILET",
	SET_FAKTUM = "faktum/SET_FAKTUM",
	OTHER_ACTION = "__any_other_action_type__",
	SET_FAKTUM_VALIDERINGSFEIL = "SET_FAKTUM_VALIDATION_FEIL",
	CLEAR_FAKTUM_VALIDERINGSFEIL = "SET_FAKTUM_VALIDATION_OK",
	REGISTER_FAKTUM_VALIDERING = "REGISTER_FAKTUM_VALIDERING",
	UNREGISTER_FAKTUM_VALIDERING = "UNREGISTER_FAKTUM_VALIDERING",
	VALIDER_FAKTUM = "VALIDER_FAKTUM"
}

export enum FaktaActionTypeKeys {
	PENDING = "fakta/PENDING",
	OK = "fakta/OK",
	SET_FAKTA = "SET_FAKTA",
	SOKNAD_OPPRETTET = "SOKNAD_OPPRETTET",
	SET_SERVER_FEIL = "fakta/SERVER_FEIL",
	OTHER_ACTION = "__any_other_action_type__"
}

export type FaktumValueType = string | number | boolean;

export interface Faktum {
	faktumId: number;
	soknadId: number;
	parrentFaktum: null | number;
	key: string;
	value: null | boolean | string | number;
	faktumEgenskaper?: FaktumEgenskap[];
	properties: object;
	type?: string;
}

export interface FaktumEgenskap {
	faktumId: number;
	soknadId: number;
	key: string;
	value: string;
	systemEgenskap: number;
}

export interface SetFaktumValideringFeilAction {
	type: FaktumActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL;
	faktumKey: string;
	element: HTMLElement;
	valideringsfeil: Valideringsfeil[];
}

export interface SetFaktumValideringOkAction {
	type: FaktumActionTypeKeys.CLEAR_FAKTUM_VALIDERINGSFEIL;
	faktumKey: string;
}

export interface RegisterFaktumValidering {
	type: FaktumActionTypeKeys.REGISTER_FAKTUM_VALIDERING;
	faktumValidering: FaktumValideringsregler;
}

export interface UnregisterFaktumValidering {
	type: FaktumActionTypeKeys.UNREGISTER_FAKTUM_VALIDERING;
	faktumKey: string;
}

export interface OtherAction {
	type: FaktaActionTypeKeys.OTHER_ACTION;
}
