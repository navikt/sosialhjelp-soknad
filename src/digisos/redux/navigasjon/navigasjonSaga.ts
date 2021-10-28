import {call, put, takeEvery} from "redux-saga/effects";
import {SagaIterator} from "redux-saga";
import {GaTilbake, GaVidere, NavigasjonActionTypes, Sider, TilKvittering} from "./navigasjonTypes";
import {tilStart} from "./navigasjonActions";
import {push} from "connected-react-router";
import {getStegUrl} from "../../../nav-soknad/utils";

const navigateTo = (path: string) => (window.location.href = path);

function* tilStartSaga(): SagaIterator {
    yield call(navigateTo, Sider.START);
}

function* gaVidereSaga(action: GaVidere): SagaIterator {
    yield put(push(getStegUrl(action.behandlingsId, action.stegnummer + 1)));
}

function* gaTilbakeSaga(action: GaTilbake): SagaIterator {
    if (action.stegnummer === 1) {
        yield put(tilStart());
    } else {
        yield put(push(getStegUrl(action.behandlingsId, action.stegnummer - 1)));
    }
}

function* tilEttersendelse(action: TilKvittering): SagaIterator {
    yield put(push(`/skjema/${action.brukerbehandlingId}/ettersendelse`));
}

function* navigasjonSaga(): SagaIterator {
    yield takeEvery(NavigasjonActionTypes.GA_VIDERE, gaVidereSaga);
    yield takeEvery(NavigasjonActionTypes.GA_TILBAKE, gaTilbakeSaga);
    yield takeEvery(NavigasjonActionTypes.TIL_START, tilStartSaga);
    yield takeEvery(NavigasjonActionTypes.TIL_KVITTERING, tilEttersendelse);
}

export {gaVidereSaga, navigateTo, tilEttersendelse};

export default navigasjonSaga;
