import {combineReducers} from "redux";
import {valideringsReducer, ValideringState} from "./validering/valideringReducer";
import SoknadReducer from "./soknad/soknadReducer";
import OppsummeringReducer, {OppsummeringState} from "./oppsummering/oppsummeringReducer";
import LedeteksterReducer from "./ledetekster/ledeteksterReducer";
import MiljovariablerReducer from "./miljovariabler/miljovariablerReducer";
import FeatureTogglesReducer from "./featuretoggles/featureTogglesReducer";
import TilgangReducer from "./tilgang/tilgangReducer";
import {applikasjonsfeilReducer, ApplikasjonsfeilState} from "./applikasjonsfeil/applikasjonsfeilReducer";
import InitReducer from "./init/initReducer";
import VedleggReducer from "./vedlegg/vedleggReducer";
import EttersendelseReducer from "./ettersendelse/ettersendelseReducer";
import MockReducer, {MockState} from "../mock/mockReducer";
import SoknadsdataReducer, {Soknadsdata} from "./soknadsdata/soknadsdataReducer";
import { opplysningerReducer } from "./okonomiskeOpplysninger/opplysningerReducer";
import {filReducer} from "./fil/filReducer";
import {SoknadState} from "./reduxTypes";
import {LedetekstState} from "./ledetekster/ledeteksterTypes";
import {TilgangState} from "./tilgang/tilgangTypes";
import {VedleggState} from "./vedlegg/vedleggTypes";
import {MiljovariablerApiType} from "./miljovariabler/miljovariablerTypes";
import {FeatureTogglesApiType} from "./featuretoggles/featureTogglesTypes";
import {EttersendelseState} from "./ettersendelse/ettersendelseTypes";
import {InitState} from "./init/initTypes";
import {OpplysningerModel} from "./okonomiskeOpplysninger/opplysningerTypes";
import {FilState} from "./fil/filTypes";
import {connectRouter, RouterState} from "connected-react-router";
import AuthenticationReducer from "./authentication/authenticationReducer";
import {AuthenticationState} from "./authentication/authenticationTypes";


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
	authentication: AuthenticationState;
}

export default (history: any) => combineReducers({
	router: connectRouter(history),
	soknad: SoknadReducer,
	oppsummering: OppsummeringReducer,
	validering: valideringsReducer,
	ledetekster: LedeteksterReducer,
	tilgang: TilgangReducer,
	vedlegg: VedleggReducer,
	miljovariabler: MiljovariablerReducer,
	featuretoggles: FeatureTogglesReducer,
	applikasjonsfeil: applikasjonsfeilReducer,
	ettersendelse: EttersendelseReducer,
	init: InitReducer,
	mockData: MockReducer,
	soknadsdata: SoknadsdataReducer,
	okonomiskeOpplysninger: opplysningerReducer,
	filopplasting: filReducer,
	authentication: AuthenticationReducer
});
