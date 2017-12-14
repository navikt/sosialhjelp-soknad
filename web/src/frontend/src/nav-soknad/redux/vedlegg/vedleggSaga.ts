import { call, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { fetchDelete, fetchToJson, fetchUpload } from "../../../nav-soknad/utils/rest-utils";
import { LastOppVedleggAction, SlettFilAction, VedleggActionTypeKeys } from "./vedleggTypes";
import { hentVedleggsForventningOk, lastOppVedleggFeilet, lastOppVedleggOk, slettFilOk } from "./vedleggActions";
import { loggFeil } from "../../../nav-soknad/redux/navlogger/navloggerActions";
import { selectBrukerBehandlingId, selectFaktaData } from "../selectors";

function* hentVedleggsForventningSaga(behandlingsId: string): SagaIterator {
	const url = `soknader/${behandlingsId}/vedlegg`;
	const response = yield call(fetchToJson, url);
	const fakta = yield select(selectFaktaData);
	yield put(hentVedleggsForventningOk(response, fakta));
}

function* lastOppVedleggSaga(action: LastOppVedleggAction): SagaIterator {
	try {
		const behandlingsId = yield select(selectBrukerBehandlingId);
		const url = `vedlegg/${action.vedleggId}/fil?behandlingsId=${behandlingsId}`;
		yield call(fetchUpload, url, action.formData);
		yield put(lastOppVedleggOk(action.faktumKey, action.vedleggId));
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
	} catch (reason) {
		yield put(loggFeil("TODO implementer put(slettFilFeilet(faktumKey, vedleggId, reason"));
	}
}

function* vedleggSaga(): SagaIterator {
	yield takeEvery(VedleggActionTypeKeys.LAST_OPP, lastOppVedleggSaga);
	yield takeEvery(VedleggActionTypeKeys.SLETT_FIL, slettVedleggFilSaga);
}

export {
	hentVedleggsForventningSaga
};

export default vedleggSaga;
