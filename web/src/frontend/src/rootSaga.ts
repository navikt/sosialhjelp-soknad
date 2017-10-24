import { all } from "redux-saga/effects";
import ledeteksterSaga from "./nav-soknad/redux/ledetekster/ledeteksterSaga";

export default function* rootSaga() {
	yield all([
		ledeteksterSaga()
	]);
}
