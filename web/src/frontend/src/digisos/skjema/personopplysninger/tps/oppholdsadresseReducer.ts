import { Reducer } from "../../../../nav-soknad/redux/reduxTypes";
import { Adresse } from "./Oppholdsadresse";
import { Faktum } from "../../../../nav-soknad/types";

export enum OppholdsadresseActionTypeKeys {
	VELG_FOLKEREGISTRERT_ADRESSE = "oppholdsadresse/VELG_FOLKEREGISTRERT_ADRESSE",
	VELG_ADRESSE_FRA_SOKETREFF = "oppholdsadresse/VELG_ADRESSE_FRA_SOKETREFF",
	SETT_SOKNADSMOTTAKER_STATUS = "oppholdsadresse/HENT_SOKNADSMOTTAKER_INFO",
	HENT_SOKNADSMOTTAKER = "oppholdsadresse/HENT_SOKNADSMOTTAKER"
}

export enum SoknadsMottakerStatus {
	IKKE_VALGT = "ikke_valgt",
	VALGT = "valgt",
	GYLDIG = "gyldig",
	UGYLDIG = "ugyldig",
}

export interface OppholdsAdresseState {
	valgtAdresse: Adresse | null;
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
		case OppholdsadresseActionTypeKeys.SETT_SOKNADSMOTTAKER_STATUS: {
			return {
				...state,
				soknadsmottakerStatus: action.status
			};
		}
		default:
			return state;
	}
};

export const velgAdresseFraSoketreff = (adresse: Adresse): any => {
	return {
		type: OppholdsadresseActionTypeKeys.VELG_ADRESSE_FRA_SOKETREFF,
		adresse
	};
};

export const settSoknadsmottakerStatus = (status: SoknadsMottakerStatus): any => {
	return {
		type: OppholdsadresseActionTypeKeys.SETT_SOKNADSMOTTAKER_STATUS,
		status
	};
};

export interface HentSoknadsmottakerAction {
	type: OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER;
	brukerBehandlingId: string;
	adresse: Adresse;
	adresseFaktum: Faktum;
	soknadsmottakerFaktum: Faktum;
	fakta: Faktum[];
}

export const hentSoknadsmottakerAction = (
	brukerBehandlingId: string,
	adresse: Adresse,
	adresseFaktum: Faktum,
	soknadsmottakerFaktum: Faktum,
	fakta: Faktum[]
): HentSoknadsmottakerAction => {
	return {
		type: OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER,
		brukerBehandlingId,
		adresse,
		adresseFaktum,
		soknadsmottakerFaktum,
		fakta
	};
};

export default oppholdsadresseReducer;
