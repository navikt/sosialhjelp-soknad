import { call, put, select, take, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { push, goBack } from "react-router-redux";
import {
	NavigasjonActionTypes,
	Sider,
	GaVidere,
	GaTilbake,
	TilSteg,
	TilDittNav,
	TilKvittering
} from "./navigasjonTypes";
import { oppdaterFaktumMedVerdier } from "../../utils/faktumUtils";
import { lagreFaktum, setFaktum } from "../fakta/faktaActions";
import { FaktumActionTypeKeys } from "../fakta/faktaActionTypes";
import { tilSteg, tilInformasjon } from "./navigasjonActions";
import { SoknadAppState } from "../reduxTypes";
import { selectBrukerBehandlingId, selectProgresjonFaktum } from "../selectors";

const getHistoryLength = () => window.history.length;
const navigateTo = (path: string) => (window.location.href = path);

function* tilFinnDittNavKontorSaga(): SagaIterator {
	yield call(navigateTo, Sider.FINN_DITT_NAV_KONTOR);
}

function* tilServerfeilSaga(): SagaIterator {
	yield put(push(Sider.SERVERFEIL));
}

function* tilBostedSaga(): SagaIterator {
	yield put(push(Sider.BOSTED));
}

function* tilInformasjonSaga(): SagaIterator {
	yield put(push(Sider.INFORMASJON));
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

function* gaVidereSaga(action: GaVidere): SagaIterator {
	const progresjonFaktum = yield select(selectProgresjonFaktum);
	if (parseInt(progresjonFaktum.value || 1, 10) === action.stegnummer) {
		const faktum = yield call(
			oppdaterFaktumMedVerdier,
			progresjonFaktum,
			`${action.stegnummer + 1}`
		);
		yield put(setFaktum(faktum));
		yield put(lagreFaktum(faktum));
		yield take([FaktumActionTypeKeys.LAGRET_FAKTUM]);
	}
	yield put(tilSteg(action.stegnummer + 1));
}

function* tilDittNav(action: TilDittNav): SagaIterator {
	const url = yield select(
		(state: SoknadAppState) => state.miljovariabler.data["dittnav.link.url"]
	);
	yield call(navigateTo, url);
}

function* tilKvittering(action: TilKvittering): SagaIterator {
	yield put(push(`/kvittering/${action.brukerbehandlingId}`));
}

function* gaTilbakeSaga(action: GaTilbake): SagaIterator {
	if (action.stegnummer === 1) {
		yield put(tilInformasjon());
	} else {
		yield put(tilSteg(Math.max(1, action.stegnummer - 1)));
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
	yield takeEvery(NavigasjonActionTypes.TIL_INFORMASJON, tilInformasjonSaga);
	yield takeEvery(NavigasjonActionTypes.TIL_BOSTED, tilBostedSaga);
	yield takeEvery(NavigasjonActionTypes.TIL_DITT_NAV, tilDittNav);
	yield takeEvery(NavigasjonActionTypes.TIL_KVITTERING, tilKvittering);
}

export {
	tilFinnDittNavKontorSaga,
	tilServerfeilSaga,
	tilbakeEllerForsidenSaga,
	tilStegSaga,
	gaVidereSaga,
	navigateTo,
	selectProgresjonFaktum,
	tilKvittering,
	getHistoryLength,
	tilBostedSaga,
	tilInformasjonSaga
};

export default navigasjonSaga;
