import { call, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
	detekterInternFeilKode,
	fetchDelete, fetchPut, fetchToJson, fetchUpload, fetchUploadIgnoreErrors,
	toJson
} from "../../utils/rest-utils";
import {
	LastOppVedleggAction, StartSlettVedleggAction,
	VedleggActionTypeKeys, VedleggAlleredeSendtAction
} from "./vedleggTypes";
import {
	hentVedleggsForventningOk, lastOppVedleggFeilet, lastOppVedleggOk, nyttVedlegg,
	oppdatertVedlegg, slettVedlegg, slettVedleggOk, vedleggAlleredeSendtOk
} from "./vedleggActions";
import {loggAdvarsel, loggFeil} from "../navlogger/navloggerActions";
import { selectFaktaData } from "../selectors";
import { opprettetFaktum, slettFaktumLokalt } from "../fakta/faktaActions";
import { navigerTilServerfeil } from "../navigasjon/navigasjonActions";

function* hentVedleggsForventningSaga(behandlingsId: string): SagaIterator {
	const url = `soknader/${behandlingsId}/vedlegg`;
	const response = yield call(fetchToJson, url);
	const fakta = yield select(selectFaktaData);
	// @ts-ignore
	yield put(hentVedleggsForventningOk(response, fakta));
}

function* lastOppVedleggSaga(action: LastOppVedleggAction): SagaIterator {
	const url = `sosialhjelpvedlegg/originalfil/${action.belopFaktumId}`;
	let response: any = "";
	try {
		response = yield call(fetchUpload, url, action.formData);
		yield put(lastOppVedleggOk());

		if (response.nyForventning) {
			yield put(opprettetFaktum(response.faktum));
			const fakta = yield select(selectFaktaData);
			if (typeof fakta != "undefined") {
				yield put(nyttVedlegg(response.vedlegg, fakta));
			}
		} else {
			const fakta = yield select(selectFaktaData);
			if (typeof fakta != "undefined") {
				yield put(oppdatertVedlegg(response.vedlegg, fakta));
			}
		}
	} catch (reason) {
		let feilKode: string = detekterInternFeilKode(reason.toString());

		// Kjør feilet kall på nytt for å få tilgang til feilmelding i JSON data:
		response = yield call(fetchUploadIgnoreErrors, url, action.formData);
		const ID = "id";
		if (response && response[ID]) {
			feilKode = response[ID];
		}
		yield put(lastOppVedleggFeilet(action.belopFaktumId, feilKode));
		if (feilKode !== "opplasting.feilmelding.feiltype") {
			yield put(loggAdvarsel("Last opp vedlegg feilet: " + reason.toString()));
		}
	}
}

function* slettVedleggSaga(action: StartSlettVedleggAction): SagaIterator {
	try {
		const promise = yield call(fetchDelete, `sosialhjelpvedlegg/${action.vedleggId}`);
		// @ts-ignore
		const vedlegg = yield call(toJson, promise);

		if (vedlegg) {
			const fakta = yield select(selectFaktaData);
			if (typeof fakta != "undefined") {
				yield put(oppdatertVedlegg(vedlegg, fakta));
			}
		} else {
			yield put(slettVedlegg(action.vedleggId));
			yield put(slettFaktumLokalt(action.vedleggsFaktumId));
		}
		yield put(slettVedleggOk());
	} catch (reason) {
		yield put(loggFeil("Slett vedlegg feilet: " + reason));
		yield put(navigerTilServerfeil());
	}
}

function* vedleggAlleredeSendt(action: VedleggAlleredeSendtAction): SagaIterator {
	try {
		const url = `vedlegg/${action.vedlegg[0].vedleggId}`;
		yield call(fetchPut, url, JSON.stringify(action.vedlegg[0]));
		yield put(vedleggAlleredeSendtOk(action.vedlegg));
	} catch (reason) {
		yield put(loggFeil("Oppdatering vedleggstatus feilet: " + reason));
		yield put(navigerTilServerfeil());
	}
}

function* vedleggSaga(): SagaIterator {
	yield takeEvery(VedleggActionTypeKeys.LAST_OPP, lastOppVedleggSaga);
	yield takeEvery(VedleggActionTypeKeys.START_SLETT_VEDLEGG, slettVedleggSaga);
	yield takeEvery(VedleggActionTypeKeys.VEDLEGG_ALLEREDE_SENDT, vedleggAlleredeSendt);
}

export {
	hentVedleggsForventningSaga
};

export default vedleggSaga;
