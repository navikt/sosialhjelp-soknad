import {takeEvery} from "redux-saga/effects";
import {AuthenticateUser, AuthenticationActionTypeKeys} from "./authenticationTypes";
import {hentTilgangSaga} from "../tilgang/tilgangSaga";
import {SagaIterator} from "redux-saga";
import {hentTeksterSaga} from "../ledetekster/ledeteksterSaga";
import {hentMiljovariablerSaga} from "../miljovariabler/miljoVariablerSaga";
import {AUTHENTICATION_STATUS} from "../../types";


function* authenticateUserSaga(action: AuthenticateUser): SagaIterator {
	yield* hentTilgangSaga();

	if (action.authenticationStatus === AUTHENTICATION_STATUS.AUTHENTICATED){
		yield* hentTeksterSaga();
		yield* hentMiljovariablerSaga();
	}
}

function* authenticationSaga(): any {
	yield takeEvery(AuthenticationActionTypeKeys.AUTHENTICATE_USER, authenticateUserSaga)
}

export default authenticationSaga;
