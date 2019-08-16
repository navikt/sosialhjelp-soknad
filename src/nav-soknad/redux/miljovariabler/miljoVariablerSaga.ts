import { call, put, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {fetchGet, responseToJson, sjekkStatusKodeSaga, statusCodeOk} from "../../utils/rest-utils";
import { MiljovariablerActionTypeKeys } from "./miljovariablerTypes";
import {
	henterMiljovariabler,
	mottattMiljovariabler
} from "./miljovariablerActions";
import { loggFeil } from "../navlogger/navloggerActions";
import {TilgangApiResponse} from "../tilgang/tilgangTypes";

export function* hentMiljovariablerSaga() {
	try {
		yield put(henterMiljovariabler());
		const response: Response = yield call(fetchGet, "informasjon/miljovariabler");

		yield* sjekkStatusKodeSaga(response);
		if(statusCodeOk(response)){
			const jsonResponse: TilgangApiResponse = yield responseToJson(response);
			yield put(mottattMiljovariabler(jsonResponse));
		}
		return
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
