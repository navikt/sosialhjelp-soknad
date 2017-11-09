import { SagaIterator } from "redux-saga";
import { call, put, takeEvery, select } from "redux-saga/effects";
import {
	fetchPost,
	fetchToJson,
	fetchDelete,
	fetchKvittering
} from "../../utils/rest-utils";
import {
	finnFaktum,
	oppdaterFaktumMedVerdier,
	oppdaterFaktumMedProperties
} from "../../utils";
import { updateFaktaMedLagretVerdi } from "../fakta/faktaUtils";
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
	navigerTilKvittering,
	navigerTilServerfeil
} from "../navigasjon/navigasjonActions";
import { lagreFaktum, setFakta, resetFakta } from "../fakta/faktaActions";
import { Soknad, Faktum, Infofaktum } from "../../types";
import { SoknadAppState } from "../reduxTypes";

import {
	opprettSoknadOk,
	opprettSoknadFeilet,
	hentSoknadOk,
	hentSoknadFeilet,
	slettSoknadOk,
	slettSoknadFeilet,
	hentKvitteringOk,
	hentKvitteringFeilet,
	sendSoknadOk,
	sendSoknadFeilet,
	resetSoknad,
	startSoknadOk
} from "./soknadActions";

export const SKJEMAID = "NAV 35-18.01";

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
		yield put(hentSoknadOk(soknad));
		return soknad;
	} catch (reason) {
		yield put(hentSoknadFeilet(reason));
	}
}

function* startSoknadSaga(action: StartSoknadAction): SagaIterator {
	try {
		yield put(resetSoknad());
		yield put(resetFakta());
		const id = yield call(opprettSoknadSaga);
		const hentAction = { brukerBehandlingId: id } as HentSoknadAction;
		const soknad = yield call(hentSoknadSaga, hentAction);
		yield put(
			lagreFaktum(
				oppdaterFaktumMedVerdier(
					finnFaktum("personalia.kommune", soknad.fakta),
					action.kommune
				)
			)
		);
		if (action.bydel) {
			yield put(
				lagreFaktum(
					oppdaterFaktumMedVerdier(
						finnFaktum("personalia.bydel", soknad.fakta),
						action.bydel
					)
				)
			);
		}
		yield put(startSoknadOk());
		yield put(tilSteg(1));
	} catch (reason) {
		yield put(navigerTilServerfeil());
	}
}

function* slettSoknadSaga(action: SlettSoknadAction): SagaIterator {
	try {
		yield call(fetchDelete, "soknader/" + action.brukerBehandlingId);
		yield put(slettSoknadOk());
		yield put(navigerTilDittNav());
	} catch (reason) {
		yield put(slettSoknadFeilet(reason));
	}
}

function* sendSoknadSaga(action: SendSoknadAction): SagaIterator {
	try {
		const infofaktum: Infofaktum = yield select(
			(state: SoknadAppState) => state.soknad.infofaktum
		);
		const fakta: Faktum[] = yield select(
			(state: SoknadAppState) => state.fakta.data
		);
		yield put(
			lagreFaktum(
				oppdaterFaktumMedProperties(
					finnFaktum(infofaktum.faktumKey, fakta),
					infofaktum.properties
				)
			)
		);
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

export {
	opprettSoknadSaga,
	hentSoknadSaga,
	startSoknadSaga,
	sendSoknadSaga,
	hentKvitteringSaga,
	slettSoknadSaga
};

function* soknadSaga(): SagaIterator {
	yield takeEvery(SoknadActionTypeKeys.START_SOKNAD, startSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.OPPRETT_SOKNAD, opprettSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.HENT_SOKNAD, hentSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.SLETT_SOKNAD, slettSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.SEND_SOKNAD, sendSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.HENT_KVITTERING, hentKvitteringSaga);
}

export default soknadSaga;
