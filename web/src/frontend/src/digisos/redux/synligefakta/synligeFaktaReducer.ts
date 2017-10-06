import { Reducer } from "../../../nav-soknad/redux/reduxTypes";

export interface SynligeFaktaState {
	data: { [key: string]: FaktumStruktur[] };
}

export interface FaktumStruktur {
	id: string;
	type: string;
	dependOn: FaktumStruktur;
	flereTillatt: boolean;
	properties: PropertyStruktur[];
}

export interface PropertyStruktur {
	id: string;
	type: string;
}

export interface SynligeFaktaProps {
	synligefakta: { [key: string]: FaktumStruktur[] };
}

const synligeFaktaReducer: Reducer<SynligeFaktaState, any> = (state = defaultState, action) => {
	return state;
};

export default synligeFaktaReducer;

const defaultState: SynligeFaktaState = {
	data: {
		"opplysninger.utgifter": [{
			id: "opplysninger.husleie",
			type: "composite",
			dependOn: {
				id: "opplysninger.utgifter",
				type: "hidden",
				dependOn: null,
				flereTillatt: null,
				properties: null,
			},
			flereTillatt: null,
			properties: [{
				id: "permnd",
				type: "textbox",
			}]
		}, {
			id: "opplysninger.boliglan",
			type: "composite",
			dependOn: {
				id: "opplysninger.utgifter",
				type: "hidden",
				dependOn: null,
				flereTillatt: null,
				properties: null,
			},
			flereTillatt: null,
			properties: [{
				id: "avdragpermnd",
				type: "textbox",
			}, {
				id: "renterpermnd",
				type: "textbox",
			}]
		}],
		"opplysninger.bosituasjon": [{
			id: "opplysninger.annenbosituasjon",
			type: "composite",
			dependOn: {
				id: "opplysninger.bosituasjon",
				type: "hidden",
				dependOn: null,
				flereTillatt: null,
				properties: null,
			},
			flereTillatt: null,
			properties: [{
				id: "permnd",
				type: "textbox",
			}]
		}]
	}
};
