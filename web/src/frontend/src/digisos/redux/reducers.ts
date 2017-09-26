import { combineReducers } from "redux";

import FaktumReducer from "../../nav-soknad/redux/faktaReducer";
import { SoknadAppState } from "../../nav-soknad/redux/reduxTypes";
import ValideringReducer from "../../nav-soknad/redux/valideringReducer";

import SoknadReducer from "./soknad/soknadReducer";
import OppsummeringReducer, {
	OppsummeringState
} from "./oppsummering/oppsummeringReducer";
import LedeteksterReducer from "./informasjon/informasjonReducer";

export interface State extends SoknadAppState {
	oppsummering: OppsummeringState;
}

const reducers = combineReducers({
	soknad: SoknadReducer,
	fakta: FaktumReducer,
	oppsummering: OppsummeringReducer,
	validering: ValideringReducer,
	ledetekster: LedeteksterReducer
});

export default reducers;
