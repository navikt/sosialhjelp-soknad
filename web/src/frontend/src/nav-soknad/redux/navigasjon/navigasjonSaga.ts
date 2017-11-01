import { call, put, select, take, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { goBack, push } from "react-router-redux";
import {
	GaTilbake,
	GaVidere,
	NavigasjonActionTypes,
	Sider,
	TilSteg
} from "./navigasjonTypes";
import { oppdaterFaktumMedVerdier } from "../../utils/faktumUtils";
import { lagreFaktum, setFaktum } from "../fakta/faktaActions";
import { FaktumActionTypeKeys } from "../fakta/faktaActionTypes";
import { tilStart, tilSteg } from "./navigasjonActions";
import { selectBrukerBehandlingId, selectProgresjonFaktum } from "../selectors";
import { hentSynligeFakta } from "../../../digisos/redux/synligefakta/synligeFaktaActions";
import { SynligeFaktaActionTypeKeys } from "../../../digisos/redux/synligefakta/synligeFaktaTypes";

const getHistoryLength = () => window.history.length;
const navigateTo = (path: string) => (window.location.href = path);

function* tilFinnDittNavKontorSaga(): SagaIterator {
	yield call(navigateTo, Sider.FINN_DITT_NAV_KONTOR);
}

function* tilServerfeilSaga(): SagaIterator {
	yield put(push(Sider.SERVERFEIL));
}

function* tilStartSaga(): SagaIterator {
	yield put(push(Sider.START));
}

function* tilbakeEllerForsidenSaga(): SagaIterator {
	const historyLength = yield call(getHistoryLength);
	if (historyLength === 1) {
		yield call(navigateTo, Sider.FORSIDEN);
	} else {
		yield put(goBack());
	}
}

function* tilStegSaga(action: TilSteg): SagaIterator {
	const behandlingsId = yield select(selectBrukerBehandlingId);
	yield put(push(`/skjema/${behandlingsId}/${action.stegnummer}`));
}

function* skalHoppeOverSaga(stegnummer: number): SagaIterator {
	if (stegnummer === 7 || stegnummer === 9) {
		yield put(hentSynligeFakta());
		yield take([
			SynligeFaktaActionTypeKeys.HENT_SYNLIGE_OK,
			SynligeFaktaActionTypeKeys.HENT_SYNLIGE_FEILET
		]);
		const synligeFakta = yield select((state: any) => state.synligefakta.data);
		return Object.keys(synligeFakta).length === 0;
	}
	return false;
}

function* gaVidereSaga(action: GaVidere): SagaIterator {
	const skalHoppeOver = yield call(skalHoppeOverSaga, action.stegnummer);
	const progresjonFaktum = yield select(selectProgresjonFaktum);
	if (parseInt(progresjonFaktum.value || 1, 10) === action.stegnummer) {
		const faktum = yield call(
			oppdaterFaktumMedVerdier,
			progresjonFaktum,
			`${action.stegnummer + (skalHoppeOver ? 2 : 1)}`
		);
		yield put(setFaktum(faktum));
		yield put(lagreFaktum(faktum));
		yield take([FaktumActionTypeKeys.LAGRET_FAKTUM]);
	}
	yield put(tilSteg(action.stegnummer + (skalHoppeOver ? 2 : 1)));
}

function* gaTilbakeSaga(action: GaTilbake): SagaIterator {
	if (action.stegnummer === 1) {
		yield put(tilStart());
	} else {
		const skalHoppeOver = yield call(skalHoppeOverSaga, action.stegnummer);
		yield put(tilSteg(action.stegnummer - (skalHoppeOver ? 2 : 1)));
	}
}

function* navigasjonSaga(): SagaIterator {
	yield takeEvery(NavigasjonActionTypes.TIL_SERVERFEIL, tilServerfeilSaga);
	yield takeEvery(NavigasjonActionTypes.TIL_STEG, tilStegSaga);
	yield takeEvery(NavigasjonActionTypes.GA_VIDERE, gaVidereSaga);
	yield takeEvery(NavigasjonActionTypes.GA_TILBAKE, gaTilbakeSaga);
	yield takeEvery(
		NavigasjonActionTypes.TIL_FINN_DITT_NAV_KONTOR,
		tilFinnDittNavKontorSaga
	);
	yield takeEvery(
		NavigasjonActionTypes.TILBAKE_ELLER_FORSIDEN,
		tilbakeEllerForsidenSaga
	);
	yield takeEvery(NavigasjonActionTypes.TIL_START, tilStartSaga);
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
