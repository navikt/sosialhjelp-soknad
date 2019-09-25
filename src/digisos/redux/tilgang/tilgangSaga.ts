import { call, put, takeEvery } from "redux-saga/effects";
import { TilgangActionTypeKeys, TilgangApiResponse } from "./tilgangTypes";
import {fetchToJson, HttpStatus} from "../../../nav-soknad/utils/rest-utils";
import {
	henterTilgang,
	hentetTilgang,
	hentTilgangFeilet
} from "./tilgangActions";
import {loggAdvarsel} from "../navlogger/navloggerActions";
import {tilgangOk} from "../init/initActions";



export default tilgangSaga;
