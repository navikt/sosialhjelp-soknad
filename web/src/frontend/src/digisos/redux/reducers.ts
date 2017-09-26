import SoknadReducer, { SoknadState } from "./soknad/soknadReducer";
import OppsummeringReducer, {
	OppsummeringState
} from "./oppsummering/oppsummeringReducer";
import FaktumReducer from "../../nav-soknad/redux/faktaReducer";
import { SoknadAppState } from "../../nav-soknad/redux/reduxTypes";
import ValideringReducer from "../../nav-soknad/redux/valideringReducer";
import LedeteksterReducer from "./informasjon/informasjonReducer";
import { combineReducers } from "redux";

export interface State extends SoknadAppState {
	soknad: SoknadState;
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
