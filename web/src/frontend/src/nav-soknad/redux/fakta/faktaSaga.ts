import { call, takeEvery, put } from "redux-saga/effects";
import { FaktumActionTypeKeys } from "./faktaActionTypes";
import { Faktum } from "../../types";
import { fetchPut } from "../../utils/rest-utils";
import { prepFaktumForLagring } from "./faktaUtils";
import { SagaIterator } from "redux-saga";
import { LagreFaktum } from "./faktaTypes";
// import { setApplikasjonsfeil } from "../applikasjonsfeil/applikasjonsfeilActions";

function* lagreFaktumSaga( { faktum }: LagreFaktum ): SagaIterator {
	try {
		const response = yield call( fetchPut, `fakta/${faktum.faktumId}`, prepFaktumForLagring(faktum));
		yield put({
			type: FaktumActionTypeKeys.LAGRET_FAKTUM,
			faktum: response as Faktum
		});
	} catch (reason) {
		yield put({ type: FaktumActionTypeKeys.FEILET, feilmelding: reason });

		// TODO: Lag applikasjonsfeil saga - Ikke send funksjoner gjennom state
		// yield put(setApplikasjonsfeil({
		// 	tittel: "Serverfeil",
		// 	innhold: React.createElement("div", null, "Serverfeil" )
		// }));
	}
}

function* faktaSaga(): SagaIterator {
	yield takeEvery(FaktumActionTypeKeys.LAGRE_FAKTUM, lagreFaktumSaga);
}

export {
	lagreFaktumSaga
};

export default faktaSaga;
