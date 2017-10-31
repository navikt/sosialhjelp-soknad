import {
	FaktumStruktur,
	SynligeFaktaActionTypeKeys,
	SynligeFaktaActionTypes
} from "./synligeFaktaTypes";

export function hentSynligeFakta(): SynligeFaktaActionTypes {
	return {
		type: SynligeFaktaActionTypeKeys.HENT_SYNLIGE
	};
}

export function hentSynligeFaktaOk(struktur: FaktumStruktur[]): SynligeFaktaActionTypes {
	return {
		type: SynligeFaktaActionTypeKeys.HENT_SYNLIGE_OK,
		data: struktur
	};
}

export function hentSynligeFaktaFeilet(feilmelding: string): SynligeFaktaActionTypes {
	return {
		type: SynligeFaktaActionTypeKeys.HENT_SYNLIGE_FEILET,
		feilmelding
	};
}
