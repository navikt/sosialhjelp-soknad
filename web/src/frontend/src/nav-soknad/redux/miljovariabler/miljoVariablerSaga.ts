import { call, put, takeEvery } from "redux-saga/effects";
import { fetchToJson } from "../../../nav-soknad/utils/rest-utils";
import { MiljovariablerActionTypeKeys } from "./miljovariablerTypes";
import {
	henterMiljovariabler,
	mottattMiljovariabler
} from "./miljovariablerActions";
import { loggFeil } from "../../../nav-soknad/redux/navlogger/navloggerActions";

export function* hentMiljovariablerSaga(): any {
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

function* miljovariablerSaga(): any {
	yield takeEvery(MiljovariablerActionTypeKeys.INIT, hentMiljovariablerSaga);
}

export default miljovariablerSaga;
