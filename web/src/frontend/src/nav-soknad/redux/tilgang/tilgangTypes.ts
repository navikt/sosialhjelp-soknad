export type TilgangSperrekode = "pilot" | "bruker";

export enum TilgangActionTypeKeys {
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
	type: TilgangActionTypeKeys.INIT;
}

interface HentetTilgangAction {
	type: TilgangActionTypeKeys.OK;
	harTilgang: boolean;
	sperrekode?: TilgangSperrekode;
}

interface HenterTilgangAction {
	type: TilgangActionTypeKeys.PENDING;
}

interface HentTilgangFeiletAction {
	type: TilgangActionTypeKeys.FEILET;
	feilmelding: string;
}

export interface OtherAction {
	type: TilgangActionTypeKeys.OTHER_ACTION;
}

export interface TilgangState {
	harTilgang: boolean;
	sperrekode: TilgangSperrekode | undefined;
	status: TilgangActionTypeKeys;
}

export interface TilgangApiResponse {
	harTilgang: boolean;
	sperrekode: TilgangSperrekode;
}
