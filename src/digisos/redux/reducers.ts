import {combineReducers} from "redux";
import {valideringsReducer, ValideringState} from "./validering/valideringReducer";
import SoknadReducer from "./soknad/soknadReducer";
import OppsummeringReducer, {OppsummeringState} from "./oppsummering/oppsummeringReducer";
import LedeteksterReducer from "./ledetekster/ledeteksterReducer";
import MiljovariablerReducer from "./miljovariabler/miljovariablerReducer";
import FeatureTogglesReducer from "./featuretoggles/featureTogglesReducer";
import {applikasjonsfeilReducer, ApplikasjonsfeilState} from "./applikasjonsfeil/applikasjonsfeilReducer";
import EttersendelseReducer from "./ettersendelse/ettersendelseReducer";
import MockReducer, {MockState} from "../mock/mockReducer";
import SoknadsdataReducer, {Soknadsdata} from "./soknadsdata/soknadsdataReducer";
import { opplysningerReducer } from "./okonomiskeOpplysninger/opplysningerReducer";
import {filReducer} from "./fil/filReducer";
import {FeatureTogglesApiType} from "./featuretoggles/featureTogglesTypes";
import {EttersendelseState} from "./ettersendelse/ettersendelseTypes";
import {OpplysningerModel} from "./okonomiskeOpplysninger/opplysningerTypes";
import {FilState} from "./fil/filTypes";
import {connectRouter, RouterState} from "connected-react-router";
import {SoknadState} from "./soknad/soknadTypes";
import {MiljovariablerState} from "./miljovariabler/miljovariablerTypes";
import {LedeteksterState} from "./ledetekster/ledeteksterTypes";


export interface State {
	router: RouterState;
	soknad: SoknadState;

	ledetekster: LedeteksterState;
	miljovariabler: MiljovariablerState;

	soknadsdata: Soknadsdata;

	applikasjonsfeil: ApplikasjonsfeilState;
	validering: ValideringState;
	featuretoggles: FeatureTogglesApiType;

	okonomiskeOpplysninger: OpplysningerModel;
	filopplasting: FilState;
	oppsummering: OppsummeringState;
	ettersendelse: EttersendelseState;

	mockData: MockState;
}

export default (history: any) => combineReducers({
	router: connectRouter(history),
	soknad: SoknadReducer,

	ledetekster: LedeteksterReducer,
	miljovariabler: MiljovariablerReducer,

	soknadsdata: SoknadsdataReducer,

	applikasjonsfeil: applikasjonsfeilReducer,
	validering: valideringsReducer,
	featuretoggles: FeatureTogglesReducer,

	okonomiskeOpplysninger: opplysningerReducer,
	filopplasting: filReducer,
	oppsummering: OppsummeringReducer,
	ettersendelse: EttersendelseReducer,

	mockData: MockReducer,
});
