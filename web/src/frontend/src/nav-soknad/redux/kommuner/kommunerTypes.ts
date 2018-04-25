import { NavEnhet } from "../../../digisos/data/kommuner";
import { REST_STATUS } from "../../types/restTypes";

export enum KommunerActionTypeKeys {
	LES_KOMMUNER = "kommuner/LES_KOMMUNER",
	LES_KOMMUNER_OK = "kommuner/LES_KOMMUNER_OK",
	LES_KOMMUNER_FEILET = "kommuner/LES_KOMMUNER_FEILET"
}

export type KommunerActionTypes =
	HentKommuner
	| HentKommunerOk
	| HentKommunerFeilet;

export interface HentKommuner {
	type: KommunerActionTypeKeys.LES_KOMMUNER;
}

export interface HentKommunerOk {
	type: KommunerActionTypeKeys.LES_KOMMUNER_OK;
	kommuner: NavEnhet[];
}

export interface HentKommunerFeilet {
	type: KommunerActionTypeKeys.LES_KOMMUNER_FEILET;
	error: string;
}

export interface KommunerState {
	restStatus: REST_STATUS;
	data: NavEnhet[];
	error: string;
}
