import "whatwg-fetch";
import "babel-polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import App from "./digisos";
import thunk from "redux-thunk";
import { erDev } from "./nav-soknad/utils/rest-utils";
import IntlProvider from "./intlProvider";
import reducers from "./digisos/redux/reducers";
import sagas from "./rootSaga";

import "./index.css";

function configureStore() {
	/* tslint:disable */
	const devtools: any =
		/* tslint:disable-next-line */
		window["devToolsExtension"] && erDev()
			? /* tslint:disable-next-line */
				window["devToolsExtension"]()
			: (f: any) => f;
	/* tslint:enable */
	const saga = createSagaMiddleware();
	const middleware = applyMiddleware(thunk, saga);
	const createdStore = createStore(reducers, devtools, middleware);
	saga.run(sagas);
	return createdStore;
}

const store = configureStore();
ReactDOM.render(
	<Provider store={store}>
		<IntlProvider>
			<BrowserRouter basename="soknadsosialhjelp">
				<App intl={null}/>
			</BrowserRouter>
		</IntlProvider>
	</Provider>,
	document.getElementById("root") as HTMLElement
);
