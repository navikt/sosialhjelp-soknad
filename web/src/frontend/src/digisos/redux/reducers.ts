import { combineReducers } from "redux";
import {routerReducer, RouterState} from "react-router-redux";
import ValideringReducer, {ValideringState} from "../../nav-soknad/redux/valideringReducer";
import SoknadReducer from "../../nav-soknad/redux/soknad/soknadReducer";
import OppsummeringReducer, {OppsummeringState} from "../../nav-soknad/redux/oppsummering/oppsummeringReducer";
import LedeteksterReducer from "../../nav-soknad/redux/ledetekster/ledeteksterReducer";
import MiljovariablerReducer from "../../nav-soknad/redux/miljovariabler/miljovariablerReducer";
import FeatureTogglesReducer from "../../nav-soknad/redux/featuretoggles/featureTogglesReducer";
import TilgangReducer from "../../nav-soknad/redux/tilgang/tilgangReducer";
import ApplikasjonsfeilReducer, {ApplikasjonsfeilState} from "../../nav-soknad/redux/applikasjonsfeil/applikasjonsfeilReducer";
import InitReducer from "../../nav-soknad/redux/init/initReducer";
import VedleggReducer from "../../nav-soknad/redux/vedlegg/vedleggReducer";
import EttersendelseReducer from "../../nav-soknad/redux/ettersendelse/ettersendelseReducer";
import MockReducer, {MockState} from "../mock/mockReducer";
import SoknadsdataReducer, {Soknadsdata} from "../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import OpplysningerReducer from "../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerReducer";
import FilReducer from "../../nav-soknad/redux/fil/filReducer";
import {SoknadState} from "../../nav-soknad/redux/reduxTypes";
import {LedetekstState} from "../../nav-soknad/redux/ledetekster/ledeteksterTypes";
import {TilgangState} from "../../nav-soknad/redux/tilgang/tilgangTypes";
import {VedleggState} from "../../nav-soknad/redux/vedlegg/vedleggTypes";
import {MiljovariablerApiType} from "../../nav-soknad/redux/miljovariabler/miljovariablerTypes";
import {FeatureTogglesApiType} from "../../nav-soknad/redux/featuretoggles/featureTogglesTypes";
import {EttersendelseState} from "../../nav-soknad/redux/ettersendelse/ettersendelseTypes";
import {InitState} from "../../nav-soknad/redux/init/initTypes";
import {OpplysningerModel} from "../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerTypes";
import {FilState} from "../../nav-soknad/redux/fil/filTypes";


export interface State {
	router: RouterState;
	soknad: SoknadState;
	oppsummering: OppsummeringState;
	validering: ValideringState;
	ledetekster: LedetekstState;
	tilgang: TilgangState;
	vedlegg: VedleggState;
	miljovariabler: MiljovariablerApiType;
	featuretoggles: FeatureTogglesApiType;
	applikasjonsfeil: ApplikasjonsfeilState;
	ettersendelse: EttersendelseState;
	init: InitState;
	mockData: MockState;
	soknadsdata: Soknadsdata;
	okonomiskeOpplysninger: OpplysningerModel;
	filopplasting: FilState;
}

const reducers = combineReducers({
	router: routerReducer,
	soknad: SoknadReducer,
	oppsummering: OppsummeringReducer,
	validering: ValideringReducer,
	ledetekster: LedeteksterReducer,
	tilgang: TilgangReducer,
	vedlegg: VedleggReducer,
	miljovariabler: MiljovariablerReducer,
	featuretoggles: FeatureTogglesReducer,
	applikasjonsfeil: ApplikasjonsfeilReducer,
	ettersendelse: EttersendelseReducer,
	init: InitReducer,
	mockData: MockReducer,
	soknadsdata: SoknadsdataReducer,
	okonomiskeOpplysninger: OpplysningerReducer,
	filopplasting: FilReducer
});

export default reducers;
