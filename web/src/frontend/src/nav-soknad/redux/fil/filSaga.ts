import {FilActionTypeKeys, LastOppFilAction, StartSlettFilAction} from "./filTypes";
import {SagaIterator} from "redux-saga";
import {
    fetchDelete,
    fetchUpload,
    toJson
} from "../../utils/rest-utils";
import {call, put, takeEvery} from "redux-saga/effects";
import {lastOppVedleggOk, slettVedleggOk} from "../vedlegg/vedleggActions";
import {loggFeil} from "../navlogger/navloggerActions";



function* lastOppFilSaga(action: LastOppFilAction): SagaIterator {
	const url = `opplastetVedlegg/${action.behandlingsId}/${action.opplysningType}`;

	let response: any = "";
	try {
		response = yield call(fetchUpload, url, action.formData);
		console.warn("FetcbUpload ok. Response: " + response);
		yield put(lastOppVedleggOk());
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
		// // yield put(lastOppVedleggFeilet(action.belopFaktumId, feilKode));
		// if (feilKode !== "opplasting.feilmelding.feiltype") {
		// 	yield put(loggFeil("Last opp vedlegg feilet: " + reason.toString()));
		// }
		console.warn("Feil ved opplasting av fil: " + reason.toString());
	}
}
//
function* slettFilSaga(action: StartSlettFilAction): SagaIterator {
	try {
        const url = `opplastetVedlegg/${action.behandlingsId}/${action.vedleggId}`;
        const promise = yield call(fetchDelete, url);
		const vedlegg = yield call(toJson, promise);
		console.warn(vedlegg);
		console.warn("Sletta vedlegg med UUID: " + action.vedleggId);

		// TODO:
		// if success => update Opplysning ved å fjerne den fila fra fillisten

		yield put(slettVedleggOk());
	} catch (reason) {
		yield put(loggFeil("Slett vedlegg feilet: " + reason));

		// TODO:
		// Burde kanskje gjøre noe annet enn dette?
		// yield put(navigerTilServerfeil());
	}
}
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


function* filSaga(): SagaIterator {
	yield takeEvery(FilActionTypeKeys.LAST_OPP, lastOppFilSaga);
	yield takeEvery(FilActionTypeKeys.START_SLETT_FIL, slettFilSaga);
	// yield takeEvery(VedleggActionTypeKeys.VEDLEGG_ALLEREDE_SENDT, vedleggAlleredeSendt);
}
//
// export {
// 	hentVedleggsForventningSaga
// };

export default filSaga;
