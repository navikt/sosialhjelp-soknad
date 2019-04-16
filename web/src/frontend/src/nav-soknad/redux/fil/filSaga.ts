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

	const {behandlingsId, formData, opplysning} = action;

	console.warn(opplysning.type);
	yield put(settPendingPaFilOpplasting(opplysning.type));

	const url = `opplastetVedlegg/${behandlingsId}/${opplysning.type}`;


	let response: Fil =
		{
        	"filNavn": "",
    		"uuid": ""
		};

	try {
		response = yield call(fetchUpload, url, formData);
		const filerUpdated: Fil[] = opplysning.filer.map((fil: Fil) => ({...fil}));
		filerUpdated.push(response);
		const opplysningUpdated: Opplysning = {...opplysning};
		opplysningUpdated.filer = filerUpdated;
		yield put(updateOpplysning(opplysningUpdated));
        yield put(settFerdigPaFilOpplasting(opplysning.type));
	} catch (reason) {

        let feilKode: REST_FEIL = detekterInternFeilKode(reason.toString());

        // Kjør feilet kall på nytt for å få tilgang til feilmelding i JSON data:
        response = yield call(fetchUploadIgnoreErrors, url, formData);
        const ID = "id";
        if (response && response[ID]) {
            feilKode = response[ID];
        }
        yield put(lastOppFilFeilet(opplysning.type, feilKode));
        if (feilKode !== REST_FEIL.KRYPTERT_FIL && feilKode !== REST_FEIL.SIGNERT_FIL) {
            yield put(loggFeil("Last opp vedlegg feilet: " + reason.toString()));
        }
        yield put(settFerdigPaFilOpplasting(opplysning.type));
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

    const { behandlingsId, fil, opplysning, opplysningType} = action;

    yield put(settPendingPaFilOpplasting(opplysningType));

    try {
        const url = `opplastetVedlegg/${behandlingsId}/${fil.uuid}`;
        yield call(fetchDelete, url);


        const filerUpdated = opplysning.filer.filter((f: Fil) => {
        	return f.uuid !== fil.uuid;
		});

        const opplysningUpdated: Opplysning = {...opplysning};
        opplysningUpdated.filer = filerUpdated;
        yield put(updateOpplysning(opplysningUpdated));
        yield put(settFerdigPaFilOpplasting(opplysningType));

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
