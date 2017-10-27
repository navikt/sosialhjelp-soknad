import { all } from "redux-saga/effects";
import ledeteksterSaga from "./nav-soknad/redux/ledetekster/ledeteksterSaga";
import tilgangSaga from "./nav-soknad/redux/tilgang/tilgangSaga";

export default function* rootSaga() {
	yield all([tilgangSaga(), ledeteksterSaga()]);
}
