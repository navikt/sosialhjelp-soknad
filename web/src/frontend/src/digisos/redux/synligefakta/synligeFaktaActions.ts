import { FaktumStruktur, SynligeFaktaActionTypeKeys, SynligeFaktaActionTypes } from "./synligeFaktaTypes";

export function byggBelopOgVedleggStruktur(): SynligeFaktaActionTypes {
	return {
		type: SynligeFaktaActionTypeKeys.START_BYGG_STRUKTUR
	};
}

export function hentSynligeFaktaOk(struktur: FaktumStruktur[]): SynligeFaktaActionTypes {
	return {
		type: SynligeFaktaActionTypeKeys.HENT_SYNLIGE_OK,
		data: struktur
	};
}

export function byggStrukturFeilet(feilmelding: string): SynligeFaktaActionTypes {
	return {
		type: SynligeFaktaActionTypeKeys.BYGG_STRUKTUR_FEILET,
		feilmelding
	};
}

export function byggStrukturOk(): SynligeFaktaActionTypes {
	return {
		type: SynligeFaktaActionTypeKeys.BYGG_STRUKTUR_OK
	};
}
