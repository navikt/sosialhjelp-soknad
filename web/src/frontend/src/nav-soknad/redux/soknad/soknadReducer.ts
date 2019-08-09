import {REST_STATUS} from "../../types";
import {SoknadState} from "../reduxTypes";

import {ErSystemdataEndret, SoknadActionTypeKeys, SoknadActionTypes} from "./soknadActionTypes";

export const defaultState: SoknadState = {
	restStatus: REST_STATUS.INITIALISERT,
	sendSoknadPending: false,
	startSoknadPending: false,
	avbrytDialog: {
		synlig: false,
		destinasjon: null
	},
	infofaktum: null,
	avbrytSoknadSjekkAktiv: true,
	data: {
		brukerBehandlingId: "",
		fakta: []
	},
	behandlingsId: "",
	erGjenopptattSoknad: true,
	skalSjekkeOmSystemdataErEndret: true,
	erSystemdataEndret: ErSystemdataEndret.NOT_ASKED,
	valgtSoknadsmottaker: undefined
};

export default (state: SoknadState = defaultState, action: SoknadActionTypes) => {
	switch (action.type) {
		case SoknadActionTypeKeys.START_SOKNAD:
			return {
				...state,
				startSoknadPending: true
			};
		case SoknadActionTypeKeys.START_SOKNAD_OK:
			return {
				...state,
				startSoknadPending: false
			};
		case SoknadActionTypeKeys.AVBRYT_SOKNAD:
			return {
				...state,
				avbrytDialog: {
					synlig: true,
					destinasjon: action.destinasjon
				}
			};
		case SoknadActionTypeKeys.FORTSETT_SOKNAD:
			return {
				...state,
				avbrytDialog: {
					synlig: false,
					destinasjon: null
				}
			};

		case SoknadActionTypeKeys.RESET_SOKNAD:
			return {
				...defaultState,
				startSoknadPending: state.startSoknadPending // Beholder i og med reset kalles også når en starter en ny søknad
			};
		case SoknadActionTypeKeys.OPPRETT_SOKNAD:
			return {
				...state,
				restStatus: REST_STATUS.PENDING,
				startSoknadPending: true
			};
		case SoknadActionTypeKeys.OPPRETT_SOKNAD_OK:
			return {
				...state,
				data: {
					...state.data,
					brukerBehandlingId: action.brukerBehandlingId
				},
				restStatus: REST_STATUS.OK,
				erGjenopptattSoknad: false,
				skalSjekkeOmSystemdataErEndret: false,
				behandlingsId: action.brukerBehandlingId
			};
		case SoknadActionTypeKeys.HENT_SOKNAD:
			return {
				...state,
				restStatus: REST_STATUS.PENDING
			};
		case SoknadActionTypeKeys.HENT_SOKNAD_OK:
			const { xsrfCookieReceived, brukerBehandlingId } = action;
			return {
				...state,
				data: { brukerBehandlingId, fakta: []},
				restStatus: xsrfCookieReceived ? REST_STATUS.OK : REST_STATUS.FEILET,
				behandlingsId: action.brukerBehandlingId
			};
		case SoknadActionTypeKeys.SEND_SOKNAD:
			return {
				...state,
				sendSoknadPending: true
			};
		case SoknadActionTypeKeys.SEND_SOKNAD_OK:
			return {
				...state,
				sendSoknadPending: false
			};
		case SoknadActionTypeKeys.HENT_KVITTERING:
			return {
				...state,
				restStatus: REST_STATUS.PENDING
			};
		case SoknadActionTypeKeys.HENT_KVITTERING_OK:
			return {
				...state,
				kvittering: action.kvittering,
				restStatus: REST_STATUS.OK
			};
		case SoknadActionTypeKeys.SET_SERVER_FEIL:
			return {
				...state,
				restStatus: REST_STATUS.FEILET,
				sendSoknadPending: false
			};
		case SoknadActionTypeKeys.SETT_INFOFAKTUM:
			return {
				...state,
				infofaktum: action.info
			};
		case SoknadActionTypeKeys.SLETT_SOKNAD_OK:
			return {
				...defaultState
			};
		case SoknadActionTypeKeys.SETT_AVBRYT_SOKNAD_SJEKK:
			return {
				...state,
				avbrytSoknadSjekkAktiv: action.aktiv
			};
		case SoknadActionTypeKeys.FINN_OG_OPPDATER_SOKNADSMOTTAKER_STATUS: {
			return {
				...state
			}
		}
		case SoknadActionTypeKeys.OPPDATER_SOKNADSMOTTAKER_STATUS:
			const { valgtSoknadsmottaker } = action;
			return {
				...state,
				valgtSoknadsmottaker
			};
		case SoknadActionTypeKeys.SET_ER_SYSTEMDATA_ENDRET: {
			return {
				...state,
				erSystemdataEndret: action.erSystemdataEndret ? ErSystemdataEndret.YES : ErSystemdataEndret.NO,
				skalSjekkeOmSystemdataErEndret: false
			}
		}
		default:
			return state;
	}
};

