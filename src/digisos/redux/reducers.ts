import {combineReducers} from "redux";
import {valideringsReducer, ValideringState} from "./validering/valideringReducer";
import SoknadReducer from "./soknad/soknadReducer";
import OppsummeringReducer, {OppsummeringState} from "./oppsummering/oppsummeringReducer";
import EttersendelseReducer from "./ettersendelse/ettersendelseReducer";
import SoknadsdataReducer, {Soknadsdata} from "./soknadsdata/soknadsdataReducer";
import {opplysningerReducer} from "./okonomiskeOpplysninger/opplysningerReducer";
import {EttersendelseState} from "./ettersendelse/ettersendelseTypes";
import {OpplysningerModel} from "./okonomiskeOpplysninger/opplysningerTypes";
import {SoknadState} from "./soknad/soknadTypes";

export interface State {
    soknad: SoknadState;

    soknadsdata: Soknadsdata;
    okonomiskeOpplysninger: OpplysningerModel;
    oppsummering: OppsummeringState;
    ettersendelse: EttersendelseState;

    validering: ValideringState;
}

const reducers = () =>
    combineReducers({
        soknad: SoknadReducer,

        soknadsdata: SoknadsdataReducer,
        okonomiskeOpplysninger: opplysningerReducer,
        oppsummering: OppsummeringReducer,
        ettersendelse: EttersendelseReducer,

        validering: valideringsReducer,
    });

export default reducers;
