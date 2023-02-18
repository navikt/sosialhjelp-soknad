import {all} from "redux-saga/effects";
import ettersendelseSaga from "./digisos/redux/ettersendelse/ettersendelseSaga";
import opplysningerSaga from "./digisos/redux/okonomiskeOpplysninger/opplysningerSaga";

export default function* rootSaga() {
    yield all([opplysningerSaga(), ettersendelseSaga()]);
}
