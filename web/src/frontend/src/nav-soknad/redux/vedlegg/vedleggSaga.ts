import { call, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { fetchToJson, fetchUpload, fetchDelete } from "../../../nav-soknad/utils/rest-utils";
import { HentFilListeAction, LastOppVedleggAction, SlettFilAction, VedleggActionTypeKeys } from "./vedleggTypes";
import {
	hentVedleggsForventningOk,
	hentVedleggsForventningFeilet,
	hentFilListeOk,
	lastOppVedleggPending,
	lastOppVedleggOk,
	lastOppVedleggFeilet,
	slettFilOk,
	hentFilListe
} from "./vedleggActions";
import { loggFeil } from "../../../nav-soknad/redux/navlogger/navloggerActions";
import { selectBrukerBehandlingId, selectFaktaData } from "../selectors";

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

function* lastOppVedleggSaga(action: LastOppVedleggAction): SagaIterator {
	try {
		yield put(lastOppVedleggPending(action.faktumKey, action.vedleggId));
		const behandlingsId = yield select(selectBrukerBehandlingId);
		const url = `vedlegg/${action.vedleggId}/fil?behandlingsId=${behandlingsId}`;
		yield call(fetchUpload, url, action.formData);
		yield put(lastOppVedleggOk(action.faktumKey, action.vedleggId));
		yield put(hentFilListe(action.faktumKey, action.vedleggId));
	} catch (reason) {
		yield put(lastOppVedleggFeilet(action.faktumKey, action.vedleggId, reason.toString()));
	}
}

function* slettVedleggFilSaga(action: SlettFilAction): SagaIterator {
	try {
		const behandlingsId = yield select(selectBrukerBehandlingId);
		const url = `vedlegg/${action.vedleggId}/${action.filNavn}?behandlingsId=${behandlingsId}`;
		yield call(fetchDelete, url);
		yield put(slettFilOk(action.faktumKey, action.vedleggId, action.filNavn));
		yield put(hentFilListe(action.faktumKey, action.vedleggId));
	} catch (reason) {
		yield put(loggFeil("TODO SlettFilFiletAction"));
	}
}

function* hentFilListeSaga(action: HentFilListeAction): SagaIterator {
	try {
		const behandlingsId = yield select(selectBrukerBehandlingId);
		const url = `vedlegg/${action.vedleggId}/fil?behandlingsId=${behandlingsId}`;
		const response = yield call(fetchToJson, url);
		yield put(hentFilListeOk(action.faktumKey, response));
	} catch (reason) {
		// TODO put(hentFilListeFeilet
		yield put(
			loggFeil("Problemer med å hente liste med filer i vedlegg: " + reason.toString())
		);
	}
}

function* vedleggSaga(): SagaIterator {
	yield takeEvery(VedleggActionTypeKeys.LAST_OPP, lastOppVedleggSaga);
	yield takeEvery(VedleggActionTypeKeys.SLETT_FIL, slettVedleggFilSaga);
	yield takeEvery(VedleggActionTypeKeys.HENT_FIL_LISTE, hentFilListeSaga);
	yield takeEvery(VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING, hentVedleggsForventningSaga);
}

export default vedleggSaga;
