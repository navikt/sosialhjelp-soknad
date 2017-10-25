import { put, select, takeEvery, take } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { push } from "react-router-redux";
import { NavigasjonActionTypes, Sider, GaVidere, TilSteg } from "./navigasjonTypes";
import { FaktumState } from "../fakta/faktaReducer";
import { oppdaterFaktumMedVerdier } from "../../utils/faktumUtils";
import { lagreFaktum, setFaktum } from "../fakta/faktaActions";
import { FaktumActionTypeKeys } from "../fakta/faktaActionTypes";
import { SoknadState } from "../reduxTypes";
import { tilSteg } from "./navigasjonActions";

const selectProgresjonFaktum = ( state: { fakta: FaktumState }) => {
	return state.fakta.data.filter(f => f.key === "progresjon")[0];
};

const selectBehandlingsId = ( state: { soknad: SoknadState} ) => {
	return state.soknad.data.brukerBehandlingId;
};

function* tilServerfeilSaga(): SagaIterator {
	yield put(push(Sider.SERVERFEIL));
}

function* tilStegSaga(action: TilSteg): SagaIterator {
	const behandlingsId = yield select( selectBehandlingsId );
	yield put( push( `/skjema/${behandlingsId}/${action.stegnummer}`));
}

function* gaVidereSaga(action: GaVidere): SagaIterator {
	let progresjonFaktum = yield select(selectProgresjonFaktum);
	if ( parseInt((progresjonFaktum.value || 1), 10) === action.stegnummer ) {
		const faktum = oppdaterFaktumMedVerdier(
			progresjonFaktum,
			`${action.stegnummer + 1}`
		);
		yield put(setFaktum(faktum));
		yield put(lagreFaktum(faktum));
		yield take([FaktumActionTypeKeys.LAGRET_FAKTUM]);
		progresjonFaktum = yield select(selectProgresjonFaktum);
	}
	yield put(tilSteg(parseInt(progresjonFaktum.value, 10)));
}

function* navigasjonSaga(): SagaIterator {
	yield takeEvery(NavigasjonActionTypes.TIL_SERVERFEIL, tilServerfeilSaga);
	yield takeEvery(NavigasjonActionTypes.TIL_STEG, tilStegSaga);
	yield takeEvery(NavigasjonActionTypes.GA_VIDERE, gaVidereSaga);
}

export default navigasjonSaga;
