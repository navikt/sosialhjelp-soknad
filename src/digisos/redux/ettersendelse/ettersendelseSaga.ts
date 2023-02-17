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
} from "../../../nav-soknad/utils/rest-utils";
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
import {Fil} from "../okonomiskeOpplysninger/opplysningerTypes";
import {setShowServerError} from "../soknad/soknadActions";
import {REST_FEIL} from "../soknad/soknadTypes";
import {settFilOpplastingFerdig} from "../okonomiskeOpplysninger/opplysningerActions";
import {logInfo, logWarning} from "../../../nav-soknad/utils/loggerUtils";

function* opprettEttersendelseSaga(action: OpprettEttersendelseAction) {
    try {
        const url = `soknader/opprettSoknad?ettersendTil=${action.brukerbehandlingId}`;
        const response: {brukerBehandlingId: string} = yield call(fetchPost, url, "", true);
        if (response) {
            yield put(lagEttersendelseOk(response.brukerBehandlingId));
            yield put(lesEttersendelsesVedlegg(response.brukerBehandlingId));
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield call(logInfo, "Opprett ettersendelse feilet: " + reason.toString());
        yield put(opprettEttersendelseFeilet(action.brukerbehandlingId));
    }
}

function* lesEttersendelserSaga(action: LesEttersendelserAction) {
    try {
        const url = `ettersendelse/innsendte/${action.brukerbehandlingId}`;
        const response: Behandlingskjede = yield call(fetchToJson, url, true);
        if (response) {
            yield put(settEttersendelser(response));
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield call(logWarning, "Les ettersendelser feilet: " + reason.toString());
        yield put(setShowServerError(true));
    }
}

function* lesEttersendelsesVedleggSaga(action: LesEttersendelsesVedleggAction) {
    try {
        const url = `ettersendelse/ettersendteVedlegg/${action.brukerbehandlingId}`;
        const response: EttersendelseVedleggBackend[] = yield call(fetchToJson, url);
        if (response) {
            yield put(lesEttersendteVedlegg(response));
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield call(logWarning, "Lese ettersendte vedlegg feilet: " + reason.toString());
        yield put(setShowServerError(true));
    }
}

function* slettEttersendelsesVedleggSaga(action: SlettEttersendtVedleggAction): SagaIterator {
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
        yield call(logWarning, "Slett ettersendt vedlegg feilet: " + reason);
        yield put(setShowServerError(true));
    }
}

function* lastOppEttersendelsesVedleggSaga(action: LastOppEttersendtVedleggAction): SagaIterator {
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
        yield call(logInfo, "GlemmeSendKnappStatistikk. Vedlegg lastet opp. BehandingsId: " + behandlingsId);
        if (response) {
            yield put(filLastetOpp(opplysningType, response));
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
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
        yield put(settFilOpplastingFerdig(opplysningType));
    }
}

function* sendEttersendelseSaga(action: SendEttersendelseAction): SagaIterator {
    try {
        yield put({type: EttersendelseActionTypeKeys.ETTERSEND_PENDING});
        const url = `soknader/${action.brukerbehandlingId}/actions/send`;
        yield call(fetchPost, url, JSON.stringify({}), true);
        yield call(
            logInfo,
            "GlemmeSendKnappStatistikk. Ettersendelse sendt. BehandingsId: " + action.brukerbehandlingId
        );
        yield put({type: EttersendelseActionTypeKeys.ETTERSEND_OK});
        yield put(lastOppEttersendtVedleggOk());
        /* FIXME: Jeg har kommentert ut denne koden fordi jeg _tror_ det er en no-op.
             Jeg tror state.soknad.behandlingsId alltid er null når man ikke har en søknad oppe.
        const behandlingsId = yield select((state: State) => state.soknad.behandlingsId);
        if (behandlingsId) {
            yield put(opprettEttersendelse(behandlingsId));
            yield put(lesEttersendelser(behandlingsId));
        }
        */
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        yield call(logWarning, "Send ettersendelse feilet: " + reason.toString());
        yield put(setShowServerError(true));
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
