import { SagaIterator } from "redux-saga";
import { call } from "redux-saga/effects";

import { fetchPost } from "../../utils/rest-utils";

export interface OpprettSoknadResponse {
	brukerBehandlingId: string;
}

function* opprettSoknadSaga(): SagaIterator {
	const response: OpprettSoknadResponse = yield call(
		fetchPost,
		"soknader",
		null
	);
}

function* hentSoknadSaga(): SagaIterator {}

function* soknadSaga(): SagaIterator {}

function avbrytSoknadSaga(): SagaIterator {}

export { opprettSoknadSaga, hentSoknadSaga, avbrytSoknadSaga };

export default soknadSaga;
