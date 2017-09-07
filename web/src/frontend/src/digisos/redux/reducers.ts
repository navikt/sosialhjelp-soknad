import SoknadReducer, { SoknadState } from "./soknad/reducer";
import OppsummeringReducer, { OppsummeringState } from "./oppsummering/reducer";
import FaktumReducer, { FaktumAppState } from "../../nav-soknad/redux/reducer";
import ValideringReducer from "../../nav-soknad/redux/validering-reducer";
import { combineReducers } from "redux";

export interface State extends FaktumAppState {
	soknad: SoknadState;
	oppsummering: OppsummeringState;
}

const reducers = combineReducers({
	soknad: SoknadReducer,
	faktum: FaktumReducer,
	oppsummering: OppsummeringReducer,
	validering: ValideringReducer
});

export default reducers;
