import { call, put, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { fetchToJson } from "../../../nav-soknad/utils/rest-utils";
import { ActionTypeKeys } from "./miljovariablerTypes";
import { henterMiljovariabler, mottattMiljovariabler } from "./miljovariablerActions";
import { loggFeil } from "../../../nav-soknad/redux/navlogger/navloggerActions";

function* hentMiljovariablerSaga(): SagaIterator {
	try {
		yield put( henterMiljovariabler() );
		const response = yield call(fetchToJson, "informasjon/miljovariabler");
		yield put( mottattMiljovariabler(response) );
	} catch (reason) {
		yield put( loggFeil("Problemer med å hente miljøvariabler: " + reason.toString()) );
	}
}

function* miljovariablerSaga(): SagaIterator {
	yield takeEvery(ActionTypeKeys.INIT, hentMiljovariablerSaga);
}

export default miljovariablerSaga;
