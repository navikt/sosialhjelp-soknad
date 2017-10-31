import { all } from "redux-saga/effects";
import ledeteksterSaga from "./nav-soknad/redux/ledetekster/ledeteksterSaga";
import tilgangSaga from "./nav-soknad/redux/tilgang/tilgangSaga";
import faktaSaga from "./nav-soknad/redux/fakta/faktaSaga";
import navigasjonSaga from "./nav-soknad/redux/navigasjon/navigasjonSaga";
import oppsummeringSaga from "./nav-soknad/redux/oppsummering/oppsummeringSaga";
import synligeFaktaSaga from "./digisos/redux/synligefakta/synligeFaktaSaga";

export default function* rootSaga() {
	yield all([
		tilgangSaga(),
		ledeteksterSaga(),
		faktaSaga(),
		navigasjonSaga(),
		oppsummeringSaga(),
		synligeFaktaSaga()]);
}
