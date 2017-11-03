import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import { SoknadAppState } from "../../nav-soknad/redux/reduxTypes";
import FaktumReducer from "../../nav-soknad/redux/fakta/faktaReducer";
import ValideringReducer from "../../nav-soknad/redux/valideringReducer";
import SoknadReducer from "../../nav-soknad/redux/soknad/soknadReducer";
import OppsummeringReducer from "../../nav-soknad/redux/oppsummering/oppsummeringReducer";
import LedeteksterReducer from "../../nav-soknad/redux/ledetekster/ledeteksterReducer";
import MiljovariablerReducer from "../../nav-soknad/redux/miljovariabler/miljovariablerReducer";
import TilgangReducer from "../../nav-soknad/redux/tilgang/tilgangReducer";
import SynligeFaktaReducer from "./synligefakta/synligeFaktaReducer";
import { SynligeFaktaState } from "./synligefakta/synligeFaktaTypes";
import ApplikasjonsfeilReducer from "../../nav-soknad/redux/applikasjonsfeil/applikasjonsfeilReducer";
import InitReducer from "../../nav-soknad/redux/init/initReducer";

export interface State extends SoknadAppState {
	synligefakta: SynligeFaktaState;
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
	applikasjonsfeil: ApplikasjonsfeilReducer,
	init: InitReducer
});

export default reducers;
