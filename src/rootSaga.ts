import {all} from "redux-saga/effects";
import ettersendelseSaga from "./digisos/redux/ettersendelse/ettersendelseSaga";

export default function* rootSaga() {
    yield all([ettersendelseSaga()]);
}
