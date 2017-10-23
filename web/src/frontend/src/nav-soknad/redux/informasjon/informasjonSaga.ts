import { call, put, takeEvery } from "redux-saga/effects";
import { ActionTypeKeys } from "./informasjonTypes";
import { fetchToJson } from "../../utils/rest-utils";
import { henterTekster, hentetTekster, hentTeksterFeilet } from "./informasjonActions";

const urlInneholderVistekster = () => window.location.search.match(/vistekster=true/) !== null;

function leggNoklerPaaLedetekster(data: object) {
	const tekster = {};
	Object.keys(data).forEach(key => {
		tekster[key] = `${data[key]} [${key}]`;
	});
	return tekster;
}

function* initSaga(): IterableIterator<any> {
	try {
		yield put(henterTekster());
		const response = yield call(fetchToJson, "informasjon/tekster?sprak=nb_NO&type=soknadsosialhjelp");
		const visNokler = yield call(urlInneholderVistekster);
		const tekster = visNokler ? leggNoklerPaaLedetekster(response) : response;
		yield put(hentetTekster(tekster));
	} catch (reason) {
		yield put(hentTeksterFeilet(reason));
	}
}

function* informasjonsSaga() {
	yield takeEvery(ActionTypeKeys.INIT, initSaga);
}

export {
	urlInneholderVistekster,
	leggNoklerPaaLedetekster,
	initSaga
};

export default informasjonsSaga;
