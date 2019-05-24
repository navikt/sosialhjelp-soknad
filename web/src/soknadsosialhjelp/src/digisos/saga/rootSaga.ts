import { all } from "redux-saga/effects";
import ledeteksterSaga from "./ledetekster/ledeteksterSaga";

export default function* rootSaga() {
    yield all([
        ledeteksterSaga()
    ]);
}


