import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import { SoknadAppState } from "../../nav-soknad/redux/reduxTypes";
import FaktumReducer from "../../nav-soknad/redux/fakta/faktaReducer";
import ValideringReducer from "../../nav-soknad/redux/valideringReducer";
import SoknadReducer from "../../nav-soknad/redux/soknad/soknadReducer";
import OppsummeringReducer from "../../nav-soknad/redux/oppsummering/oppsummeringReducer";
import LedeteksterReducer from "../../nav-soknad/redux/ledetekster/ledeteksterReducer";
import MiljovariablerReducer from "../../nav-soknad/redux/miljovariabler/miljovariablerReducer";
import FeatureTogglesReducer from "../../nav-soknad/redux/featuretoggles/featureTogglesReducer";
import TilgangReducer from "../../nav-soknad/redux/tilgang/tilgangReducer";
import SynligeFaktaReducer from "./synligefakta/synligeFaktaReducer";
import { SynligeFaktaState } from "./synligefakta/synligeFaktaTypes";
import ApplikasjonsfeilReducer from "../../nav-soknad/redux/applikasjonsfeil/applikasjonsfeilReducer";
import InitReducer from "../../nav-soknad/redux/init/initReducer";
import VedleggReducer from "../../nav-soknad/redux/vedlegg/vedleggReducer";
import EttersendelseReducer from "../../nav-soknad/redux/ettersendelse/ettersendelseReducer";
import KommunerReducer from "../../nav-soknad/redux/kommuner/kommuneReducer";
import OppholdsadresseReducer from "../skjema/personopplysninger/tps/oppholdsadresseReducer";
import AdresseAutocompleteReducer from "../../nav-soknad/components/adresseAutocomplete/adresseAutocompleteReducer";

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
	vedlegg: VedleggReducer,
	miljovariabler: MiljovariablerReducer,
	featuretoggles: FeatureTogglesReducer,
	applikasjonsfeil: ApplikasjonsfeilReducer,
	ettersendelse: EttersendelseReducer,
	kommuner: KommunerReducer,
	oppholdsadresse: OppholdsadresseReducer,
	adresseAutocomplete: AdresseAutocompleteReducer,
	init: InitReducer
});

export default reducers;
