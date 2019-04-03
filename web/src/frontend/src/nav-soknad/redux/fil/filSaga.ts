import {FilActionTypeKeys, LastOppFilAction} from "./filTypes";
import {SagaIterator} from "redux-saga";
import {fetchUpload} from "../../utils/rest-utils";
import { call, takeEvery } from "redux-saga/effects";



function* lastOppFilSaga(action: LastOppFilAction): SagaIterator {
	const url = `opplastetVedlegg/${action.behandlingsId}/${action.opplysningType}`;

	let response: any = "";
	try {
		debugger;
		response = yield call(fetchUpload, url, action.formData);

		console.warn("OPPLASTING OK! reponse: " + response);

		// yield put(lastOppVedleggOk());
		// if (response.nyForventning) {
		// 	yield put(opprettetFaktum(response.faktum));
		// 	const fakta = yield select(selectFaktaData);
		// 	yield put(nyttVedlegg(response.vedlegg, fakta));
		// } else {
		// 	const fakta = yield select(selectFaktaData);
		// 	yield put(oppdatertVedlegg(response.vedlegg, fakta));
		// }
	} catch (reason) {
		// let feilKode: string = detekterInternFeilKode(reason.toString());
		//
		// // Kjør feilet kall på nytt for å få tilgang til feilmelding i JSON data:
		// response = yield call(fetchUploadIgnoreErrors, url, action.formData);
		// const ID = "id";
		// if (response && response[ID]) {
		// 	feilKode = response[ID];
		// }
		// yield put(lastOppVedleggFeilet(action.belopFaktumId, feilKode));
		// if (feilKode !== "opplasting.feilmelding.feiltype") {
		// 	yield put(loggFeil("Last opp vedlegg feilet: " + reason.toString()));
		// }
		console.warn("FEIL VED OPPLASTING");
	}
}
//
// function* slettVedleggSaga(action: StartSlettVedleggAction): SagaIterator {
// 	try {
// 		const promise = yield call(fetchDelete, `sosialhjelpvedlegg/${action.vedleggId}`);
// 		const vedlegg = yield call(toJson, promise);
//
// 		if (vedlegg) {
// 			const fakta = yield select(selectFaktaData);
// 			yield put(oppdatertVedlegg(vedlegg, fakta));
// 		} else {
// 			yield put(slettVedlegg(action.vedleggId));
// 			yield put(slettFaktumLokalt(action.vedleggsFaktumId));
// 		}
// 		yield put(slettVedleggOk());
// 	} catch (reason) {
// 		yield put(loggFeil("Slett vedlegg feilet: " + reason));
// 		yield put(navigerTilServerfeil());
// 	}
// }
//
// function* vedleggAlleredeSendt(action: VedleggAlleredeSendtAction): SagaIterator {
// 	try {
// 		const url = `vedlegg/${action.vedlegg[0].vedleggId}`;
// 		yield call(fetchPut, url, JSON.stringify(action.vedlegg[0]));
// 		yield put(vedleggAlleredeSendtOk(action.vedlegg));
// 	} catch (reason) {
// 		yield put(loggFeil("Oppdatering vedleggstatus feilet: " + reason));
// 		yield put(navigerTilServerfeil());
// 	}
// }
//
function* filSaga(): SagaIterator {
	yield takeEvery(FilActionTypeKeys.LAST_OPP, lastOppFilSaga);
	// yield takeEvery(VedleggActionTypeKeys.START_SLETT_VEDLEGG, slettVedleggSaga);
	// yield takeEvery(VedleggActionTypeKeys.VEDLEGG_ALLEREDE_SENDT, vedleggAlleredeSendt);
}
//
// export {
// 	hentVedleggsForventningSaga
// };

export default filSaga;
