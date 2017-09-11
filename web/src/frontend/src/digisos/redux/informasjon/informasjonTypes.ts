export enum ActionTypeKeys {
	OK = "tekster/OK",
	FEILET = "tekster/FEILET",
	PENDING = "tekster/PENDING",
	INIT = "tekster/INIT",
	OTHER_ACTION = "__any_other_action_type__"
}

export type ActionTypes = HentetTeksterAction | HentTeksterAction | TeksterFeiletAction | OtherAction;

interface HentetTeksterAction {
	type: ActionTypeKeys.OK;
	data: object;
}

interface HentTeksterAction {
	type: ActionTypeKeys.PENDING;
	data: object;
}

interface TeksterFeiletAction {
	type: ActionTypeKeys.FEILET;
	data: object;
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
