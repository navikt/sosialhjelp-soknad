import {combineReducers} from "redux";
import {valideringsReducer, ValideringState} from "./validering/valideringReducer";
import SoknadReducer from "./soknad/soknadReducer";
import OppsummeringReducer, {OppsummeringState} from "./oppsummering/oppsummeringReducer";
import LedeteksterReducer from "./ledetekster/ledeteksterReducer";
import MiljovariablerReducer from "./miljovariabler/miljovariablerReducer";
import EttersendelseReducer from "./ettersendelse/ettersendelseReducer";
import SoknadsdataReducer, {Soknadsdata} from "./soknadsdata/soknadsdataReducer";
import {opplysningerReducer} from "./okonomiskeOpplysninger/opplysningerReducer";
import {filReducer} from "./fil/filReducer";
import {EttersendelseState} from "./ettersendelse/ettersendelseTypes";
import {OpplysningerModel} from "./okonomiskeOpplysninger/opplysningerTypes";
import {FilState} from "./fil/filTypes";
import {connectRouter, RouterState} from "connected-react-router";
import {SoknadState} from "./soknad/soknadTypes";
import {MiljovariablerState} from "./miljovariabler/miljovariablerTypes";
import {LedeteksterState} from "./ledetekster/ledeteksterTypes";
import {navloggerReducer} from "./navlogger/navloggerReducer";

export interface State {
    router: RouterState;
    soknad: SoknadState;

    ledetekster: LedeteksterState;
    miljovariabler: MiljovariablerState;

    soknadsdata: Soknadsdata;
    okonomiskeOpplysninger: OpplysningerModel;
    filopplasting: FilState;
    oppsummering: OppsummeringState;
    ettersendelse: EttersendelseState;

    validering: ValideringState;
}

const reducers = (history: any) =>
    combineReducers({
        router: connectRouter(history),
        soknad: SoknadReducer,

        ledetekster: LedeteksterReducer,
        miljovariabler: MiljovariablerReducer,

        soknadsdata: SoknadsdataReducer,
        okonomiskeOpplysninger: opplysningerReducer,
        filopplasting: filReducer,
        oppsummering: OppsummeringReducer,
        ettersendelse: EttersendelseReducer,

        validering: valideringsReducer,

        navlogger: navloggerReducer,
    });

export default reducers;
