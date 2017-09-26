import { ValideringActionTypes } from "./valideringActions";
import { FaktumActionTypes } from "./faktaReducer";

export type Dispatch = (action: any) => Promise<any>;
export type SoknadDispatch<AT> = (action: AT) => void;

export type Reducer<S, AT> = (state: S, action: AT) => S;

export interface DispatchProps {
	dispatch: Dispatch;
}

export type FaktaActionTypes = FaktumActionTypes | ValideringActionTypes;

export enum FaktumActionTypeKeys {
	OPPDATER_FAKTUM = "faktum/OPPDATER_FAKTUM",
	OPPDATERT_FAKTUM = "faktum/OPPDATERT_FAKTUM",
	OPPRETT_FAKTUM = "faktum/OPPRETT_FAKTUM",
	OPPRETTET_FAKTUM = "faktum/OPPRETTET_FAKTUM",
	FEILET = "faktum/FEILET",
	OTHER_ACTION = "__any_other_action_type__",
	VALIDER_FAKTUM = "VALIDER_FAKTUM"
}

export enum FaktaActionTypeKeys {
	SET_FAKTA = "SET_FAKTA",
	OTHER_ACTION = "__any_other_action_type__"
}

export type FaktumValueType = string | null;

export interface Faktum {
	faktumId: number;
	soknadId: number;
	parrentFaktum: null | number;
	key: string;
	value: FaktumValueType;
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
