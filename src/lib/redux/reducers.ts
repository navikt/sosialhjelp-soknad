import {combineReducers} from "redux";
import {valideringsReducer, ValideringState} from "./validering/valideringReducer";
import OppsummeringReducer, {OppsummeringState} from "./oppsummering/oppsummeringReducer";

export interface State {
    oppsummering: OppsummeringState;
    validering: ValideringState;
}

const reducers = () =>
    combineReducers({
        oppsummering: OppsummeringReducer,
        validering: valideringsReducer,
    });

export default reducers;
