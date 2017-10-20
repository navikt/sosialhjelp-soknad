import { REST_STATUS } from "../../../nav-soknad/types/restTypes";

export interface GruppertFaktumStruktur {
	[key: string]: FaktumStruktur[];
}

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
		configuration: [
			{
				key: string;
				value: string;
			}
		];
	};
}

export interface SynligeFaktaProps {
	synligefakta: SynligeFaktaState;
}

export enum SynligeFaktaActionTypeKeys {
	HENT_SYNLIGE = "synligefakta/HENT_SYNLIGE",
	HENTET_SYNLIGE = "synligefakta/HENTET_SYNLIGE",
	OTHER_ACTION = "__any_other_action_type__"
}

export interface HentSynligeFaktaAction {
	type: SynligeFaktaActionTypeKeys.HENT_SYNLIGE;
}

export interface HentetSynligeFaktaAction {
	type: SynligeFaktaActionTypeKeys.HENTET_SYNLIGE;
	data: FaktumStruktur[];
}
