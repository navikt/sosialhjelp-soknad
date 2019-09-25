import { all } from "redux-saga/effects";
import ledeteksterSaga from "./digisos/redux/ledetekster/ledeteksterSaga";
import tilgangSaga from "./digisos/redux/tilgang/tilgangSaga";
import faktaSaga from "./nav-soknad/redux/fakta/faktaSaga";
import navigasjonSaga from "./digisos/redux/navigasjon/navigasjonSaga";
import soknadSaga from "./digisos/redux/soknad/soknadSaga";
import miljovariablerSaga from "./digisos/redux/miljovariabler/miljoVariablerSaga";
import navloggerSaga from "./digisos/redux/navlogger/navloggerSaga";
import oppsummeringSaga from "./digisos/redux/oppsummering/oppsummeringSaga";
import initSaga from "./digisos/redux/init/initSaga";
import featureTogglesSaga from "./digisos/redux/featuretoggles/featureTogglesSaga";
import vedleggSaga from "./digisos/redux/vedlegg/vedleggSaga";
import ettersendelseSaga from "./digisos/redux/ettersendelse/ettersendelseSaga";
import filSaga from "./digisos/redux/fil/filSaga";
import opplysningerSaga from "./digisos/redux/okonomiskeOpplysninger/opplysningerSaga";

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
		soknadSaga(),
		filSaga(),
		vedleggSaga(),
		opplysningerSaga(),
		ettersendelseSaga(),
	]);
}
