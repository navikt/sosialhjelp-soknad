import { Reducer } from "../../../../nav-soknad/redux/reduxTypes";
import { Adresse } from "./Oppholdsadresse";
// import { fetchToJson } from "../../../../nav-soknad/utils/rest-utils";
// import { Faktum } from "../../../../nav-soknad/types";
// import {  oppdaterFaktumMedVerdier } from "../../../../nav-soknad/utils";
// import { FaktumActionTypeKeys } from "../../../../nav-soknad/redux/fakta/faktaActionTypes";

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
	valgtAdresse: Adresse;
	soknadsmottaker: any;
	soknadsmottakerStatus: SoknadsMottakerStatus;
}

const initialState: OppholdsAdresseState = {
	valgtAdresse: {
		"adresse": null,
		"husnummer": null,
		"husbokstav": null,
		"kommunenummer": null,
		"kommunenavn": null,
		"postnummer": null,
		"poststed": null,
		"geografiskTilknytning": null,
		"gatekode": null,
		"bydel": null,
		"type": "gateadresse"
	},
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

export const settSoknadsmottakerStatus = (status: SoknadsMottakerStatus): any => {
	return {
		type: OppholdsadresseActionTypeKeys.SETT_SOKNADSMOTTAKER_STATUS,
		status
	};
};

export interface HentSoknadsmottakerAction {
	type: OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER;
	brukerBehandlingId: string;
}

export const hentSoknadsmottakerAction = (brukerBehandlingId: string): HentSoknadsmottakerAction => {
	return {
		type: OppholdsadresseActionTypeKeys.HENT_SOKNADSMOTTAKER,
		brukerBehandlingId
	}
};
// export const hentSoknadsmottaker = (brukerBehandlingId: string, faktum: Faktum): any => {
//
// 		fetchToJson("soknadsmottaker/" + brukerBehandlingId)
// 			.then((response: any) => {
// 				if (response && response.toString().length > 0) {
// 					const properties = [
// 						"enhetsId",
// 						"enhetsnavn",
// 						"kommunenummer",
// 						"kommunenavn",
// 						"sosialOrgnr"
// 					];
// 					properties.map((property: string) => {
// 						let value = null;
// 						if (response !== null) {
// 							value = response[property];
// 						}
// 						faktum = oppdaterFaktumMedVerdier(faktum, value, property);
// 					});
// 					return {
// 						type: FaktumActionTypeKeys.LAGRE_FAKTUM,
// 						faktum
// 					};
//
// 				} else {
// 					const properties = [
// 						"enhetsId",
// 						"enhetsnavn",
// 						"kommunenummer",
// 						"kommunenavn",
// 						"sosialOrgnr"
// 					];
// 					properties.map((property: string) => {
// 						faktum = oppdaterFaktumMedVerdier(faktum, null, property);
// 					});
// 					return {
// 						type: FaktumActionTypeKeys.LAGRE_FAKTUM,
// 						faktum
// 					};
// 				}
// 			})
// 			.catch((error: any) => {
// 				console.error(error);
// 				return {
// 					type: "error",
// 					error: "TODO Add error message"
// 				};
// 			});
// };

export default oppholdsadresseReducer;
