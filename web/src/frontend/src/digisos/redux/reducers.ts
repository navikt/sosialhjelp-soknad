import SoknadReducer, { SoknadState } from "./soknad/soknadReducer";
import OppsummeringReducer, { OppsummeringState } from "./oppsummering/oppsummeringReducer";
import FaktumReducer, { SoknadAppState } from "../../nav-soknad/redux/faktaReducer";
import ValideringReducer from "../../nav-soknad/redux/validering-reducer";
import LedeteksterReducer from "./informasjon/informasjonReducer";
import { combineReducers } from "redux";

export interface State extends SoknadAppState {
	soknad: SoknadState;
	oppsummering: OppsummeringState;
}

const reducers = combineReducers({
	soknad: SoknadReducer,
	faktum: FaktumReducer,
	oppsummering: OppsummeringReducer,
	validering: ValideringReducer,
	ledetekster: LedeteksterReducer
});

export default reducers;
