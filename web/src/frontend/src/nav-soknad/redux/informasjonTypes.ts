export enum ActionTypeKeys {
	OK = "tekster/OK",
	FEILET = "tekster/FEILET",
	PENDING = "tekster/PENDING",
	INIT = "tekster/INIT",
	OTHER_ACTION = "__any_other_action_type__"
}

export type InformasjonActionTypes = HentetTeksterAction | HentTeksterAction | TeksterFeiletAction | OtherAction;

interface HentetTeksterAction {
	type: ActionTypeKeys.OK;
	data: object;
}

interface HentTeksterAction {
	type: ActionTypeKeys.PENDING;
}

interface TeksterFeiletAction {
	type: ActionTypeKeys.FEILET;
	feilmelding: string;
}

export interface OtherAction {
	type: ActionTypeKeys.OTHER_ACTION;
}

export interface LedetekstApiType {
	data: {};
	status: ActionTypeKeys;
}

export interface LedetekstState {
	ledetekster: LedetekstApiType;
}
