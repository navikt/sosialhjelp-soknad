import { REST_STATUS } from "../../../nav-soknad/types/restTypes";

export interface GruppertFaktumStruktur { [key: string]: FaktumStruktur[]; }

export interface SynligeFaktaState {
	data: GruppertFaktumStruktur;
	restStatus: REST_STATUS;
}

export interface FaktumStruktur {
	id: string;
	type: string;
	dependOn: FaktumStruktur;
	flereTillatt: string;
	properties: PropertyStruktur[];
}

export interface PropertyStruktur {
	id: string;
	type: string;
	configuration: {
		configuration: [{
			key: string;
			value: string;
		}]
	};
}

export interface SynligeFaktaProps {
	synligefakta: SynligeFaktaState;
}

export enum SynligeFaktaActionTypeKeys {
	START_BYGG_STRUKTUR = "synligefakta/START_BYGG_STRUKTUR", // TODO bedre navn
	// HENT_SYNLIGE = "synligefakta/HENT_SYNLIGE",
	HENT_SYNLIGE_OK = "synligefakta/HENT_SYNLIGE_OK",
		BYGG_STRUKTUR_OK = "synligefakta/BYGG_STRUKTUR_OK",
	BYGG_STRUKTUR_FEILET = "synligefakta/BYGG_STRUKTUR_FEILET",
	OTHER_ACTION = "__any_other_action_type__"
}

export type SynligeFaktaActionTypes =
	ByggStrukturAction |
	HentSynligeFaktaOKAction |
	ByggStrukturFeiletAction |
	ByggStrukturOkAction;

export interface ByggStrukturAction {
	type: SynligeFaktaActionTypeKeys.START_BYGG_STRUKTUR;
}

export interface HentSynligeFaktaOKAction {
	type: SynligeFaktaActionTypeKeys.HENT_SYNLIGE_OK;
	data: FaktumStruktur[];
}

export interface ByggStrukturFeiletAction {
	type: SynligeFaktaActionTypeKeys.BYGG_STRUKTUR_FEILET;
	feilmelding: string;
}

export interface ByggStrukturOkAction {
	type: SynligeFaktaActionTypeKeys.BYGG_STRUKTUR_OK;
}
