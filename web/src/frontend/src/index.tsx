import "whatwg-fetch";
import "babel-polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import App from "./digisos";
import thunk from "redux-thunk";
import { erDev } from "./digisos/redux/rest-utils";
import SoknadReducer from "./digisos/redux/soknad/reducer";
import FaktumReducer from "./nav-soknad/redux/reducer";
import LedeteksterReducer from './redux/informasjon/informasjonReducer';
import IntlProvider from "./intlProvider";
import "./index.css";

const rootReducer = combineReducers({
	soknad: SoknadReducer,
	faktumStore: FaktumReducer,
	ledetekster: LedeteksterReducer
});

function configureStore() {
	/* tslint:disable */
	const devtools: any =
		/* tslint:disable-next-line */
		window["devToolsExtension"] && erDev()
			? /* tslint:disable-next-line */
				window["devToolsExtension"]()
			: (f: any) => f;
	/* tslint:enable */
	const middleware = applyMiddleware(thunk);
	return middleware(devtools(createStore))(rootReducer);
}

const store = configureStore();
ReactDOM.render(
	<Provider store={store}>
		<IntlProvider>
			<BrowserRouter basename="soknadsosialhjelp">
				<App />
			</BrowserRouter>
		</IntlProvider>
	</Provider>,
	document.getElementById('root') as HTMLElement
);

export { store };
