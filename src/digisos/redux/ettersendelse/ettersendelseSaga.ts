import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";

import {
    fetchDelete,
    fetchToJson,
    fetchPost,
    fetchUpload,
    lastNedForsendelseSomZipFilHvisMockMiljoEllerDev,
    HttpStatus,
} from "../../../nav-soknad/utils/rest-utils";
import {
    EttersendelseActionTypeKeys,
    OpprettEttersendelseAction,
    LastOppEttersendtVedleggAction,
    LesEttersendelsesVedleggAction,
    SlettEttersendtVedleggAction,
    SendEttersendelseAction,
    LesEttersendelserAction,
} from "./ettersendelseTypes";
import {
    lesEttersendelsesVedlegg,
    lastOppEttersendtVedleggOk,
    lesEttersendteVedlegg,
    lagEttersendelseOk,
    settEttersendelser,
    lastOppEttersendelseFeilet,
    opprettEttersendelseFeilet,
    filLastetOpp,
    slettEttersendtVedleggOk,
} from "./ettersendelseActions";
import {loggFeil, loggInfo} from "../navlogger/navloggerActions";
import {Fil} from "../okonomiskeOpplysninger/opplysningerTypes";
import {showServerFeil} from "../soknad/soknadActions";

function* opprettEttersendelseSaga(action: OpprettEttersendelseAction) {
    try {
        const url = `soknader/opprettSoknad?ettersendTil=${action.brukerbehandlingId}`;
        const response = yield call(fetchPost, url, "", true);
        if (response) {
            yield put(lagEttersendelseOk(response.brukerBehandlingId));
            yield put(lesEttersendelsesVedlegg(response.brukerBehandlingId));
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield put(
            loggInfo("Opprett ettersendelse feilet: " + reason.toString())
        );
        yield put(opprettEttersendelseFeilet(action.brukerbehandlingId));
    }
}

function* lesEttersendelserSaga(action: LesEttersendelserAction) {
    try {
        const url = `ettersendelse/innsendte/${action.brukerbehandlingId}`;
        const response = yield call(fetchToJson, url, true);
        if (response) {
            yield put(settEttersendelser(response));
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield put(loggFeil("Les ettersendelser feilet: " + reason.toString()));
        yield put(showServerFeil(true));
    }
}

function* lesEttersendelsesVedleggSaga(action: LesEttersendelsesVedleggAction) {
    try {
        const url = `ettersendelse/ettersendteVedlegg/${action.brukerbehandlingId}`;
        const response = yield call(fetchToJson, url);
        if (response) {
            yield put(lesEttersendteVedlegg(response));
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield put(
            loggFeil("Lese ettersendte vedlegg feilet: " + reason.toString())
        );
        yield put(showServerFeil(true));
    }
}

function* slettEttersendelsesVedleggSaga(
    action: SlettEttersendtVedleggAction
): SagaIterator {
    const {behandlingsId, filUuid, opplysningType} = action;

    try {
        // const url = `ettersendelse/vedlegg/${action.vedleggId}?filId=${action.filId}`;
        const url = `opplastetVedlegg/${behandlingsId}/${filUuid}`;
        yield call(fetchDelete, url);
        yield put(slettEttersendtVedleggOk(filUuid, opplysningType));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield put(loggFeil("Slett ettersendt vedlegg feilet: " + reason));
        yield put(showServerFeil(true));
    }
}

function* lastOppEttersendelsesVedleggSaga(
    action: LastOppEttersendtVedleggAction
): SagaIterator {
    const {behandlingsId, opplysningType, formData} = action;

    let response: Fil = {
        filNavn: "",
        uuid: "",
    };

    try {
        const url = `opplastetVedlegg/${behandlingsId}/${opplysningType}`;
        const fetchResponse: any = yield call(fetchUpload, url, formData);
        if (typeof fetchResponse != "undefined") {
            response = fetchResponse;
        }
        yield put(lastOppEttersendtVedleggOk());
        yield put(
            loggInfo(
                "GlemmeSendKnappStatistikk. Vedlegg lastet opp. BehandingsId: " +
                    behandlingsId
            )
        );
        if (response) {
            yield put(filLastetOpp(opplysningType, response));
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        const errorMsg = reason.toString();
        yield put(
            lastOppEttersendelseFeilet(errorMsg, opplysningType.toString())
        );
        if (
            errorMsg.match(/Unsupported Media Type|Entity Too Large/) === null
        ) {
            yield put(
                loggInfo(
                    "Last opp vedlegg for ettersendelse feilet: " + errorMsg
                )
            );
        }
    }
}

function* sendEttersendelseSaga(action: SendEttersendelseAction): SagaIterator {
    try {
        yield put({type: EttersendelseActionTypeKeys.ETTERSEND_PENDING});
        const url = `soknader/${action.brukerbehandlingId}/actions/send`;
        yield call(fetchPost, url, JSON.stringify({}), true);
        lastNedForsendelseSomZipFilHvisMockMiljoEllerDev(
            action.brukerbehandlingId
        );
        yield put(
            loggInfo(
                "GlemmeSendKnappStatistikk. Ettersendelse sendt. BehandingsId: " +
                    action.brukerbehandlingId
            )
        );
        yield put({type: EttersendelseActionTypeKeys.ETTERSEND_OK});
        yield put(lastOppEttersendtVedleggOk());
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield put(loggFeil("Send ettersendelse feilet: " + reason.toString()));
        yield put(showServerFeil(true));
    }
}

function* ettersendelseSaga(): SagaIterator {
    yield takeEvery(EttersendelseActionTypeKeys.NY, opprettEttersendelseSaga);
    yield takeEvery(
        EttersendelseActionTypeKeys.LAST_OPP,
        lastOppEttersendelsesVedleggSaga
    );
    yield takeEvery(
        EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG,
        lesEttersendelsesVedleggSaga
    );
    yield takeEvery(
        EttersendelseActionTypeKeys.SLETT_VEDLEGG,
        slettEttersendelsesVedleggSaga
    );
    yield takeEvery(EttersendelseActionTypeKeys.SEND, sendEttersendelseSaga);

    yield takeEvery(
        EttersendelseActionTypeKeys.LES_ETTERSENDELSER,
        lesEttersendelserSaga
    );
}

export default ettersendelseSaga;
