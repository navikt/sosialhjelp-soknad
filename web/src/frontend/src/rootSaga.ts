import { all } from "redux-saga/effects";
import ledeteksterSaga from "./nav-soknad/redux/ledetekster/ledeteksterSaga";
import faktaSaga from "./nav-soknad/redux/fakta/faktaSaga";

export default function* rootSaga() {
	yield all([
		ledeteksterSaga(),
		faktaSaga()
	]);
}
