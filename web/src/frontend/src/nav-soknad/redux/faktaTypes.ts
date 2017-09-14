import { ValideringActionTypes } from "./valideringActions";
import { FaktumActionTypes } from "./faktaReducer";

export type Dispatch = (action: any) => void;
export type SoknadDispatch<AT> = (action: AT) => void;

export type Reducer<S, AT> = (state: S, action: AT) => S;

export interface DispatchProps {
	dispatch: Dispatch;
}

export type FaktaActionTypes = FaktumActionTypes | ValideringActionTypes;

export enum FaktumActionTypeKeys {
	OPPDATER_FAKTUM = "faktum/OPPDATER_FAKTUM",
	OPPDATERT_FAKTUM = "faktum/OPPDATERT_FAKTUM",
	FEILET = "faktum/FEILET",
	OTHER_ACTION = "__any_other_action_type__",
	VALIDER_FAKTUM = "VALIDER_FAKTUM"
}

export enum FaktaActionTypeKeys {
	PENDING = "fakta/PENDING",
	OK = "fakta/OK",
	SET_FAKTA = "SET_FAKTA",
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
