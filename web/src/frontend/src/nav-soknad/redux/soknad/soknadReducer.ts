import { REST_STATUS } from "../../types";
import { Reducer, SoknadState } from "../reduxTypes";

import { SoknadActionTypes, SoknadActionTypeKeys } from "./soknadActionTypes";

const defaultState: SoknadState = {
	restStatus: REST_STATUS.INITIALISERT,
	sendSoknadPending: false,
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
		vedlegg: [],
		journalforendeEnhet: "",
		soknadPrefix: "",
		soknadUrl: "",
		fortsettSoknadUrl: "",
		stegliste: [],
		sprak: "",
		ikkeInnsendteVedlegg: [],
		opplastedeVedlegg: [],
		innsendteVedlegg: [],
		avbrytDialogSynlig: false
	}
};

const soknadReducer: Reducer<SoknadState, SoknadActionTypes> = (
	state = defaultState,
	action
) => {
	switch (action.type) {
		case SoknadActionTypeKeys.AVBRYT_SOKNAD:
			return {
				...state,
				data: {
					...state.data,
					avbrytDialogSynlig: true
				}
			};
		case SoknadActionTypeKeys.FORTSETT_SOKNAD:
			return {
				...state,
				data: {
					...state.data,
					avbrytDialogSynlig: false
				}
			};

		case SoknadActionTypeKeys.RESET_SOKNAD:
			return {
				...state,
				...defaultState
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
			return {
				...state,
				data: action.data,
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
		case SoknadActionTypeKeys.KVITTERING_HENTET:
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
		default:
			return state;
	}
};

export default soknadReducer;
