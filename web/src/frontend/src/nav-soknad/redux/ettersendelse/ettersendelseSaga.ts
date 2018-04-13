import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";

import { fetchDelete, fetchToJson, fetchUpload, toJson } from "../../utils/rest-utils";
import {
	EttersendelseActionTypeKeys, LastOppEttersendtVedleggAction,
	LesEttersendelsesVedleggAction, SlettEttersendtVedleggAction
} from "./ettersendelseTypes";
import { lastOppEttersendtVedleggOk, lesEttersendteVedlegg } from "./ettersendelseActions";
import { loggFeil } from "../navlogger/navloggerActions";
import { navigerTilServerfeil } from "../navigasjon/navigasjonActions";

function* lesEttersendelsesVedleggSaga(action: LesEttersendelsesVedleggAction): SagaIterator {
	try {
		const url = `sendsoknad/ettersendelsevedlegg/${action.brukerbehandlingId}`;
		const response = yield call(fetchToJson, url);
		if (response) {
			yield put(lesEttersendteVedlegg(response));
		}
	} catch (reason) {
		yield put(loggFeil("Lese ettersendte vedlegg feilet: " + reason.toString()));
		yield put(navigerTilServerfeil());
	}
}

function* slettEttersendelsesVedleggSaga(action: SlettEttersendtVedleggAction): SagaIterator {
	try {
		const url = `sendsoknad/ettersendelsevedlegg/vedlegg/${action.vedleggId}?filId=${action.filId}`;
		const promise = yield call(fetchDelete, url);
		const response = yield call(toJson, promise);
		if (response) {
			yield put(lesEttersendteVedlegg(response));
		}
	} catch (reason) {
		yield put(loggFeil("Slett ettersendt vedlegg feilet: " + reason));
		yield put(navigerTilServerfeil());
	}
}

function* lastOppEttersendelsesVedleggSaga(action: LastOppEttersendtVedleggAction): SagaIterator {
	try {
		const url = `sendsoknad/ettersendelsevedlegg/vedlegg/${action.vedleggId}`;
		const response: any = yield call(fetchUpload, url, action.formData);
		yield put(lastOppEttersendtVedleggOk());
		if (response) {
			yield put(lesEttersendteVedlegg(response));
		}
	} catch (reason) {
		yield put(loggFeil("Last opp vedlegg for ettersendelse feilet: " + reason.toString()));
		yield put(navigerTilServerfeil());
	}
}

function* ettersendelseSaga(): SagaIterator {
	yield takeEvery(EttersendelseActionTypeKeys.LAST_OPP, lastOppEttersendelsesVedleggSaga);
	yield takeEvery(EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG, lesEttersendelsesVedleggSaga);
	yield takeEvery(EttersendelseActionTypeKeys.SLETT_VEDLEGG, slettEttersendelsesVedleggSaga);
}

export default ettersendelseSaga;
