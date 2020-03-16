import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";

import {
    fetchDelete,
    fetchToJson,
    fetchPost,
    fetchUpload,
    lastNedForsendelseSomZipFilHvisMockMiljoEllerDev,
    HttpStatus,
    fetchUploadIgnoreErrors,
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
import {REST_FEIL} from "../soknad/soknadTypes";
import {settFilOpplastingFerdig} from "../okonomiskeOpplysninger/opplysningerActions";
import {detekterInternFeilKode} from "../fil/filSaga";

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
    const url = `opplastetVedlegg/${behandlingsId}/${opplysningType}`;

    let response: Fil = {
        filNavn: "",
        uuid: "",
    };

    try {
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
        let feilKode: REST_FEIL = detekterInternFeilKode(reason.toString());
        // Kjør feilet kall på nytt for å få tilgang til feilmelding i JSON data:
        response = yield call(fetchUploadIgnoreErrors, url, formData);
        const ID = "id";
        // @ts-ignore
        if (response && response[ID]) {
            // @ts-ignore
            feilKode = response[ID];
        }
        yield put(lastOppEttersendelseFeilet(feilKode, opplysningType.toString()));
        if (
            feilKode !== REST_FEIL.KRYPTERT_FIL &&
            feilKode !== REST_FEIL.SIGNERT_FIL
        ) {
            yield put(
                loggInfo("Last opp vedlegg for ettersendelse feilet: " + reason.toString())
            );
        }
        yield put(settFilOpplastingFerdig(opplysningType));
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
