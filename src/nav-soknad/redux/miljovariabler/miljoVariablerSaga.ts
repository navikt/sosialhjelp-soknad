import { call, put, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {fetchToJson, HttpStatus} from "../../utils/rest-utils";
import { MiljovariablerActionTypeKeys } from "./miljovariablerTypes";
import {
	henterMiljovariabler,
	mottattMiljovariabler
} from "./miljovariablerActions";
import {loggAdvarsel, loggFeil} from "../navlogger/navloggerActions";

export function* hentMiljovariablerSaga() {
	try {
		yield put(henterMiljovariabler());
		const response = yield call(fetchToJson, "informasjon/miljovariabler");
		yield put(mottattMiljovariabler(response));
	} catch (reason) {
		if (reason.message === HttpStatus.UNAUTHORIZED){
			console.warn("hentMiljøvariablerSaga: " + reason.toString());
			yield put(loggAdvarsel("hentMiljøvariablerSaga: " + reason));
		} else {
			yield put(loggFeil("Problemer med å hente miljøvariabler: " + reason.toString()));
		}
	}
}

function* miljovariablerSaga(): SagaIterator {
	yield takeEvery(MiljovariablerActionTypeKeys.INIT, hentMiljovariablerSaga);
}

export default miljovariablerSaga;
