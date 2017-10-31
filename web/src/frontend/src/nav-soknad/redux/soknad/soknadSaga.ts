import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import {
	fetchPost,
	fetchToJson,
	fetchDelete,
	fetchKvittering
} from "../../utils/rest-utils";
import { finnFaktum, oppdaterFaktumMedVerdier } from "../../utils";
import { updateFaktaMedLagretVerdi } from "../fakta/faktaUtils";
import { setApplikasjonsfeil } from "../applikasjonsfeil/applikasjonsfeilActions";
import {
	SoknadActionTypeKeys,
	HentSoknadAction,
	SlettSoknadAction,
	StartSoknadAction,
	SendSoknadAction,
	HentKvitteringAction
} from "./soknadActionTypes";
import {
	tilSteg,
	navigerTilDittNav,
	navigerTilKvittering
} from "../navigasjon/navigasjonActions";
import { lagreFaktum, setFakta } from "../fakta/faktaActions";
import { Soknad } from "../../types";

import {
	opprettSoknadOk,
	opprettSoknadFeilet,
	hentetSoknad,
	hentSoknadFeilet,
	slettSoknadOk,
	slettSoknadFeilet,
	hentKvitteringOk,
	hentKvitteringFeilet,
	sendSoknadOk,
	sendSoknadFeilet
} from "./soknadActions";

const SKJEMAID = "NAV 35-18.01";

export interface OpprettSoknadResponse {
	brukerBehandlingId: string;
}

function* opprettSoknadSaga(): SagaIterator {
	try {
		const response: OpprettSoknadResponse = yield call(
			fetchPost,
			"soknader",
			JSON.stringify({ soknadType: SKJEMAID })
		);
		yield put(opprettSoknadOk(response.brukerBehandlingId));
		return response.brukerBehandlingId;
	} catch (reason) {
		yield put(opprettSoknadFeilet(reason));
	}
}

function* hentSoknadSaga(action: HentSoknadAction): SagaIterator {
	try {
		const soknad: Soknad = yield call(
			fetchToJson,
			`soknader/${action.brukerBehandlingId}`,
			null
		);
		const fakta = updateFaktaMedLagretVerdi(soknad.fakta);
		yield put(setFakta(fakta));
		yield put(hentetSoknad(soknad));
		return soknad;
	} catch (reason) {
		yield put(hentSoknadFeilet(reason));
	}
}

function* startSoknadSaga(action: StartSoknadAction): SagaIterator {
	const id = yield call(opprettSoknadSaga);
	const hentAction = { brukerBehandlingId: id } as HentSoknadAction;
	const soknad = yield call(hentSoknadSaga, hentAction);
	yield call(
		lagreFaktum,
		oppdaterFaktumMedVerdier(
			finnFaktum("personalia.kommune", soknad.fakta),
			action.kommune
		)
	);
	if (action.bydel) {
		yield call(
			lagreFaktum,
			oppdaterFaktumMedVerdier(
				finnFaktum("personalia.bydel", soknad.fakta),
				action.kommune
			)
		);
	}
	yield put(tilSteg(1));
}

function* slettSoknadSaga(action: SlettSoknadAction): SagaIterator {
	try {
		yield call(fetchDelete, "soknader/" + action.brukerBehandlingId);
		yield put(slettSoknadOk());
		yield put(navigerTilDittNav());
	} catch (reason) {
		yield put(slettSoknadFeilet(reason));
		yield put(setApplikasjonsfeil({ tittel: "", innhold: "" }));
		// yield put(setApplikasjonsfeil, )
		// 		this.props.dispatch(
		// 			setApplikasjonsfeil({
		// 				tittel: this.props.intl.formatMessage({
		// 					id: "sendsoknadfeilet.tittel"
		// 				}),
		// 				innhold: this.props.intl.formatMessage({
		// 					id: "sendsoknadfeilet.melding"
		// 				})
		// 			})
		// 		);
	}
}

function* sendSoknadSaga(action: SendSoknadAction): SagaIterator {
	try {
		yield call(
			fetchPost,
			`soknader/${action.brukerBehandlingId}/actions/send`,
			JSON.stringify({ behandlingsId: action.brukerBehandlingId })
		);
		yield put(sendSoknadOk(action.brukerBehandlingId));
		yield put(navigerTilKvittering(action.brukerBehandlingId));
	} catch (reason) {
		yield put(sendSoknadFeilet(reason));
	}
}

function* hentKvitteringSaga(action: HentKvitteringAction): SagaIterator {
	try {
		const kvittering = yield call(
			fetchKvittering,
			"soknader/" + action.brukerBehandlingId + "?sprak=nb_NO"
		);
		yield put(hentKvitteringOk(kvittering));
	} catch (reason) {
		yield put(hentKvitteringFeilet(reason));
	}
}

// this.props.dispatch(sendSoknad(brukerBehandlingId)).then(
// 	() => {
// 		this.props.history.push(`/kvittering/${brukerBehandlingId}`);
// 	},
// 	response => {
// 		this.props.dispatch(
// 			setApplikasjonsfeil({
// 				tittel: this.props.intl.formatMessage({
// 					id: "sendsoknadfeilet.tittel"
// 				}),
// 				innhold: this.props.intl.formatMessage({
// 					id: "sendsoknadfeilet.melding"
// 				})
// 			})
// 		);
// 	}
// );

function* soknadSaga(): SagaIterator {
	yield takeEvery(SoknadActionTypeKeys.START_SOKNAD, startSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.OPPRETT_SOKNAD, opprettSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.HENT_SOKNAD, hentSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.SLETT_SOKNAD, slettSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.SEND_SOKNAD, sendSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.HENT_KVITTERING, hentKvitteringSaga);
}

export default soknadSaga;
