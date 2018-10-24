import { all } from "redux-saga/effects";
import ledeteksterSaga from "./nav-soknad/redux/ledetekster/ledeteksterSaga";
import tilgangSaga from "./nav-soknad/redux/tilgang/tilgangSaga";
import faktaSaga from "./nav-soknad/redux/fakta/faktaSaga";
import navigasjonSaga from "./nav-soknad/redux/navigasjon/navigasjonSaga";
import soknadSaga from "./nav-soknad/redux/soknad/soknadSaga";
import miljovariablerSaga from "./nav-soknad/redux/miljovariabler/miljoVariablerSaga";
import navloggerSaga from "./nav-soknad/redux/navlogger/navloggerSaga";
import oppsummeringSaga from "./nav-soknad/redux/oppsummering/oppsummeringSaga";
import synligeFaktaSaga from "./digisos/redux/synligefakta/synligeFaktaSaga";
import initSaga from "./nav-soknad/redux/init/initSaga";
import featureTogglesSaga from "./nav-soknad/redux/featuretoggles/featureTogglesSaga";
import vedleggSaga from "./nav-soknad/redux/vedlegg/vedleggSaga";
import ettersendelseSaga from "./nav-soknad/redux/ettersendelse/ettersendelseSaga";
import kommunerSaga from "./nav-soknad/redux/kommuner/kommunerSaga";
import oppholdsadresseSaga from "./digisos/skjema/personopplysninger/tps/OppholdsadresseSaga";

export default function* rootSaga() {
	yield all([
		initSaga(),
		tilgangSaga(),
		ledeteksterSaga(),
		faktaSaga(),
		navigasjonSaga(),
		miljovariablerSaga(),
		featureTogglesSaga(),
		navloggerSaga(),
		oppsummeringSaga(),
		synligeFaktaSaga(),
		soknadSaga(),
		vedleggSaga(),
		ettersendelseSaga(),
		kommunerSaga(),
		oppholdsadresseSaga()
	]);
}
