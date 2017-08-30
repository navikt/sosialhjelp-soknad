import "whatwg-fetch";
import "babel-polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import App from "./app";
import thunk from "redux-thunk";
import SoknadReducer from "./redux/soknad/reducer";
import FaktumReducer from "./skjema/reducer";
import IntlProvider from "./intlProvider";
import "./index.css";
import { erDev } from "./utils";

const rootReducer = combineReducers({
	soknad: SoknadReducer,
	faktumStore: FaktumReducer
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
	<IntlProvider>
		<Provider store={store}>
			<BrowserRouter basename="soknadsosialhjelp">
				<App />
			</BrowserRouter>
		</Provider>
	</IntlProvider>,
	document.getElementById("root") as HTMLElement
);

export { store };

registerServiceWorker();
