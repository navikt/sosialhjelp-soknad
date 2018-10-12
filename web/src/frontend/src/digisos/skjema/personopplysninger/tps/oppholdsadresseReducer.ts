import { Reducer } from "../../../../nav-soknad/redux/reduxTypes";
import { Adresse } from "./Oppholdsadresse";
import { Faktum } from "../../../../nav-soknad/types";

export enum OppholdsadresseActionTypeKeys {
	VELG_FOLKEREGISTRERT_ADRESSE = "oppholdsadresse/VELG_FOLKEREGISTRERT_ADRESSE",
	VELG_ADRESSE_FRA_SOKETREFF = "oppholdsadresse/VELG_ADRESSE_FRA_SOKETREFF",
	SETT_SOKNADSMOTTAKER_STATUS = "oppholdsadresse/HENT_SOKNADSMOTTAKER_INFO",
	HENT_SOKNADSMOTTAKER = "oppholdsadresse/HENT_SOKNADSMOTTAKER",
	SETT_SOKNADSMOTTAKERE = "oppholdsadresse/SETT_SOKNADSMOTTAKERE",
	VELG_SOKNADSMOTTAKER = "oppholdsadresse/VELG_SOKNADSMOTTAKER"
}

export enum SoknadsMottakerStatus {
	IKKE_VALGT = "ikke_valgt",
	VALGT = "valgt",
	GYLDIG = "gyldig",
	UGYLDIG = "ugyldig",
	MANGLER_NAV_KONTOR = "mangler_nav_kontor"
}

export enum AdresseKategori {
	IKKE_VALGT = "IKKE_VALGT",
	FOLKEREGISTRERT = "FOLKEREGISTRERT",
	MIDLERTIDIG = "MIDLERTIDIG",
	SOKNAD = "SOKNAD"
}

export interface OppholdsAdresseState {
	valgtAdresse: Adresse | null;
	soknadsmottaker: any;
	soknadsmottakerStatus: SoknadsMottakerStatus;
	soknadsmottakere: any[];
}

const initialState: OppholdsAdresseState = {
	valgtAdresse: null,
	soknadsmottaker: null,
	soknadsmottakerStatus: SoknadsMottakerStatus.IKKE_VALGT,
	soknadsmottakere: []
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
		case OppholdsadresseActionTypeKeys.SETT_SOKNADSMOTTAKERE: {
			return {
				...state,
				soknadsmottakere: action.soknadsmottakere
			};
		}
		default:
			return state;
	}
};

export const settSoknadsmottakere = (soknadsmottakere: any): any => {
	return {
		type: OppholdsadresseActionTypeKeys.SETT_SOKNADSMOTTAKERE,
		soknadsmottakere
	};
};

export const settSoknadsmottakerStatus = (status: SoknadsMottakerStatus): any => {
	return {
		type: OppholdsadresseActionTypeKeys.SETT_SOKNADSMOTTAKER_STATUS,
		status
	};
};

export const velgSoknadsmottaker = (soknadsmottaker: any, fakta: Faktum[]): any => {
	return {
		type: OppholdsadresseActionTypeKeys.VELG_SOKNADSMOTTAKER,
		soknadsmottaker,
		fakta
	};
};

export interface VelgSoknadsmottakerAction {
	type: OppholdsadresseActionTypeKeys.VELG_SOKNADSMOTTAKER;
	soknadsmottaker: any;
	fakta: Faktum[];
}

export interface HentSoknadsmottakerAction {
	type: OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER;
	brukerBehandlingId: string;
	fakta: Faktum[];
	adresse: Adresse;
	oppholdsadressevalg: string;
	adresseKategori: AdresseKategori;
}

export const hentSoknadsmottakerAction = (
	brukerBehandlingId: string,
	fakta: Faktum[],
	adresse: Adresse,
	oppholdsadressevalg: string,
	adresseKategori: AdresseKategori
): HentSoknadsmottakerAction => {
	return {
		type: OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER,
		brukerBehandlingId,
		fakta,
		adresse,
		oppholdsadressevalg,
		adresseKategori
	};
};

export default oppholdsadresseReducer;
