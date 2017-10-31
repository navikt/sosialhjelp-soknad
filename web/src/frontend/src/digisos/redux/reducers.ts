import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import { SoknadAppState } from "../../nav-soknad/redux/reduxTypes";
import FaktumReducer from "../../nav-soknad/redux/fakta/faktaReducer";
import ValideringReducer from "../../nav-soknad/redux/valideringReducer";
import OppsummeringReducer from "../../nav-soknad/redux/oppsummering/oppsummeringReducer";
import SoknadReducer from "../../nav-soknad/redux/soknadReducer";
import LedeteksterReducer from "../../nav-soknad/redux/ledetekster/ledeteksterReducer";
import TilgangReducer from "../../nav-soknad/redux/tilgang/tilgangReducer";
import { TilgangState } from "../../nav-soknad/redux/tilgang/tilgangTypes";
import SynligeFaktaReducer from "./synligefakta/synligeFaktaReducer";
import { SynligeFaktaState } from "./synligefakta/synligeFaktaTypes";
import MiljovariablerReducer from "./miljovariabler/miljovariablerReducer";
import ApplikasjonsfeilReducer from "../../nav-soknad/redux/applikasjonsfeil/applikasjonsfeilReducer";

export interface State extends SoknadAppState {
	synligefakta: SynligeFaktaState;
	tilgang: TilgangState;
}

const reducers = combineReducers({
	router: routerReducer,
	soknad: SoknadReducer,
	fakta: FaktumReducer,
	oppsummering: OppsummeringReducer,
	validering: ValideringReducer,
	ledetekster: LedeteksterReducer,
	tilgang: TilgangReducer,
	synligefakta: SynligeFaktaReducer,
	miljovariabler: MiljovariablerReducer,
	applikasjonsfeil: ApplikasjonsfeilReducer
});

export default reducers;
