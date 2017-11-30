import { call, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { fetchToJson, fetchUpload } from "../../../nav-soknad/utils/rest-utils";
import { HentVedleggListeAction, LastOppVedleggAction, VedleggActionTypeKeys } from "./vedleggTypes";
import {
	hentVedleggsForventningOk,
	hentVedleggsForventningFeilet,
	mottattVedleggListe,
	lastOppVedleggPending,
	lastOppVedleggOk, lastOppVedleggFeilet
} from "./vedleggActions";
import { loggFeil } from "../../../nav-soknad/redux/navlogger/navloggerActions";
import { selectBrukerBehandlingId, selectFaktaData } from "../selectors";

function* lastOppVedleggSaga(action: LastOppVedleggAction): SagaIterator {
	try {
		yield put(lastOppVedleggPending(action.faktumKey, action.vedleggId));
		const behandlingsId = yield select(selectBrukerBehandlingId);
		const { vedleggId } = {vedleggId: action.vedleggId};
		const url = `vedlegg/${vedleggId}/fil?behandlingsId=${behandlingsId}`;
		yield call(fetchUpload, url, action.formData);
		yield put(lastOppVedleggOk(action.faktumKey, action.vedleggId));
	} catch (reason) {
		yield put(lastOppVedleggFeilet(action.faktumKey, action.vedleggId, reason.toString()));
	}
}

function* hentVedleggListeSaga(action: HentVedleggListeAction): SagaIterator {
	try {
		const behandlingsId = yield select(selectBrukerBehandlingId);
		const url = `vedlegg/${action.vedleggId}/fil?behandlingsId=${behandlingsId}`;
		const response = yield call(fetchToJson, url);
		yield put(mottattVedleggListe(response));
	} catch (reason) {
		yield put(
			loggFeil("Problemer med å hente liste med filer i vedlegg: " + reason.toString())
		);
	}
}

function* hentVedleggsForventningSaga(): SagaIterator {
	try {
		const behandlingsId = yield select(selectBrukerBehandlingId);
		const url = `soknader/${behandlingsId}/vedlegg`;
		yield call(fetchToJson, url);
		const response = yield call(fetchToJson, url);
		const fakta = yield select(selectFaktaData);
		yield put(hentVedleggsForventningOk(response, fakta));
	} catch ( reason) {
		yield put(hentVedleggsForventningFeilet(reason));
	}
}

function* vedleggSaga(): SagaIterator {
	yield takeEvery(VedleggActionTypeKeys.LASTOPP, lastOppVedleggSaga);
	yield takeEvery(VedleggActionTypeKeys.HENT_VEDLEGG_LISTE, hentVedleggListeSaga);
	yield takeEvery(VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING, hentVedleggsForventningSaga);
}

export default vedleggSaga;
