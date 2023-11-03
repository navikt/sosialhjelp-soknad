import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";

import {
    fetchDelete,
    fetchToJson,
    fetchPost,
    fetchUpload,
    HttpStatus,
    fetchUploadIgnoreErrors,
    detekterInternFeilKode,
} from "../../../lib/utils/rest-utils";
import {
    EttersendelseActionTypeKeys,
    OpprettEttersendelseAction,
    LastOppEttersendtVedleggAction,
    LesEttersendelsesVedleggAction,
    SlettEttersendtVedleggAction,
    SendEttersendelseAction,
    LesEttersendelserAction,
    EttersendelseVedleggBackend,
    Behandlingskjede,
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
import {logInfo, logWarning} from "../../../lib/utils/loggerUtils";
import {REST_FEIL} from "../restTypes";
import {FilFrontend} from "../../../generated/model";

function* opprettEttersendelseSaga({brukerbehandlingId}: OpprettEttersendelseAction) {
    try {
        const response: {brukerBehandlingId: string} = yield call(
            fetchPost,
            `soknader/opprettSoknad?ettersendTil=${brukerbehandlingId}`,
            "",
            true
        );
        if (!response) return;
        yield put(lagEttersendelseOk(response.brukerBehandlingId));
        yield put(lesEttersendelsesVedlegg(response.brukerBehandlingId));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;
        yield call(logInfo, `Opprett ettersendelse feilet: ${reason.toString()}`);
        yield put(opprettEttersendelseFeilet(brukerbehandlingId));
    }
}

function* lesEttersendelserSaga({brukerbehandlingId}: LesEttersendelserAction) {
    try {
        const url = `ettersendelse/innsendte/${brukerbehandlingId}`;
        const response: Behandlingskjede = yield call(fetchToJson, url, true);
        if (!response) return;
        yield put(settEttersendelser(response));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;
        yield call(logWarning, "Les ettersendelser feilet: " + reason.toString());
        window.location.href = "/sosialhjelp/soknad/feil?reason=lesEttersendelserSaga";
    }
}

function* lesEttersendelsesVedleggSaga({brukerbehandlingId}: LesEttersendelsesVedleggAction) {
    try {
        const response: EttersendelseVedleggBackend[] = yield call(
            fetchToJson,
            `ettersendelse/ettersendteVedlegg/${brukerbehandlingId}`
        );
        if (!response) return;
        yield put(lesEttersendteVedlegg(response));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;
        yield call(logWarning, "Lese ettersendte vedlegg feilet: " + reason.toString());
        window.location.href = "/sosialhjelp/soknad/feil?reason=lesEttersendelsesVedleggSaga";
    }
}

function* slettEttersendelsesVedleggSaga({
    behandlingsId,
    filUuid,
    opplysningType,
}: SlettEttersendtVedleggAction): SagaIterator {
    try {
        yield call(fetchDelete, `opplastetVedlegg/${behandlingsId}/${filUuid}`);
        yield put(slettEttersendtVedleggOk(filUuid, opplysningType));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;
        yield call(logWarning, "Slett ettersendt vedlegg feilet: " + reason);
        window.location.href = "/sosialhjelp/soknad/feil?reason=slettEttersendelsesVedleggSaga";
    }
}

function* lastOppEttersendelsesVedleggSaga(action: LastOppEttersendtVedleggAction): SagaIterator {
    const {behandlingsId, opplysningType, formData} = action;
    const url = `opplastetVedlegg/${behandlingsId}/${opplysningType}`;

    let response: FilFrontend = {
        filNavn: "",
        uuid: "",
    };

    try {
        const fetchResponse: FilFrontend | undefined = yield call(fetchUpload, url, formData);
        if (fetchResponse) response = fetchResponse;

        yield put(lastOppEttersendtVedleggOk());
        yield call(logInfo, "GlemmeSendKnappStatistikk. Vedlegg lastet opp. BehandingsId: " + behandlingsId);
        if (!response) return;
        yield put(filLastetOpp(opplysningType, response));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;
        let feilKode = detekterInternFeilKode(reason.toString());
        // Kjør feilet kall på nytt for å få tilgang til feilmelding i JSON data:
        //@ts-ignore
        response = yield call(fetchUploadIgnoreErrors, url, formData, "POST");
        const ID = "id";
        // @ts-ignore
        if (response && response[ID]) {
            // @ts-ignore
            feilKode = response[ID];
        }
        yield put(lastOppEttersendelseFeilet(feilKode, opplysningType.toString()));
        if (feilKode !== REST_FEIL.KRYPTERT_FIL && feilKode !== REST_FEIL.SIGNERT_FIL) {
            yield call(logInfo, "Last opp vedlegg for ettersendelse feilet: " + reason.toString());
        }
        // FIXME før prodsetting: Gjenskape denne funksjonaliteten under
        // yield put(setVedleggLoading(opplysningType as VedleggFrontendType, false));
    }
}

function* sendEttersendelseSaga({brukerbehandlingId}: SendEttersendelseAction): SagaIterator {
    try {
        yield put({type: EttersendelseActionTypeKeys.ETTERSEND_PENDING});
        yield call(fetchPost, `soknader/${brukerbehandlingId}/actions/send`, JSON.stringify({}), true);
        yield call(logInfo, `GlemmeSendKnappStatistikk. Ettersendelse sendt. BehandingsId: ${brukerbehandlingId}`);
        yield put({type: EttersendelseActionTypeKeys.ETTERSEND_OK});
        yield put(lastOppEttersendtVedleggOk());
        /* FIXME: Jeg har kommentert ut denne koden fordi jeg _tror_ det er en no-op.
             Jeg tror state.soknad.behandlingsId alltid er null når man ikke har en søknad oppe.
        const behandlingsId = yield select((state: State) => state.soknad.behandlingsId);
            yield put(opprettEttersendelse(behandlingsId));
            yield put(lesEttersendelser(behandlingsId));
        */
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;
        yield call(logWarning, "Send ettersendelse feilet: " + reason.toString());
        window.location.href = "/sosialhjelp/soknad/feil?reason=sendEttersendelseSaga";
    }
}

function* ettersendelseSaga(): SagaIterator {
    yield takeEvery(EttersendelseActionTypeKeys.NY, opprettEttersendelseSaga);
    yield takeEvery(EttersendelseActionTypeKeys.LAST_OPP, lastOppEttersendelsesVedleggSaga);
    yield takeEvery(EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG, lesEttersendelsesVedleggSaga);
    yield takeEvery(EttersendelseActionTypeKeys.SLETT_VEDLEGG, slettEttersendelsesVedleggSaga);
    yield takeEvery(EttersendelseActionTypeKeys.SEND, sendEttersendelseSaga);
    yield takeEvery(EttersendelseActionTypeKeys.LES_ETTERSENDELSER, lesEttersendelserSaga);
}

export default ettersendelseSaga;
