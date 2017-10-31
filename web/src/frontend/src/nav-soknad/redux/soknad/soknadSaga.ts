import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchPost, fetchToJson } from "../../utils/rest-utils";
import { finnFaktum, oppdaterFaktumMedVerdier } from "../../utils";
import { updateFaktaMedLagretVerdi } from "../fakta/faktaUtils";

import {
	SoknadActionTypeKeys,
	HentSoknadAction,
	StartSoknadAction
} from "./soknadActionTypes";
import { tilSteg } from "../navigasjon/navigasjonActions";
import { lagreFaktum, setFakta } from "../fakta/faktaActions";
import { Soknad } from "../../types";

import {
	opprettSoknadOk,
	hentetSoknad
	// hentSoknadFeilet
} from "./soknadActions";

const SKJEMAID = "NAV 35-18.01";

export interface OpprettSoknadResponse {
	brukerBehandlingId: string;
}

function* opprettSoknadSaga(): SagaIterator {
	const response: OpprettSoknadResponse = yield call(
		fetchPost,
		"soknader",
		JSON.stringify({ soknadType: SKJEMAID })
	);
	yield put(opprettSoknadOk(response.brukerBehandlingId));
	return response.brukerBehandlingId;
}

function* hentSoknadSaga(action: HentSoknadAction): SagaIterator {
	const soknad: Soknad = yield call(
		fetchToJson,
		`soknader/${action.brukerBehandlingId}`,
		null
	);
	const fakta = updateFaktaMedLagretVerdi(soknad.fakta);
	yield put(setFakta(fakta));
	yield put(hentetSoknad(soknad));
	return soknad;
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

export { startSoknadSaga, opprettSoknadSaga, hentSoknadSaga };

function* soknadSaga(): SagaIterator {
	yield takeEvery(SoknadActionTypeKeys.START_SOKNAD, startSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.OPPRETT_SOKNAD, opprettSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.HENT_SOKNAD, hentSoknadSaga);
}

export default soknadSaga;
