import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";

import { fetchDelete, fetchToJson, fetchPost, fetchUpload, toJson } from "../../utils/rest-utils";
import {
	EttersendelseActionTypeKeys, LagEttersendelseAction,
	LastOppEttersendtVedleggAction, LesEttersendelsesVedleggAction,
	SlettEttersendtVedleggAction, SendEttersendelseAction, LesEttersendelserAction
} from "./ettersendelseTypes";
import {
	lesEttersendelsesVedlegg, lastOppEttersendtVedleggOk,
	lesEttersendteVedlegg, lagEttersendelseOk, settEttersendelser
} from "./ettersendelseActions";
import { loggFeil } from "../navlogger/navloggerActions";
import { navigerTilServerfeil } from "../navigasjon/navigasjonActions";

function* lagEttersendelseSaga(action: LagEttersendelseAction): SagaIterator {
	try {
		const url = `soknader?ettersendTil=${action.brukerbehandlingId}`;
		const response = yield call(fetchPost, url, {});
		if (response) {
			yield put(lagEttersendelseOk(response.brukerBehandlingId));
			yield put(lesEttersendelsesVedlegg(response.brukerBehandlingId));
		}
	} catch (reason) {
		yield put(loggFeil("Lag ettersendelse feilet: " + reason.toString()));
		yield put(navigerTilServerfeil());
	}
}

function* lesEttersendelserSaga(action: LesEttersendelserAction): SagaIterator {
	try {
		const url = `ettersendelsevedlegg/innsendte/${action.brukerbehandlingId}`;
		const response = yield call(fetchToJson, url);
		if (response) {
			yield put(settEttersendelser(response));
		}
	} catch (reason) {
		yield put(loggFeil("Les ettersendelser feilet: " + reason.toString()));
		yield put(navigerTilServerfeil());
	}
}

function* lesEttersendelsesVedleggSaga(action: LesEttersendelsesVedleggAction): SagaIterator {
	try {
		const url = `ettersendelsevedlegg/${action.brukerbehandlingId}`;
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
		const url = `ettersendelsevedlegg/vedlegg/${action.vedleggId}?filId=${action.filId}`;
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
		const url = `ettersendelsevedlegg/vedlegg/${action.vedleggId}`;
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

function* sendEttersendelseSaga(action: SendEttersendelseAction): SagaIterator {
	try {
		yield put({type: EttersendelseActionTypeKeys.SEND_PENDING});
		const url = `soknader/${action.brukerbehandlingId}/actions/send`;
		yield call(fetchPost, url, {});
		yield put({type: EttersendelseActionTypeKeys.SEND_OK});
	} catch (reason) {
		yield put(loggFeil("Send ettersendelse feilet: " + reason.toString()));
		yield put(navigerTilServerfeil());
	}
}

function* ettersendelseSaga(): SagaIterator {
	yield takeEvery(EttersendelseActionTypeKeys.NY, lagEttersendelseSaga);
	yield takeEvery(EttersendelseActionTypeKeys.LAST_OPP, lastOppEttersendelsesVedleggSaga);
	yield takeEvery(EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG, lesEttersendelsesVedleggSaga);
	yield takeEvery(EttersendelseActionTypeKeys.SLETT_VEDLEGG, slettEttersendelsesVedleggSaga);
	yield takeEvery(EttersendelseActionTypeKeys.SEND, sendEttersendelseSaga);

	yield takeEvery(EttersendelseActionTypeKeys.LES_ETTERSENDELSER, lesEttersendelserSaga);
}

export default ettersendelseSaga;
