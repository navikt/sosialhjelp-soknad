import { call, put, takeEvery } from "redux-saga/effects";
import { ActionTypeKeys } from "./ledeteksterTypes";
import { fetchToJson } from "../../utils/rest-utils";
import { henterTekster, hentetTekster, hentTeksterFeilet } from "./ledeteksterActions";

const urlInneholderVistekster = () => window.location.search.match(/vistekster=true/) !== null;

function leggNoklerPaaLedetekster(data: object) {
	const tekster = {};
	Object.keys(data).forEach(key => {
		tekster[key] = `${data[key]} [${key}]`;
	});
	return tekster;
}

function* hentTeksterSaga(): IterableIterator<any> {
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

function* ledeteksterSaga() {
	yield takeEvery(ActionTypeKeys.INIT, hentTeksterSaga);
}

export {
	urlInneholderVistekster,
	leggNoklerPaaLedetekster,
	hentTeksterSaga
};

export default ledeteksterSaga;
