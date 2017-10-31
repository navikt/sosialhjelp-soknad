import { takeEvery, call, select, put } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { SynligeFaktaActionTypeKeys } from "./synligeFaktaTypes";
import { fetchToJson } from "../../../nav-soknad/utils/rest-utils";
import { selectBrukerBehandlingId } from "../../../nav-soknad/redux/selectors";
import { hentSynligeFaktaFeilet, hentSynligeFaktaOk } from "./synligeFaktaActions";

function* hentSynligeFaktaSaga(): SagaIterator {
	try {
		const behandlingsId = yield select(selectBrukerBehandlingId);
		const struktur = yield call(
			fetchToJson,
			`soknader/${behandlingsId}/synligsoknadstruktur?panelFilter=opplysningerBolk`
		);
		yield put(hentSynligeFaktaOk(struktur));
	} catch ( reason) {
		yield put(hentSynligeFaktaFeilet(reason));
	}
}

function* synligeFaktaSaga(): SagaIterator {
	yield takeEvery(SynligeFaktaActionTypeKeys.HENT_SYNLIGE, hentSynligeFaktaSaga);
}

export default synligeFaktaSaga;
