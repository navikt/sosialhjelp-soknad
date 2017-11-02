export enum ActionTypeKeys {
	OK = "Miljovariabler/OK",
	FEILET = "miljovariabler/FEILET",
	PENDING = "miljovariabler/PENDING",
	INIT = "miljovariabler/INIT",
	OTHER_ACTION = "__any_other_action_type__"
}

export type MiljovariablerActionTypes =
	| HentetMiljovariablerAction
	| HentMiljovariablerAction
	| MiljovariablerFeiletAction
	| MiljovariablerInitAction
	| OtherAction;

interface HentetMiljovariablerAction {
	type: ActionTypeKeys.OK;
	data: object;
}

interface MiljovariablerInitAction {
	type: ActionTypeKeys.INIT;
}

interface HentMiljovariablerAction {
	type: ActionTypeKeys.PENDING;
}

interface MiljovariablerFeiletAction {
	type: ActionTypeKeys.FEILET;
	feilmelding: string;
}

export interface OtherAction {
	type: ActionTypeKeys.OTHER_ACTION;
}

export interface MiljovariablerApiType {
	data: {};
	status: ActionTypeKeys;
}
