import { takeEvery, put } from "redux-saga/effects";
import { hentMiljovariabler } from "../miljovariabler/miljovariablerActions";
import { hentTekster } from "../ledetekster/ledeteksterActions";
import { hentTilgang } from "../tilgang/tilgangActions";
import { MiljovariablerActionTypeKeys } from "../miljovariabler/miljovariablerTypes";
import { LedeteksterActionTypeKeys } from "../ledetekster/ledeteksterTypes";
import { TilgangActionTypeKeys } from "../tilgang/tilgangTypes";

import { InitActionTypeKeys } from "./initTypes";
import { initFerdig, initFeilet } from "./initActions";

export let initActions = [
	TilgangActionTypeKeys.OK,
	MiljovariablerActionTypeKeys.OK,
	LedeteksterActionTypeKeys.OK
];

export const initFeiletActions = [
	TilgangActionTypeKeys.FEILET,
	MiljovariablerActionTypeKeys.FEILET,
	LedeteksterActionTypeKeys.FEILET
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

function* initActionFeilet(): IterableIterator<any> {
	yield put(initFeilet());
}

export { startInit, isAllDataLoaded, initActionFeilet };

function* initSaga() {
	yield takeEvery(InitActionTypeKeys.START, startInit);
	yield takeEvery(initActions, isAllDataLoaded);
	yield takeEvery(initFeiletActions, initActionFeilet);
}

export default initSaga;
