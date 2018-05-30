import { REST_STATUS } from "../../types/restTypes";

export enum adresserAutocompleteActionTypeKeys {
	LES_ADRESSEAUTOCOMPLETE = "navEnheter/LES_ADRESSEAUTOCOMPLETE",
	LES_ADRESSEAUTOCOMPLETE_OK = "navEnheter/LES_ADRESSEAUTOCOMPLETE_OK",
	LES_ADRESSEAUTOCOMPLETE_FEILET = "navEnheter/LES_ADRESSEAUTOCOMPLETE_FEILET"
}

export type adresserAutocompleteActionTypes =
	HentadresserAutocomplete
	| HentadresserAutocompleteOk
	| HentadresserAutocompleteFeilet;

export interface HentadresserAutocomplete {
	type: adresserAutocompleteActionTypeKeys.LES_ADRESSEAUTOCOMPLETE;
}

export interface HentadresserAutocompleteOk {
	type: adresserAutocompleteActionTypeKeys.LES_ADRESSEAUTOCOMPLETE_OK;
	adresseAutocomplete: NavEnhet[];
}

export interface HentadresserAutocompleteFeilet {
	type: adresserAutocompleteActionTypeKeys.LES_ADRESSEAUTOCOMPLETE_FEILET;
	error: string;
}

export interface adresserAutocompleteState {
	restStatus: REST_STATUS;
	data: NavEnhet[];
	error: string;
}
