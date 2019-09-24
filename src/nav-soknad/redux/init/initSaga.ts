import { put, takeEvery, call} from "redux-saga/effects";
import { MiljovariablerActionTypeKeys } from "../miljovariabler/miljovariablerTypes";
import { LedeteksterActionTypeKeys } from "../ledetekster/ledeteksterTypes";
import { TilgangActionTypeKeys } from "../tilgang/tilgangTypes";
import { InitActionTypeKeys } from "./initTypes";
import {fornavnOk, initFeilet, initFerdig, lagreFornavnPaStore} from "./initActions";
import {hentMiljovariablerSaga} from "../miljovariabler/miljoVariablerSaga";
import {hentTilgangSaga} from "../tilgang/tilgangSaga";
import {hentTeksterSaga} from "../ledetekster/ledeteksterSaga";
import {loggFeil} from "../navlogger/navloggerActions";
import {fetchToJson} from "../../utils/rest-utils";


export let initActions = [
	TilgangActionTypeKeys.OK,
	MiljovariablerActionTypeKeys.OK,
	LedeteksterActionTypeKeys.OK,
	InitActionTypeKeys.LAGRE_FORNAVN_PA_STORE
];

export const initFeiletActions = [
	TilgangActionTypeKeys.FEILET,
	MiljovariablerActionTypeKeys.FEILET,
	LedeteksterActionTypeKeys.FEILET
];

function* startInit(): IterableIterator<any> {
	yield* hentTilgangSaga();
	yield* hentMiljovariablerSaga();
	yield* hentTeksterSaga();
	yield* getFornavnSaga();
}

interface FornavnApi {
	fornavn: string;
}

function* getFornavnSaga() {
	try {
		let response: FornavnApi = yield call(fetchToJson, "informasjon/fornavn" );
		yield put(lagreFornavnPaStore(response.fornavn));
		yield put(fornavnOk());
	} catch (e) {
		yield put(loggFeil("Error catchet i getFornavnSaga. Error: " + e.toString()))
	}
}

function* isAllDataLoaded(action: any) {
	initActions = initActions.filter(el => el !== action.type);
	if (initActions.length === 0) {
		yield put(initFerdig());
	}
}

function* initActionFeilet() {
	yield put(initFeilet());
}

export { startInit, isAllDataLoaded, initActionFeilet };

function* initSaga() {
	yield takeEvery(InitActionTypeKeys.START, startInit);
	yield takeEvery(initActions, isAllDataLoaded);
	yield takeEvery(initFeiletActions, initActionFeilet);
}

export default initSaga;
