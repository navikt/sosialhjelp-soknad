import { Reducer } from "../../redux/reduxTypes";
import { Adresse } from "./adresseAutocomplete";

export enum AdresseAutocompleteActionTypeKeys {
	SETT_VERDI = "adresseAutcomplete/SETT_VERDI",
	SETT_STATUS = "adresseAutcomplete/SETT_STATUS",
	SETT_VALGT_ADRESSE = "adresseAutcomplete/SETT_VALGT_ADRESSE"
}

export const enum AdresseAutocompleteStatus {
	INITIELL = "INITIELL",
	SOKER = "SOKER",
	ADRESSE_OK = "ADRESSE_OK",
	ADRESSE_UGYLDIG = "ADRESSE_UGYLDIG",
	ADRESSE_IKKE_VALGT = "ADRESSE_IKKE_VALGT",
	HUSNUMMER_IKKE_SATT = "HUSNUMMER_IKKE_SATT"
}

export interface AdresseAutocompleteState {
	value: string;
	status: AdresseAutocompleteStatus | null;
	valgtAdresse: Adresse | null;
}

const initialState: AdresseAutocompleteState = {
	value: "",
	status: AdresseAutocompleteStatus.INITIELL,
	valgtAdresse: null,
};

const AdresseAutocompleteReducer: Reducer<AdresseAutocompleteState, any> = (
	state = initialState,
	action
): any => {

	switch (action.type) {
		case AdresseAutocompleteActionTypeKeys.SETT_VERDI: {
			return {
				...state,
				value: action.value
			};
		}
		case AdresseAutocompleteActionTypeKeys.SETT_STATUS: {
			return {
				...state,
				status: action.status
			};
		}
		case AdresseAutocompleteActionTypeKeys.SETT_VALGT_ADRESSE: {
			return {
				...state,
				valgtAdresse: action.valgtAdresse
			};
		}
		default:
			return state;
	}
};

export const settVerdi = (verdi: string): any => {
	return {
		type: AdresseAutocompleteActionTypeKeys.SETT_VERDI,
		value: verdi
	};
};

export const settStatus = (status: AdresseAutocompleteStatus): any => {
	return {
		type: AdresseAutocompleteActionTypeKeys.SETT_STATUS,
		status
	};
};

export const settValgtAdresse = (adresse: Adresse): any => {
	return {
		type: AdresseAutocompleteActionTypeKeys.SETT_VALGT_ADRESSE,
		valgtAdresse: adresse
	};
};

export default AdresseAutocompleteReducer;
