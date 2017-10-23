import { combineReducers } from "redux";

import { SoknadAppState } from "../../nav-soknad/redux/reduxTypes";
import FaktumReducer from "../../nav-soknad/redux/faktaReducer";
import ValideringReducer from "../../nav-soknad/redux/valideringReducer";
import OppsummeringReducer from "../../nav-soknad/redux/oppsummeringReducer";
import SoknadReducer from "../../nav-soknad/redux/soknadReducer";
import LedeteksterReducer from "../../nav-soknad/redux/ledetekster/ledeteksterReducer";
import SynligeFaktaReducer from "./synligefakta/synligeFaktaReducer";
import { SynligeFaktaState } from "./synligefakta/synligeFaktaTypes";
import MiljovariablerReducer from "./informasjon/miljovariablerReducer";
import ApplikasjonsfeilReducer from "../../nav-soknad/redux/applikasjonsfeil/applikasjonsfeilReducer";

export interface State extends SoknadAppState {
	synligefakta: SynligeFaktaState;
}

const reducers = combineReducers({
	soknad: SoknadReducer,
	fakta: FaktumReducer,
	oppsummering: OppsummeringReducer,
	validering: ValideringReducer,
	ledetekster: LedeteksterReducer,
	synligefakta: SynligeFaktaReducer,
	miljovariabler: MiljovariablerReducer,
	applikasjonsfeil: ApplikasjonsfeilReducer
});

export default reducers;
