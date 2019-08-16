import {FilActionTypeKeys, LastOppFilAction, StartSlettFilAction} from "./filTypes";
import {SagaIterator} from "redux-saga";
import {
    fetchDelete,
    fetchUpload,
    fetchUploadIgnoreErrors, responseToJson,
    sjekkStatusKodeSaga,
    statusCodeOk,
} from "../../utils/rest-utils";
import {call, put, takeEvery} from "redux-saga/effects";
import {loggFeil, loggInfo} from "../navlogger/navloggerActions";
import {
    settFilOpplastingFerdig,
    settFilOpplastingPending,
    updateOpplysning
} from "../okonomiskeOpplysninger/opplysningerActions";
import {Fil, Opplysning, VedleggStatus} from "../okonomiskeOpplysninger/opplysningerTypes";
import {navigerTilServerfeil} from "../navigasjon/navigasjonActions";
import {lastOppFilFeilet} from "./filActions";
import {REST_FEIL} from "../../types/restFeilTypes";
import {TilgangApiResponse} from "../tilgang/tilgangTypes";
import {hentetTilgang} from "../tilgang/tilgangActions";


function* lastOppFilSaga(action: LastOppFilAction) {

    const {behandlingsId, formData, opplysning} = action;
    const url = `opplastetVedlegg/${behandlingsId}/${opplysning.type}`;

    yield put(settFilOpplastingPending(opplysning.type));

    let jsonResponse: Fil =
        {
            "filNavn": "",
            "uuid": ""
        };

    try {
        const response: Response = yield call(fetchUpload, url, formData)

        yield sjekkStatusKodeSaga(response);
        if(statusCodeOk(response)){
            const tilgangApiResponse: TilgangApiResponse = yield responseToJson(response);
            yield put(hentetTilgang(tilgangApiResponse.harTilgang, tilgangApiResponse.sperrekode));

            const filerUpdated: Fil[] = opplysning.filer.map((fil: Fil) => ({...fil}));
            jsonResponse = yield responseToJson(response);
            filerUpdated.push(jsonResponse);
            const opplysningUpdated: Opplysning = {...opplysning};
            opplysningUpdated.filer = filerUpdated;
            opplysningUpdated.vedleggStatus = VedleggStatus.LASTET_OPP;
            yield put(updateOpplysning(opplysningUpdated));
            yield put(settFilOpplastingFerdig(opplysning.type));
        }
    } catch (reason) {

        let feilKode: REST_FEIL = detekterInternFeilKode(reason.toString());
        // Kjør feilet kall på nytt for å få tilgang til feilmelding i JSON data:
        const responseSecond: Response = yield call(fetchUploadIgnoreErrors, url, formData);
        jsonResponse = yield responseToJson(responseSecond);
        const ID = "id";
        // @ts-ignore
        if (jsonResponse && jsonResponse[ID]) {
            // @ts-ignore
            feilKode = jsonResponse[ID];
        }
        yield put(lastOppFilFeilet(opplysning.type, feilKode));
        if (feilKode !== REST_FEIL.KRYPTERT_FIL && feilKode !== REST_FEIL.SIGNERT_FIL) {
            yield put(loggInfo("Last opp vedlegg feilet: " + reason.toString()));
        }
        yield put(settFilOpplastingFerdig(opplysning.type));
    }
}

export function detekterInternFeilKode(feilKode: REST_FEIL): REST_FEIL {
    let internFeilKode = feilKode;
    if (feilKode.match(/Request Entity Too Large/i)) {
        internFeilKode = REST_FEIL.FOR_STOR_FIL;
    }
    if (feilKode.match(/Unsupp?orted Media Type/i)) {
        internFeilKode = REST_FEIL.FEIL_FILTPYE;
    }
    return internFeilKode;
}

function* slettFilSaga(action: StartSlettFilAction): SagaIterator {

    const {behandlingsId, fil, opplysning, opplysningType} = action;

    yield put(settFilOpplastingPending(opplysningType));

    try {
        const url = `opplastetVedlegg/${behandlingsId}/${fil.uuid}`;
        yield call(fetchDelete, url);

        const filerUpdated = opplysning.filer.filter((f: Fil) => {
            return f.uuid !== fil.uuid;
        });

        const opplysningUpdated: Opplysning = {...opplysning};
        opplysningUpdated.filer = filerUpdated;

        if (opplysningUpdated.filer.length === 0) {
            opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGG_KREVES;
        }

        yield put(updateOpplysning(opplysningUpdated));
        yield put(settFilOpplastingFerdig(opplysningType));

    } catch (reason) {
        yield put(loggFeil("Slett vedlegg feilet: " + reason));
        yield put(navigerTilServerfeil());
    }
}

function* filSaga(): SagaIterator {
    yield takeEvery(FilActionTypeKeys.LAST_OPP, lastOppFilSaga);
    yield takeEvery(FilActionTypeKeys.START_SLETT_FIL, slettFilSaga);
}

export default filSaga;
