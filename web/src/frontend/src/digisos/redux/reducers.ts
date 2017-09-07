import SoknadReducer, { SoknadState } from "./soknad/reducer";
import OppsummeringReducer, { OppsummeringState } from "./oppsummering/reducer";
import FaktumReducer, { FaktumAppState } from "../../nav-soknad/redux/reducer";
import ValidationReducer, {
	ValidationState
} from "../../nav-soknad/redux/validation-reducer";
import { combineReducers } from "redux";

export interface State extends FaktumAppState {
	soknad: SoknadState;
	oppsummering: OppsummeringState;
	validation: ValidationState;
}

const reducers = combineReducers({
	soknad: SoknadReducer,
	faktum: FaktumReducer,
	oppsummering: OppsummeringReducer,
	validation: ValidationReducer
});

export default reducers;
