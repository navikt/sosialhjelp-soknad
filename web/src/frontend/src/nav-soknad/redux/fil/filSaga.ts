import {FilActionTypeKeys, LastOppFilAction, StartSlettFilAction} from "./filTypes";
import {SagaIterator} from "redux-saga";
import {
    fetchDelete,
    fetchUpload,
} from "../../utils/rest-utils";
import {call, put, takeEvery} from "redux-saga/effects";
import {loggFeil} from "../navlogger/navloggerActions";
import {
    settFerdigPaFilOpplasting,
    settPendingPaFilOpplasting, updateOpplysning
} from "../okonomiskeOpplysninger/OkonomiskeOpplysningerActions";
import {Fil, Opplysning} from "../okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {navigerTilServerfeil} from "../navigasjon/navigasjonActions";



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
		console.warn("Feil ved opplasting av fil: " + reason.toString());
        yield put(settFerdigPaFilOpplasting(action.opplysningType, action.opplysning.gruppe));
    }
}
//
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
