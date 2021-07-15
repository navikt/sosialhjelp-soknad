import {all} from "redux-saga/effects";
import navigasjonSaga from "./digisos/redux/navigasjon/navigasjonSaga";
import soknadSaga from "./digisos/redux/soknad/soknadSaga";
import navloggerSaga from "./digisos/redux/navlogger/navloggerSaga";
import ettersendelseSaga from "./digisos/redux/ettersendelse/ettersendelseSaga";
import filSaga from "./digisos/redux/fil/filSaga";
import opplysningerSaga from "./digisos/redux/okonomiskeOpplysninger/opplysningerSaga";

export default function* rootSaga() {
    yield all([navigasjonSaga(), navloggerSaga(), soknadSaga(), filSaga(), opplysningerSaga(), ettersendelseSaga()]);
}
