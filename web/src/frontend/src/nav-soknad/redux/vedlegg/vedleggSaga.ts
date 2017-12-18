import { call, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { fetchDelete, fetchToJson, fetchUpload } from "../../../nav-soknad/utils/rest-utils";
import { LastOppVedleggAction, SlettFilAction, VedleggActionTypeKeys } from "./vedleggTypes";
import {
	hentVedleggsForventningOk, lastOppVedleggFeilet, lastOppVedleggOk, nyttVedlegg, oppdatertVedlegg,
	slettFilOk
} from "./vedleggActions";
import { loggFeil } from "../../../nav-soknad/redux/navlogger/navloggerActions";
import { selectBrukerBehandlingId, selectFaktaData } from "../selectors";
import { opprettetFaktum } from "../fakta/faktaActions";
import { navigerTilServerfeil } from "../navigasjon/navigasjonActions";

function* hentVedleggsForventningSaga(behandlingsId: string): SagaIterator {
	const url = `soknader/${behandlingsId}/vedlegg`;
	const response = yield call(fetchToJson, url);
	const fakta = yield select(selectFaktaData);
	yield put(hentVedleggsForventningOk(response, fakta));
}

function* lastOppVedleggSaga(action: LastOppVedleggAction): SagaIterator {
	try {

		const url = `sosialhjelpvedlegg/originalfil/${action.belopFaktumId}`;
		const response: any = yield call(fetchUpload, url, action.formData);
		yield call(console.log, response.right);
		yield put(lastOppVedleggOk());

		if (response.nyForventning) {
			yield put(opprettetFaktum(response.faktum));
			const fakta = yield select(selectFaktaData);
			yield put(nyttVedlegg(response.vedlegg, fakta));
		} else {
			const fakta = yield select(selectFaktaData);
			yield put(oppdatertVedlegg(response.vedlegg, fakta));
		}
	} catch (reason) {
		yield put(loggFeil("Last opp vedlegg feilet: " + reason));
		yield put(navigerTilServerfeil());
	}
}

function* slettVedleggFilSaga(action: SlettFilAction): SagaIterator {
	try {
		const behandlingsId = yield select(selectBrukerBehandlingId);
		const url = `vedlegg/${action.vedleggId}/${action.filNavn}?behandlingsId=${behandlingsId}`;
		yield call(fetchDelete, url);
		yield put(slettFilOk(action.faktumKey, action.vedleggId, action.filNavn));
	} catch (reason) {
		yield put(loggFeil("TODO implementer put(slettFilFeilet(faktumKey, vedleggId, reason"));
	}
}

function* vedleggSaga(): SagaIterator {
	yield takeEvery(VedleggActionTypeKeys.LAST_OPP, lastOppVedleggSaga);
	yield takeEvery(VedleggActionTypeKeys.SLETT_FIL, slettVedleggFilSaga);
}

export {
	hentVedleggsForventningSaga
};

export default vedleggSaga;
