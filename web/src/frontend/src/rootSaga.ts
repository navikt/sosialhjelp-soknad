import { all } from "redux-saga/effects";
import informasjonsSaga from "./nav-soknad/redux/informasjon/informasjonSaga";

export default function* rootSaga() {
	yield all([
		informasjonsSaga()
	]);
}
