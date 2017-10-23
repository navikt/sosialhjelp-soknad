export enum ActionTypeKeys {
	OK = "tekster/OK",
	FEILET = "tekster/FEILET",
	PENDING = "tekster/PENDING",
	INIT = "tekster/INIT",
	OTHER_ACTION = "__any_other_action_type__"
}

export type InformasjonActionTypes = (
	HentTeksterAction |
	HentetTeksterAction |
	HenterTeksterAction |
	HentTeksterFeiletAction |
	OtherAction
);

interface HentTeksterAction {
	type: ActionTypeKeys.INIT;
}

interface HentetTeksterAction {
	type: ActionTypeKeys.OK;
	data: object;
}

interface HenterTeksterAction {
	type: ActionTypeKeys.PENDING;
}

interface HentTeksterFeiletAction {
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
