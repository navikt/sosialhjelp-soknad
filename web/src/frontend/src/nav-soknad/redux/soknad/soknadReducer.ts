import { REST_STATUS } from "../../types";
import { Reducer, SoknadState } from "../reduxTypes";

import { SoknadActionTypes, SoknadActionTypeKeys } from "./soknadActionTypes";

export const defaultState: SoknadState = {
	restStatus: REST_STATUS.INITIALISERT,
	sendSoknadPending: false,
	startSoknadPending: false,
	avbrytDialog: {
		synlig: false,
		destinasjon: null
	},
	infofaktum: null,
	data: {
		soknadId: null,
		skjemaNummer: "",
		uuid: "",
		brukerBehandlingId: "",
		behandlingskjedeId: "",
		fakta: [],
		status: "",
		aktoerId: "",
		opprettetDato: "",
		sistLagret: "",
		delstegStatus: "",
		// vedlegg: [],
		journalforendeEnhet: "",
		soknadPrefix: "",
		soknadUrl: "",
		fortsettSoknadUrl: "",
		stegliste: [],
		sprak: "" // ,
		// ikkeInnsendteVedlegg: [],
		// opplastedeVedlegg: [],
		// innsendteVedlegg: []
	}
};

const soknadReducer: Reducer<SoknadState, SoknadActionTypes> = (
	state = defaultState,
	action
) => {
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
				restStatus: REST_STATUS.PENDING
			};
		case SoknadActionTypeKeys.OPPRETT_SOKNAD_OK:
			return {
				...state,
				data: {
					...state.data,
					brukerBehandlingId: action.brukerBehandlingId
				},
				restStatus: REST_STATUS.OK
			};
		case SoknadActionTypeKeys.HENT_SOKNAD:
			return {
				...state,
				restStatus: REST_STATUS.PENDING
			};
		case SoknadActionTypeKeys.HENT_SOKNAD_OK:
			let reducedData = action.data;
			delete reducedData['vedlegg'];
			delete reducedData['ikkeInnsendteVedlegg'];
			delete reducedData['opplastedeVedlegg'];
			delete reducedData['innsendteVedlegg'];
			// TODO Bruk destructuring for å bare hente ut data vi trenger.

			return {
				...state,
				data: reducedData,
				restStatus: REST_STATUS.OK
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
		default:
			return state;
	}
};

export default soknadReducer;
