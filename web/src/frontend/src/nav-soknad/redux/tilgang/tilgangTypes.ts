export enum ActionTypeKeys {
	OK = "tilgang/OK",
	FEILET = "tilgang/FEILET",
	PENDING = "tilgang/PENDING",
	INIT = "tilgang/INIT",
	OTHER_ACTION = "__any_other_action_type__"
}

export type TilgangActionTypes =
	| HentTilgangAction
	| HentetTilgangAction
	| HenterTilgangAction
	| HentTilgangFeiletAction
	| OtherAction;

interface HentTilgangAction {
	type: ActionTypeKeys.INIT;
}

interface HentetTilgangAction {
	type: ActionTypeKeys.OK;
	harTilgang: boolean;
}

interface HenterTilgangAction {
	type: ActionTypeKeys.PENDING;
}

interface HentTilgangFeiletAction {
	type: ActionTypeKeys.FEILET;
	feilmelding: string;
}

export interface OtherAction {
	type: ActionTypeKeys.OTHER_ACTION;
}

export interface TilgangApiType {
	harTilgang: boolean;
	status: ActionTypeKeys;
}

export interface TilgangState {
	harTilgang: boolean;
}

export interface TilgangApiResponse {
	pilotSosialhjelp: boolean;
}
