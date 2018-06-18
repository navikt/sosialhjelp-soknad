import { Reducer } from "../../../../nav-soknad/redux/reduxTypes";
import { Adresse } from "./Oppholdsadresse";

export enum OppholdsadresseActionTypeKeys {
	VELG_FOLKEREGISTRERT_ADRESSE = "oppholdsadresse/VELG_FOLKEREGISTRERT_ADRESSE",
	VELG_ADRESSE_FRA_SOKETREFF = "oppholdsadresse/VELG_ADRESSE_FRA_SOKETREFF",
	HENT_SOKNADSMOTTAKER_INFO = "oppholdsadresse/HENT_SOKNADSMOTTAKER_INFO",
}

enum SoknadsMottakerStatus {
	OK = "ok",
	FEIL = "feil",
	ADVARSEL = "advarsel",
	IKKE_VALGT = "ikke_valgt"
}

export interface OppholdsAdresseState {
	valgtAdresse: Adresse;
	soknadsmottaker: any;
	soknadsmottakerStatus: SoknadsMottakerStatus;
}

const initialState: OppholdsAdresseState = {
	valgtAdresse: null,
	soknadsmottaker: null,
	soknadsmottakerStatus: SoknadsMottakerStatus.IKKE_VALGT
};

const oppholdsadresseReducer: Reducer<OppholdsAdresseState, any> = (
	state = initialState,
	action
): any => {

	switch (action.type) {
		case OppholdsadresseActionTypeKeys.VELG_FOLKEREGISTRERT_ADRESSE: {
			return {
				...state,
				valgtAdresse: action.adresse
			};
		}
		case OppholdsadresseActionTypeKeys.VELG_ADRESSE_FRA_SOKETREFF: {
			return {
				...state,
				valgtAdresse: action.adresse
			};
		}
		case OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER_INFO: {
			action.hentSoknadsmottakerCallback();
			return {
				...state,
			};
		}
		default:
			return state;
	}
};

export const velgFolkeregistrertAdresse = (adresse: Adresse): any => {
	return {
		type: OppholdsadresseActionTypeKeys.VELG_FOLKEREGISTRERT_ADRESSE,
		adresse
	};
};

export const velgAdresseFraSoketreff = (adresse: Adresse): any => {
	return {
		type: OppholdsadresseActionTypeKeys.VELG_ADRESSE_FRA_SOKETREFF,
		adresse
	};
};

export const hentSoknadsmottakerInfo = (hentSoknadsmottakerCallback: any): any => {
	return {
		type: OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER_INFO,
		hentSoknadsmottakerCallback
	};
};

export default oppholdsadresseReducer;
