import {takeEvery} from "redux-saga/effects";
import {AuthenticationActionTypeKeys} from "./authenticationTypes";
import {hentTilgangSaga} from "../tilgang/tilgangSaga";
import {SagaIterator} from "redux-saga";
import {hentTeksterSaga} from "../ledetekster/ledeteksterSaga";
import {hentMiljovariablerSaga} from "../miljovariabler/miljoVariablerSaga";


function* authenticateUserSaga(): SagaIterator {
	yield* hentTilgangSaga();
	yield* hentTeksterSaga();
	yield* hentMiljovariablerSaga();
}

function* authenticationSaga(): any {
	yield takeEvery(AuthenticationActionTypeKeys.AUTHENTICATE_USER, authenticateUserSaga)
}

export default authenticationSaga;
