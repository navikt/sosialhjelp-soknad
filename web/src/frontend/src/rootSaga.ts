import { all } from "redux-saga/effects";
import ledeteksterSaga from "./nav-soknad/redux/ledetekster/ledeteksterSaga";
import faktaSaga from "./nav-soknad/redux/fakta/faktaSaga";
import navigasjonSaga from "./nav-soknad/redux/navigasjon/navigasjonSaga";
import miljovariablerSaga from "./digisos/redux/miljovariabler/miljoVariablerSaga";
import navloggerSaga from "./nav-soknad/redux/navlogger/navloggerSaga";

export default function* rootSaga() {
	yield all([
		ledeteksterSaga(),
		faktaSaga(),
		navigasjonSaga(),
		miljovariablerSaga(),
		navloggerSaga()
	]);
}
