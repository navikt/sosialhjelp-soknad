import { call, takeEvery, put, select } from "redux-saga/effects";
import { FaktumActionTypeKeys } from "./faktaActionTypes";
import { fetchDelete, fetchPost, fetchPut } from "../../utils/rest-utils";
import { prepFaktumForLagring } from "./faktaUtils";
import { SagaIterator } from "redux-saga";
import { SoknadState } from "../reduxTypes";
import {
	LagreFaktum,
	OpprettFaktum,
	SlettFaktum
} from "./faktaTypes";
import {
	lagreFaktumFeilet,
	lagretFaktum,
	opprettetFaktum,
	opprettFaktumFeilet,
	slettetFaktum,
	slettFaktumFeilet
} from "./faktaActions";
import { navigerTilServerfeil } from "../navigasjon/navigasjonActions";

function selectBrukerBehandlingId(state: { soknad: SoknadState }) {
	return state.soknad.data.brukerBehandlingId;
}

function* lagreFaktumSaga(action: LagreFaktum ): SagaIterator {
	try {
		const response = yield call( fetchPut, `fakta/${action.faktum.faktumId}`, prepFaktumForLagring(action.faktum));
		yield put( lagretFaktum(response) );
	} catch (reason) {
		yield put(lagreFaktumFeilet(reason));
	}
}

function* opprettFaktumSaga(action: OpprettFaktum ): SagaIterator {
	try {
		const brukerBehandlingId = yield select( selectBrukerBehandlingId );
		const response = yield call(fetchPost, `fakta?behandlingsId=${brukerBehandlingId}`, JSON.stringify(action.faktum));
		yield put(opprettetFaktum(response));
	} catch (reason) {
		yield put(opprettFaktumFeilet(reason));
	}
}

function* slettFaktumSaga(action: SlettFaktum): SagaIterator {
	try {
		yield call(fetchDelete, `fakta/${action.faktumId}`);
		yield put(slettetFaktum());
	} catch (reason) {
		yield put(slettFaktumFeilet(reason));
	}
}

function* feiletFaktumSaga(): SagaIterator {
	yield put(navigerTilServerfeil());
}

function* faktaSaga(): SagaIterator {
	yield takeEvery(FaktumActionTypeKeys.LAGRE_FAKTUM, lagreFaktumSaga);
	yield takeEvery(FaktumActionTypeKeys.OPPRETT_FAKTUM, opprettFaktumSaga);
	yield takeEvery(FaktumActionTypeKeys.SLETT_FAKTUM, slettFaktumSaga);
	yield takeEvery(FaktumActionTypeKeys.FEILET, feiletFaktumSaga);
}

export {
	lagreFaktumSaga,
	opprettFaktumSaga,
	slettFaktumSaga,
	feiletFaktumSaga,
	selectBrukerBehandlingId
};

export default faktaSaga;
