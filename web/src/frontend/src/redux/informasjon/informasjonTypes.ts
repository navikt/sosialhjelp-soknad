export enum ActionTypeKeys {
	OK = 'tekster/OK',
	FEILET = 'tekster/FEILET',
	PENDING = 'tekster/PENDING',
	INIT = 'tekster/INIT',
	OTHER_ACTION = '__any_other_action_type__'
}

export type ActionTypes = hentetTeksterAction | hentTeksterAction | teksterFeiletAction | OtherAction

interface hentetTeksterAction {
	type: ActionTypeKeys.OK;
	data: object
}

interface hentTeksterAction {
	type: ActionTypeKeys.PENDING;
	data: object
}

interface teksterFeiletAction {
	type: ActionTypeKeys.FEILET;
	data: object
}

export interface OtherAction {
	type: ActionTypeKeys.OTHER_ACTION;
}

export interface LedetekstApiType {
	data: {},
	status: ActionTypeKeys
}

export interface LedetekstState {
	ledetekster: LedetekstApiType
}

