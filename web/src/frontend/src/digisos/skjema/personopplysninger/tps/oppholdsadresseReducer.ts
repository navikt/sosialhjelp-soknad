import { Reducer } from "../../../../nav-soknad/redux/reduxTypes";
import { Adresse } from "./Oppholdsadresse";
import { Faktum } from "../../../../nav-soknad/types";

export enum OppholdsadresseActionTypeKeys {
	VELG_FOLKEREGISTRERT_ADRESSE = "oppholdsadresse/VELG_FOLKEREGISTRERT_ADRESSE",
	VELG_ADRESSE_FRA_SOKETREFF = "oppholdsadresse/VELG_ADRESSE_FRA_SOKETREFF",
	SETT_SOKNADSMOTTAKER_STATUS = "oppholdsadresse/HENT_SOKNADSMOTTAKER_INFO",
	HENT_SOKNADSMOTTAKER = "oppholdsadresse/HENT_SOKNADSMOTTAKER",
	SETT_ADRESSE_KATEGORI = "oppholdsadresse/SETT_ADRESSE_KATEGORI"
}

export enum SoknadsMottakerStatus {
	IKKE_VALGT = "ikke_valgt",
	VALGT = "valgt",
	GYLDIG = "gyldig",
	UGYLDIG = "ugyldig",
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
	adresseKategori: AdresseKategori;
}

const initialState: OppholdsAdresseState = {
	valgtAdresse: null,
	soknadsmottaker: null,
	soknadsmottakerStatus: SoknadsMottakerStatus.IKKE_VALGT,
	adresseKategori: AdresseKategori.IKKE_VALGT
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
		case OppholdsadresseActionTypeKeys.SETT_ADRESSE_KATEGORI: {
			return {
				...state,
				adresseKategori: action.adresseKategori
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

export const settAdresseKategori = (adresseKategori: AdresseKategori): any => {
	return {
		type: OppholdsadresseActionTypeKeys.SETT_ADRESSE_KATEGORI,
		adresseKategori
	};
};

export interface HentSoknadsmottakerAction {
	type: OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER;
	brukerBehandlingId: string;
	adresseFaktum: Faktum;
	soknadsmottakerFaktum: Faktum;
	oppholdsadressevalg: string;
	fakta: Faktum[];
	adresseKategori: AdresseKategori;
}

export const hentSoknadsmottakerAction = (
	brukerBehandlingId: string,
	adresseFaktum: Faktum,
	soknadsmottakerFaktum: Faktum,
	oppholdsadressevalg: string,
	fakta: Faktum[],
	adresseKategori: AdresseKategori
): HentSoknadsmottakerAction => {
	return {
		type: OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER,
		brukerBehandlingId,
		adresseFaktum,
		soknadsmottakerFaktum,
		oppholdsadressevalg,
		fakta,
		adresseKategori
	};
};

export default oppholdsadresseReducer;
