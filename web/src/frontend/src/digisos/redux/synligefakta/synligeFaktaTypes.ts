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
	HENT_SYNLIGE = "synligefakta/HENT_SYNLIGE",
	HENT_SYNLIGE_OK = "synligefakta/HENT_SYNLIGE_OK",
	HENT_SYNLIGE_FEILET = "synligefakta/HENT_SYNLIGE_FEILET",
	OTHER_ACTION = "__any_other_action_type__"
}

export type SynligeFaktaActionTypes = HentSynligeFaktaAction | HentSynligeFaktaOKAction | HentSynligeFaktaFeiletAction;

export interface HentSynligeFaktaAction {
	type: SynligeFaktaActionTypeKeys.HENT_SYNLIGE;
}

export interface HentSynligeFaktaOKAction {
	type: SynligeFaktaActionTypeKeys.HENT_SYNLIGE_OK;
	data: FaktumStruktur[];
}

export interface HentSynligeFaktaFeiletAction {
	type: SynligeFaktaActionTypeKeys.HENT_SYNLIGE_FEILET;
	feilmelding: string;
}
