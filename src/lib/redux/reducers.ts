import {combineReducers} from "redux";
import {valideringsReducer, ValideringState} from "./validering/valideringReducer";

export interface State {
    validering: ValideringState;
}

const reducers = () =>
    combineReducers({
        validering: valideringsReducer,
    });

export default reducers;
