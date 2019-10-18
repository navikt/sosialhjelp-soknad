import { call, put, takeEvery } from "redux-saga/effects";
import { LedeteksterActionTypeKeys } from "./ledeteksterTypes";
import {fetchToJson, HttpStatus} from "../../utils/rest-utils";
import {
	henterTekster,
	hentetTekster,
	hentTeksterFeilet
} from "./ledeteksterActions";
import { SagaIterator } from "redux-saga";
import {loggAdvarsel, loggFeil} from "../navlogger/navloggerActions";

const urlInneholderVistekster = () =>
	window.location.search.match(/vistekster=true/) !== null;

function leggNoklerPaaLedetekster(data: object) {
	const tekster = {};
	Object.keys(data).forEach(key => {
		// @ts-ignore
		tekster[key] = `${data[key]} [${key}]`;
	});
	return tekster;
}

function* hentTeksterSaga(): SagaIterator {
	try {
		yield put(henterTekster());
		// TODO: Burde lage egen funksjon som holder på url-string
		const response = yield call(
			fetchToJson,
			"informasjon/tekster?sprak=nb_NO&type=soknadsosialhjelp"
		);

		const visNokler = yield call(urlInneholderVistekster);
		// @ts-ignore
		const tekster = visNokler ? leggNoklerPaaLedetekster(response) : response;
		yield put(hentetTekster(tekster));
	} catch (reason) {
		if (reason.message === HttpStatus.UNAUTHORIZED){
			yield put(loggAdvarsel("hentTeksterSaga: " + reason));
		} else {
			yield put(loggFeil("Problemer med å hente ledetekster: " + reason.toString()));
			yield put(hentTeksterFeilet(reason));
		}
	}
}

function* ledeteksterSaga(): SagaIterator {
	yield takeEvery(LedeteksterActionTypeKeys.INIT, hentTeksterSaga);
}

export { urlInneholderVistekster, leggNoklerPaaLedetekster, hentTeksterSaga };

export default ledeteksterSaga;
