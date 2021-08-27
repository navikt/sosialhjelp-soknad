import {all} from "redux-saga/effects";
import navigasjonSaga from "./digisos/redux/navigasjon/navigasjonSaga";
import soknadSaga from "./digisos/redux/soknad/soknadSaga";
import ettersendelseSaga from "./digisos/redux/ettersendelse/ettersendelseSaga";
import opplysningerSaga from "./digisos/redux/okonomiskeOpplysninger/opplysningerSaga";

export default function* rootSaga() {
    yield all([navigasjonSaga(), soknadSaga(), opplysningerSaga(), ettersendelseSaga()]);
}
