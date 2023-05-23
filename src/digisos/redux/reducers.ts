import {combineReducers} from "redux";
import {valideringsReducer, ValideringState} from "./validering/valideringReducer";
import OppsummeringReducer, {OppsummeringState} from "./oppsummering/oppsummeringReducer";
import EttersendelseReducer from "./ettersendelse/ettersendelseReducer";
import SoknadsdataReducer, {Soknadsdata} from "./soknadsdata/soknadsdataReducer";
import {EttersendelseState} from "./ettersendelse/ettersendelseTypes";

export interface State {
    soknadsdata: Soknadsdata;
    oppsummering: OppsummeringState;
    ettersendelse: EttersendelseState;
    validering: ValideringState;
}

const reducers = () =>
    combineReducers({
        soknadsdata: SoknadsdataReducer,
        oppsummering: OppsummeringReducer,
        ettersendelse: EttersendelseReducer,

        validering: valideringsReducer,
    });

export default reducers;
