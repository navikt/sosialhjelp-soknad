import {FilActionTypeKeys, LastOppFilAction, StartSlettFilAction} from "./filTypes";
import {SagaIterator} from "redux-saga";
import {
    detekterInternFeilKode,
    fetchDelete,
    fetchUpload,
    fetchUploadIgnoreErrors,
    toJson
} from "../../utils/rest-utils";
import {call, put, takeEvery} from "redux-saga/effects";
import {lastOppVedleggOk, slettVedleggOk} from "../vedlegg/vedleggActions";
import {loggFeil} from "../navlogger/navloggerActions";



function* lastOppFilSaga(action: LastOppFilAction): SagaIterator {
	const url = `soknader/opplastetVedlegg/${action.behandlingsId}/${action.opplysningType}`;

	let response: any = "";
	try {
		response = yield call(fetchUpload, url, action.formData);
		console.warn(response);
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
		let feilKode: string = detekterInternFeilKode(reason.toString());
		//
		// // Kjør feilet kall på nytt for å få tilgang til feilmelding i JSON data:
		response = yield call(fetchUploadIgnoreErrors, url, action.formData);
		const ID = "id";
		if (response && response[ID]) {
			feilKode = response[ID];
		}
		// yield put(lastOppVedleggFeilet(action.belopFaktumId, feilKode));
		if (feilKode !== "opplasting.feilmelding.feiltype") {
			yield put(loggFeil("Last opp vedlegg feilet: " + reason.toString()));
		}
		console.warn("Feil ved opplasting av fil.");
	}
}
//
function* slettFilSaga(action: StartSlettFilAction): SagaIterator {
	try {
		debugger;
        const url = `opplastetVedlegg/${action.behandlingsId}/${action.vedleggId}`;
        const promise = yield call(fetchDelete, url);
		const vedlegg = yield call(toJson, promise);
		console.warn(vedlegg);

		// TODO:

		// if delete successful => fjerne fil fra økonomiskOpplysning. Som burde være lignende:
		// 	yield put(slettVedlegg(action.vedleggId));
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
