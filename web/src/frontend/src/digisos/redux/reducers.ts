import { combineReducers } from "redux";

export { SoknadAppState as State } from "../../nav-soknad/redux/reduxTypes";
import FaktumReducer from "../../nav-soknad/redux/faktaReducer";
import ValideringReducer from "../../nav-soknad/redux/valideringReducer";
import OppsummeringReducer from "../../nav-soknad/redux/oppsummeringReducer";
import SoknadReducer from "../../nav-soknad/redux/soknadReducer";
import LedeteksterReducer from "../../nav-soknad/redux/informasjonReducer";

const reducers = combineReducers({
	soknad: SoknadReducer,
	fakta: FaktumReducer,
	oppsummering: OppsummeringReducer,
	validering: ValideringReducer,
	ledetekster: LedeteksterReducer
});

export default reducers;
