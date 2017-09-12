import { FaktumValideringsregler, Valideringsfeil } from "../validering/types";

export type Dispatch = (action: any) => void;

export type Reducer<S, AT> = (state: S, action: AT) => S;

export interface DispatchProps {
	dispatch: Dispatch;
}

export enum FaktumActionTypeKeys {
	OK = "faktum/OK",
	FEILET = "faktum/FEILET",
	PENDING = "faktum/PENDING",
	SET_FAKTUM = "faktum/SET_FAKTUM",
	OTHER_ACTION = "__any_other_action_type__",
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

export enum ValideringActionTypeKeys {
	SET_FAKTA_VALIDERINGSFEIL = "validering/SET_FAKTA_VALIDERINGSFEIL",
	CLEAR_FAKTA_VALIDERINGSFEIL = "validering/CLEAR_FAKTA_VALIDERINGSFEIL",
	SET_FAKTUM_VALIDERINGSFEIL = "validering/SET_FAKTUM_VALIDERINGSFEIL",
	CLEAR_FAKTUM_VALIDERINGSFEIL = "validering/CLEAR_FAKTUM_VALIDERINGSFEIL",
	REGISTER_FAKTUM_VALIDERING = "validering/REGISTER_FAKTUM_VALIDERING",
	UNREGISTER_FAKTUM_VALIDERING = "validering/UNREGISTER_FAKTUM_VALIDERING"
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

export interface Fakta {
	faktum: Faktum[];
}

export interface SetFaktumVerdiAction {
	type: FaktumActionTypeKeys.SET_FAKTUM;
	faktumKey: string;
	value: FaktumValueType;
	properties?: any;
}

export interface SetFaktaAction {
	type: FaktaActionTypeKeys.SET_FAKTA;
	fakta: any;
}

export interface SoknadOpprettetAction {
	type: FaktaActionTypeKeys.SOKNAD_OPPRETTET;
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
	valideringsfeil: Valideringsfeil[];
}

export interface OtherAction {
	type: FaktaActionTypeKeys.OTHER_ACTION;
}
