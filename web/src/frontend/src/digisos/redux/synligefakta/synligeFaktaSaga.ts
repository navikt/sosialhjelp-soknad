import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { SynligeFaktaActionTypeKeys } from "./synligeFaktaTypes";
import { fetchToJson } from "../../../nav-soknad/utils/rest-utils";
import { selectBrukerBehandlingId } from "../../../nav-soknad/redux/selectors";
import { byggStrukturFeilet, byggStrukturOk, hentSynligeFaktaOk } from "./synligeFaktaActions";
import { Soknad } from "../../../nav-soknad/types/navSoknadTypes";
import { oppdaterSoknadSaga } from "../../../nav-soknad/redux/soknad/soknadSaga";
import { hentVedleggsForventningSaga } from "../../../nav-soknad/redux/vedlegg/vedleggSaga";

function* synligeFaktaSaga(): SagaIterator {
	yield takeEvery(SynligeFaktaActionTypeKeys.START_BYGG_STRUKTUR, hentBelopOgVedleggSaga);
}

function* hentBelopOgVedleggSaga(): SagaIterator {
	try {
		const behandlingsId = yield select(selectBrukerBehandlingId);

		yield call(oppdaterSoknadMedVedleggFaktum, behandlingsId);
		yield all([
			call(hentSynligeFaktaSaga, behandlingsId),
			call(hentVedleggsForventningSaga, behandlingsId)
		]);

		yield put(byggStrukturOk());
	} catch (reason) {
		yield put(byggStrukturFeilet(reason));
	}

}

function* oppdaterSoknadMedVedleggFaktum(behandlingsId: string): SagaIterator {
	const oppdatertSoknad: Soknad = yield call(
		fetchToJson,
		`sosialhjelpvedlegg/oppdaterVedlegg/${behandlingsId}`
	);
	yield call(oppdaterSoknadSaga, oppdatertSoknad);
}

function* hentSynligeFaktaSaga(behandlingsId: string): SagaIterator {
	const struktur = yield call(
		fetchToJson,
		`soknader/${behandlingsId}/synligsoknadstruktur?panelFilter=opplysningerBolk`
	);
	yield put(hentSynligeFaktaOk(struktur));
}

export default synligeFaktaSaga;
