import { takeEvery, put } from "redux-saga/effects";
import { hentMiljovariabler } from "../miljovariabler/miljovariablerActions";
import { MiljovariablerActionTypeKeys } from "../miljovariabler/miljovariablerTypes";
import { hentTekster } from "../ledetekster/ledeteksterActions";
import { LedeteksterActionTypeKeys } from "../ledetekster/ledeteksterTypes";
import { hentTilgang } from "../tilgang/tilgangActions";
import { TilgangActionTypeKeys } from "../tilgang/tilgangTypes";

import { InitActionTypeKeys } from "./initTypes";
import { initFerdig } from "./initActions";

let initActions = [
	TilgangActionTypeKeys.OK,
	MiljovariablerActionTypeKeys.OK,
	LedeteksterActionTypeKeys.OK
];

function* startInit(): IterableIterator<any> {
	yield put(hentMiljovariabler());
	yield put(hentTilgang());
	yield put(hentTekster());
}

function* isAllDataLoaded(action: any): IterableIterator<any> {
	initActions = initActions.filter(el => el !== action.type);
	if (initActions.length === 0) {
		yield put(initFerdig());
	}
}

function* initSaga() {
	yield takeEvery(InitActionTypeKeys.START, startInit);
	yield takeEvery(initActions, isAllDataLoaded);
}

export default initSaga;
