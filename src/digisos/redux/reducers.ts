import {combineReducers} from "redux";
import {valideringsReducer, ValideringState} from "./validering/valideringReducer";
import OppsummeringReducer, {OppsummeringState} from "./oppsummering/oppsummeringReducer";
import EttersendelseReducer from "./ettersendelse/ettersendelseReducer";
import SoknadsdataReducer, {Soknadsdata} from "./soknadsdata/soknadsdataReducer";
import {opplysningerReducer} from "./okonomiskeOpplysninger/opplysningerReducer";
import {EttersendelseState} from "./ettersendelse/ettersendelseTypes";
import {OpplysningerModel} from "./okonomiskeOpplysninger/opplysningerTypes";

export interface State {
    soknadsdata: Soknadsdata;
    okonomiskeOpplysninger: OpplysningerModel;
    oppsummering: OppsummeringState;
    ettersendelse: EttersendelseState;

    validering: ValideringState;
}

const reducers = () =>
    combineReducers({
        soknadsdata: SoknadsdataReducer,
        okonomiskeOpplysninger: opplysningerReducer,
        oppsummering: OppsummeringReducer,
        ettersendelse: EttersendelseReducer,

        validering: valideringsReducer,
    });

export default reducers;
