import { put, takeEvery } from "redux-saga/effects";
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
		const response = yield fetchToJson("informasjon/tekster?sprak=nb_NO&type=soknadsosialhjelp");
		const visNokler = yield urlInneholderVistekster();
		const tekster = yield visNokler ? leggNoklerPaaLedetekster(response) : response;
		yield put(hentetTekster(tekster));
	} catch (reason) {
		yield put(hentTeksterFeilet(reason));
	}
}

export default function* informasjonsSaga() {
	yield takeEvery(ActionTypeKeys.INIT, initSaga);
}
