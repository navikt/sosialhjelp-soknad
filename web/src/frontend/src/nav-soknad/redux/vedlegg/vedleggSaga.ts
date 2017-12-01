import { call, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { fetchToJson, fetchUpload } from "../../../nav-soknad/utils/rest-utils";
import { HentFilListeAction, LastOppVedleggAction, VedleggActionTypeKeys } from "./vedleggTypes";
import {
	hentVedleggsForventningOk,
	hentVedleggsForventningFeilet,
	hentFilListeOk,
	lastOppVedleggPending,
	lastOppVedleggOk, lastOppVedleggFeilet, // hentFilListe
} from "./vedleggActions";
import { loggFeil } from "../../../nav-soknad/redux/navlogger/navloggerActions";
import { selectBrukerBehandlingId, selectFaktaData } from "../selectors";
// import { Faktum } from "../../types/navSoknadTypes";

function* hentVedleggsForventningSaga(): SagaIterator {
	try {
		const behandlingsId = yield select(selectBrukerBehandlingId);
		const url = `soknader/${behandlingsId}/vedlegg`;
		yield call(fetchToJson, url);
		const response = yield call(fetchToJson, url);
		const fakta = yield select(selectFaktaData);
		yield put(hentVedleggsForventningOk(response, fakta));
		// let vedleggListe: any = [];
		// response.map( (forventning: any) => {
		// 	fakta.map( (faktum: Faktum) => {
		// 		// console.warn();
		// 		if (faktum.faktumId.toString(10) === forventning.faktumId.toString()) {
		// 			// console.warn("==> vedleggId: " + forventning.vedleggId);
		// 			// console.warn("===> faktumKey: " + faktum.key);
		// 			yield put(hentFilListe(faktum.key, forventning.vedleggId));
		// 		}
		// 	});
		// 	// console.dir(fakta);
		// });

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
	} catch (reason) {
		yield put(lastOppVedleggFeilet(action.faktumKey, action.vedleggId, reason.toString()));
	}
}

function* hentFilListeSaga(action: HentFilListeAction): SagaIterator {
	try {
		const behandlingsId = yield select(selectBrukerBehandlingId);
		const url = `vedlegg/${action.vedleggId}/fil?behandlingsId=${behandlingsId}`;
		const response = yield call(fetchToJson, url);
		yield put(hentFilListeOk(action.faktumKey, response));
	} catch (reason) {
		// TODO put(hentVedleggListeFeilet
		yield put(
			loggFeil("Problemer med å hente liste med filer i vedlegg: " + reason.toString())
		);
	}
}

function* vedleggSaga(): SagaIterator {
	yield takeEvery(VedleggActionTypeKeys.LASTOPP, lastOppVedleggSaga);
	yield takeEvery(VedleggActionTypeKeys.HENT_FIL_LISTE, hentFilListeSaga);
	yield takeEvery(VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING, hentVedleggsForventningSaga);
}

export default vedleggSaga;
