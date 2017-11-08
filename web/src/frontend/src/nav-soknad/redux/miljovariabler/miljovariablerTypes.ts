export enum MiljovariablerActionTypeKeys {
	OK = "miljovariabler/OK",
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
	type: MiljovariablerActionTypeKeys.OK;
	data: object;
}

interface MiljovariablerInitAction {
	type: MiljovariablerActionTypeKeys.INIT;
}

interface HentMiljovariablerAction {
	type: MiljovariablerActionTypeKeys.PENDING;
}

interface MiljovariablerFeiletAction {
	type: MiljovariablerActionTypeKeys.FEILET;
	feilmelding: string;
}

export interface OtherAction {
	type: MiljovariablerActionTypeKeys.OTHER_ACTION;
}

export interface MiljovariablerApiType {
	data: {};
	status: MiljovariablerActionTypeKeys;
}
