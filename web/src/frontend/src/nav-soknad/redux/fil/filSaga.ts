import {FilActionTypeKeys, LastOppFilAction, StartSlettFilAction} from "./filTypes";
import {SagaIterator} from "redux-saga";
import { fetchDelete, fetchUpload, fetchUploadIgnoreErrors,} from "../../utils/rest-utils";
import {call, put, takeEvery} from "redux-saga/effects";
import {loggFeil} from "../navlogger/navloggerActions";
import {
    settFerdigPaFilOpplasting,
    settPendingPaFilOpplasting,
    updateOpplysning
} from "../okonomiskeOpplysninger/OkonomiskeOpplysningerActions";
import {Fil, Opplysning} from "../okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {navigerTilServerfeil} from "../navigasjon/navigasjonActions";
import {lastOppFilFeilet} from "./filActions";
import {REST_FEIL} from "../../types/restFeilTypes";


function* lastOppFilSaga(action: LastOppFilAction): SagaIterator {
	const url = `opplastetVedlegg/${action.behandlingsId}/${action.opplysningType}`;

	yield put(settPendingPaFilOpplasting(action.opplysningType, action.opplysning.gruppe));

	let response: Fil =
		{
        	"filNavn": "",
    		"uuid": ""
		};

	try {
		response = yield call(fetchUpload, url, action.formData);
		const filerUpdated: Fil[] = action.opplysning.filer.map((fil: Fil) => ({...fil}));
		filerUpdated.push(response);
		const opplysning: Opplysning = action.opplysning;
		const opplysningUpdated: Opplysning = {...opplysning};
		opplysningUpdated.filer = filerUpdated;
		yield put(updateOpplysning(opplysningUpdated));
        yield put(settFerdigPaFilOpplasting(action.opplysningType, action.opplysning.gruppe));
	} catch (reason) {

        let feilKode: REST_FEIL = detekterInternFeilKode(reason.toString());

        // Kjør feilet kall på nytt for å få tilgang til feilmelding i JSON data:
        response = yield call(fetchUploadIgnoreErrors, url, action.formData);
        const ID = "id";
        if (response && response[ID]) {
            feilKode = response[ID];
        }
        yield put(lastOppFilFeilet(action.opplysningType, feilKode));
        if (feilKode !== REST_FEIL.KRYPTERT_FIL && feilKode !== REST_FEIL.SIGNERT_FIL) {
            yield put(loggFeil("Last opp vedlegg feilet: " + reason.toString()));
        }
		console.warn("Feil ved opplasting av fil: " + reason.toString());
        yield put(settFerdigPaFilOpplasting(action.opplysningType, action.opplysning.gruppe));
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

    yield put(settPendingPaFilOpplasting(action.opplysningType, action.opplysning.gruppe));

    try {
        const url = `opplastetVedlegg/${action.behandlingsId}/${action.fil.uuid}`;
        yield call(fetchDelete, url);


        const filerUpdated = action.opplysning.filer.filter((fil: Fil) => {
        	return fil.uuid !== action.fil.uuid;
		});

        const opplysning: Opplysning = action.opplysning;
        const opplysningUpdated: Opplysning = {...opplysning};
        opplysningUpdated.filer = filerUpdated;
        yield put(updateOpplysning(opplysningUpdated));
        yield put(settFerdigPaFilOpplasting(action.opplysningType, action.opplysning.gruppe));

	} catch (reason) {
		yield put(loggFeil("Slett vedlegg feilet: " + reason));

		// TODO:
		// Burde kanskje gjøre noe annet enn dette?
		yield put(navigerTilServerfeil());
	}
}


function* filSaga(): SagaIterator {
	yield takeEvery(FilActionTypeKeys.LAST_OPP, lastOppFilSaga);
	yield takeEvery(FilActionTypeKeys.START_SLETT_FIL, slettFilSaga);
}

export default filSaga;
