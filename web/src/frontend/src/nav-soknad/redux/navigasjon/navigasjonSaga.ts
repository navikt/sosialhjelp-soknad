import { call, put, select, take, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { goBack, push } from "react-router-redux";
import { GaVidere, NavigasjonActionTypes, Sider, TilSteg } from "./navigasjonTypes";
import { oppdaterFaktumMedVerdier } from "../../utils/faktumUtils";
import { lagreFaktum, setFaktum } from "../fakta/faktaActions";
import { FaktumActionTypeKeys } from "../fakta/faktaActionTypes";
import { tilSteg } from "./navigasjonActions";
import { selectBrukerBehandlingId, selectProgresjonFaktum } from "../selectors";

const getHistoryLength = () => window.history.length;
const navigateTo = (path: string) => window.location.href = path;

function* tilFinnDittNavKontorSaga(): SagaIterator {
	yield call(navigateTo, Sider.FINN_DITT_NAV_KONTOR);
}

function* tilServerfeilSaga(): SagaIterator {
	yield put(push(Sider.SERVERFEIL));
}

function* tilbakeEllerForsidenSaga(): SagaIterator {
	const historyLength = yield call( getHistoryLength );
	if (historyLength === 1) {
		yield call(navigateTo, Sider.FORSIDEN);
	} else {
		yield put( goBack() );
	}
}

function* tilStegSaga(action: TilSteg): SagaIterator {
	const behandlingsId = yield select( selectBrukerBehandlingId );
	yield put( push( `/skjema/${behandlingsId}/${action.stegnummer}`));
}

function* gaVidereSaga(action: GaVidere): SagaIterator {
	const progresjonFaktum = yield select(selectProgresjonFaktum);
	if ( parseInt((progresjonFaktum.value || 1), 10) === action.stegnummer ) {
		const faktum = yield call( oppdaterFaktumMedVerdier,
			progresjonFaktum,
			`${action.stegnummer + 1}`
		);
		yield put(setFaktum(faktum));
		yield put(lagreFaktum(faktum));
		yield take([FaktumActionTypeKeys.LAGRET_FAKTUM]);
	}
	yield put(tilSteg( action.stegnummer + 1 ));
}

function* navigasjonSaga(): SagaIterator {
	yield takeEvery(NavigasjonActionTypes.TIL_SERVERFEIL, tilServerfeilSaga);
	yield takeEvery(NavigasjonActionTypes.TIL_STEG, tilStegSaga);
	yield takeEvery(NavigasjonActionTypes.GA_VIDERE, gaVidereSaga);
	yield takeEvery(NavigasjonActionTypes.TIL_FINN_DITT_NAV_KONTOR, tilFinnDittNavKontorSaga);
	yield takeEvery(NavigasjonActionTypes.TILBAKE_ELLER_FORSIDEN, tilbakeEllerForsidenSaga);
}

export {
	tilFinnDittNavKontorSaga,
	tilServerfeilSaga,
	tilbakeEllerForsidenSaga,
	tilStegSaga,
	gaVidereSaga,
	navigateTo,
	getHistoryLength
};

export default navigasjonSaga;
