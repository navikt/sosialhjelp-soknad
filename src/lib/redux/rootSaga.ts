import {all} from "redux-saga/effects";
import ettersendelseSaga from "./ettersendelse/ettersendelseSaga";

export default function* rootSaga() {
    yield all([ettersendelseSaga()]);
}
