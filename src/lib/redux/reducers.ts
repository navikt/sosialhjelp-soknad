import {combineReducers} from "redux";
import {valideringsReducer, ValideringState} from "./validering/valideringReducer";
import OppsummeringReducer, {OppsummeringState} from "./oppsummering/oppsummeringReducer";
import EttersendelseReducer from "./ettersendelse/ettersendelseReducer";
import {EttersendelseState} from "./ettersendelse/ettersendelseTypes";

export interface State {
    oppsummering: OppsummeringState;
    ettersendelse: EttersendelseState;
    validering: ValideringState;
}

const reducers = () =>
    combineReducers({
        oppsummering: OppsummeringReducer,
        ettersendelse: EttersendelseReducer,
        validering: valideringsReducer,
    });

export default reducers;
