import { call, put, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { fetchToJson } from "../../utils/rest-utils";
import { MiljovariablerActionTypeKeys } from "./miljovariablerTypes";
import {
	henterMiljovariabler,
	mottattMiljovariabler
} from "./miljovariablerActions";
import { loggFeil } from "../navlogger/navloggerActions";

export function* hentMiljovariablerSaga(): SagaIterator {
	try {
		yield put(henterMiljovariabler());
		const response = yield call(fetchToJson, "informasjon/miljovariabler");
		yield put(mottattMiljovariabler(response));
	} catch (reason) {
		yield put(
			loggFeil("Problemer med å hente miljøvariabler: " + reason.toString())
		);
	}
}

function* miljovariablerSaga(): SagaIterator {
	yield takeEvery(MiljovariablerActionTypeKeys.INIT, hentMiljovariablerSaga);
}

export default miljovariablerSaga;
