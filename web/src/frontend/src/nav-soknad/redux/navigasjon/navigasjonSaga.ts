import { call, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { goBack, push } from "react-router-redux";
import {
	GaTilbake,
	GaVidere,
	NavigasjonActionTypes,
	Sider,
	TilDittNav,
	TilKvittering,
	TilSteg
} from "./navigasjonTypes";
import { tilStart, tilSteg } from "./navigasjonActions";
import { settAvbrytSoknadSjekk } from "../soknad/soknadActions";
import { SoknadAppState } from "../reduxTypes";
import { selectBrukerBehandlingId, selectProgresjonFaktum } from "../selectors";
import { lesKommunenrFraUrl } from "../../utils";

const getHistoryLength = () => window.history.length;
const navigateTo = (path: string) => (window.location.href = path);

function* tilFinnDittNavKontorSaga(): SagaIterator {
	yield call(navigateTo, Sider.FINN_DITT_NAV_KONTOR);
}

function* tilServerfeilSaga(): SagaIterator {
	/** Forhindre at avbryt dialog dukker opp når en redirecter til feilsiden
	 * Selve sjekken på om dialog skal vises eller implementer i hoved index.tsx
	 */
	yield put(settAvbrytSoknadSjekk(false));
	yield put(push(Sider.SERVERFEIL));
	yield put(settAvbrytSoknadSjekk(true));
}

function* tilStartSaga(): SagaIterator {
	yield put(push(Sider.START));
}

function* tilMockSaga(): SagaIterator {
	yield put(push(Sider.MOCK));
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
	let url = `/skjema/${behandlingsId}/${action.stegnummer}`;
	const kommunenr = lesKommunenrFraUrl();
	if (kommunenr) {
		url = url + '?kommunenr=' + kommunenr;
	}
	yield put(push(url));
}

function* gaVidereSaga(action: GaVidere): SagaIterator {
	yield put(tilSteg(action.stegnummer + 1));
}

function* gaTilbakeSaga(action: GaTilbake): SagaIterator {
	if (action.stegnummer === 1) {
		yield put(tilStart());
	} else {
		yield put(tilSteg(action.stegnummer - 1));
	}
}

function* tilDittNav(action: TilDittNav): SagaIterator {
	// @ts-ignore
	const url = yield select((state: SoknadAppState) => state.miljovariabler.data["dittnav.link.url"]);
	yield call(navigateTo, url);
}

function* tilKvittering(action: TilKvittering): SagaIterator {
	yield put(push(`/skjema/${action.brukerbehandlingId}/ettersendelse`));
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
	yield takeEvery(NavigasjonActionTypes.TIL_DITT_NAV, tilDittNav);
	yield takeEvery(NavigasjonActionTypes.TIL_MOCK, tilMockSaga);
	yield takeEvery(NavigasjonActionTypes.TIL_KVITTERING, tilKvittering);
}

export {
	gaVidereSaga,
	getHistoryLength,
	navigateTo,
	selectProgresjonFaktum,
	tilbakeEllerForsidenSaga,
	tilFinnDittNavKontorSaga,
	tilKvittering,
	tilServerfeilSaga,
	tilStegSaga
};

export default navigasjonSaga;
