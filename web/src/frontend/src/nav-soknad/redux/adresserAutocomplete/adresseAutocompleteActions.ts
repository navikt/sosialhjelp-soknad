import { adresserAutocompleteActionTypeKeys, adresserAutocompleteActionTypes } from "./adresserAutocompleteTypes";
import { NavEnhet } from "../../../digisos/data/adresserAutocomplete";

const lesadresserAutocomplete = (): adresserAutocompleteActionTypes => {
	return {
		type: adresserAutocompleteActionTypeKeys.LES_KOMMUNER
	};
};

const lesadresserAutocompleteOk = (adresserAutocomplete: NavEnhet[]): adresserAutocompleteActionTypes => {
	return {
		type: adresserAutocompleteActionTypeKeys.LES_KOMMUNER_OK,
		adresserAutocomplete
	};
};

const lesadresserAutocompleteFeilet = (error: string): adresserAutocompleteActionTypes => {
	return {
		type: adresserAutocompleteActionTypeKeys.LES_KOMMUNER_FEILET,
		error
	};
};

export {
	lesadresserAutocomplete,
	lesadresserAutocompleteOk,
	lesadresserAutocompleteFeilet
};
