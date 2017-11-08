export enum LedeteksterActionTypeKeys {
	OK = "tekster/OK",
	FEILET = "tekster/FEILET",
	PENDING = "tekster/PENDING",
	INIT = "tekster/INIT",
	OTHER_ACTION = "__any_other_action_type__"
}

export type InformasjonActionTypes =
	| HentTeksterAction
	| HentetTeksterAction
	| HenterTeksterAction
	| HentTeksterFeiletAction
	| OtherAction;

interface HentTeksterAction {
	type: LedeteksterActionTypeKeys.INIT;
}

interface HentetTeksterAction {
	type: LedeteksterActionTypeKeys.OK;
	data: object;
}

interface HenterTeksterAction {
	type: LedeteksterActionTypeKeys.PENDING;
}

interface HentTeksterFeiletAction {
	type: LedeteksterActionTypeKeys.FEILET;
	feilmelding: string;
}

export interface OtherAction {
	type: LedeteksterActionTypeKeys.OTHER_ACTION;
}

export interface LedetekstState {
	data: {};
	status: LedeteksterActionTypeKeys;
}
