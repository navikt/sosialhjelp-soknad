import { put, select, takeEvery, take, call } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { push, goBack } from "react-router-redux";
import { NavigasjonActionTypes, Sider, GaVidere, TilSteg } from "./navigasjonTypes";
import { FaktumState } from "../fakta/faktaReducer";
import { oppdaterFaktumMedVerdier } from "../../utils/faktumUtils";
import { lagreFaktum, setFaktum } from "../fakta/faktaActions";
import { FaktumActionTypeKeys } from "../fakta/faktaActionTypes";
import { SoknadState } from "../reduxTypes";
import { tilSteg } from "./navigasjonActions";

const navigateTo = (path: string) => window.location.href = path;

const selectProgresjonFaktum = ( state: { fakta: FaktumState }) => {
	return state.fakta.data.filter(f => f.key === "progresjon")[0];
};

const selectBehandlingsId = ( state: { soknad: SoknadState} ) => {
	return state.soknad.data.brukerBehandlingId;
};

function* tilFinnDittNavKontorSaga(): SagaIterator {
	yield call(navigateTo, Sider.FINN_DITT_NAV_KOTOR);
}

function* tilServerfeilSaga(): SagaIterator {
	yield put(push(Sider.SERVERFEIL));
}

function* tilbakeEllerForsidenSaga(): SagaIterator {
	if (window.history.length === 1) {
		yield call(navigateTo, Sider.FORSIDEN);
	} else {
		yield put( goBack() );
	}
}

function* tilStegSaga(action: TilSteg): SagaIterator {
	const behandlingsId = yield select( selectBehandlingsId );
	yield put( push( `/skjema/${behandlingsId}/${action.stegnummer}`));
}

function* gaVidereSaga(action: GaVidere): SagaIterator {
	const progresjonFaktum = yield select(selectProgresjonFaktum);
	if ( parseInt((progresjonFaktum.value || 1), 10) === action.stegnummer ) {
		const faktum = oppdaterFaktumMedVerdier(
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

export default navigasjonSaga;
