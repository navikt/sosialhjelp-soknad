import { all } from "redux-saga/effects";
import ledeteksterSaga from "./nav-soknad/redux/ledetekster/ledeteksterSaga";
import faktaSaga from "./nav-soknad/redux/fakta/faktaSaga";
import navigasjonSaga from "./nav-soknad/redux/navigasjon/navigasjonSaga";
import oppsummeringSaga from "./nav-soknad/redux/oppsummering/oppsummeringSaga";

export default function* rootSaga() {
	yield all([
		ledeteksterSaga(),
		faktaSaga(),
		navigasjonSaga(),
		oppsummeringSaga()
	]);
}
