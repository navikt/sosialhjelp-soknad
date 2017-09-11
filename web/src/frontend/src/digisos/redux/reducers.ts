import SoknadReducer, { SoknadState } from "./soknad/reducer";
import OppsummeringReducer, { OppsummeringState } from "./oppsummering/reducer";
import FaktumReducer, { FaktumAppState } from "../../nav-soknad/redux/reducer";
import ValideringReducer from "../../nav-soknad/redux/validering-reducer";
import LedeteksterReducer from "./informasjon/informasjonReducer";
import { combineReducers } from "redux";

export interface State extends FaktumAppState {
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
