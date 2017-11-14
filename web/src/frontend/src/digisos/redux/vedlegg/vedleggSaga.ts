import { takeEvery, call, select, put } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { fetchToJson } from "../../../nav-soknad/utils/rest-utils";
import { selectBrukerBehandlingId } from "../../../nav-soknad/redux/selectors";
import { VedleggsforventingActionTypeKeys } from "./vedleggTypes";
import { hentVedleggsForventningFeilet, hentVedleggsForventningOk } from "./vedleggActions";

function* hentVedleggsForventningSaga(): SagaIterator {
	try {
		const behandlingsId = yield select(selectBrukerBehandlingId);
		const struktur = yield call(
			fetchToJson,
			`soknader/${behandlingsId}/vedlegg`
		);
		yield put(hentVedleggsForventningOk(struktur));
	} catch ( reason) {
		yield put(hentVedleggsForventningFeilet(reason));
	}
}

function* vedleggsForventningSaga(): SagaIterator {
	yield takeEvery(VedleggsforventingActionTypeKeys.HENT_VEDLEGG, hentVedleggsForventningSaga);
}

export default vedleggsForventningSaga;
