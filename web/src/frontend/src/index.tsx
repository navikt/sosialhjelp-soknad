import "whatwg-fetch";
import "babel-polyfill";
import "intl";
import "intl/locale-data/jsonp/nb-NO.js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import App from "./digisos";
import thunk from "redux-thunk";
import { erDev } from "./nav-soknad/utils/rest-utils";
import IntlProvider from "./intlProvider";
import reducers from "./digisos/redux/reducers";
import sagas from "./rootSaga";
import { avbrytSoknad } from "./nav-soknad/redux/soknad/soknadActions";
import { SoknadState } from "./nav-soknad/redux/reduxTypes";

import "./index.css";
import { loggException } from "./nav-soknad/redux/navlogger/navloggerActions";

const history = createHistory({
	getUserConfirmation: (msg: any, callback: (flag: boolean) => void) => {
		const soknad: SoknadState = store.getState().soknad;
		if (soknad.data.brukerBehandlingId && soknad.avbrytSoknadSjekkAktiv) {
			store.dispatch(avbrytSoknad("START"));
			callback(false);
		} else {
			callback(true);
		}
	},
	basename: getAbsoluteBasename()
});

const logger = createLogger({
	collapsed: true
});

const visReduxLogger = false;

/**
 * Resolves basename in a pathname independent way
 */
export function getAbsoluteBasename() {
	return window.location.pathname.replace(/^\/(([^/]+\/)?soknadsosialhjelp).+$/, "$1")
}

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
	const middleware = (erDev() && visReduxLogger)
		? applyMiddleware(thunk, saga, logger, routerMiddleware(history))
		: applyMiddleware(thunk, saga, routerMiddleware(history));
	const createdStore = createStore(reducers, devtools, middleware);
	saga.run(sagas);
	return createdStore;
}

const store = configureStore();

window.onerror = (errorMessage, url, line, column, error) => {
	store.dispatch(loggException(errorMessage.toString(), url, line, column, error));
};

ReactDOM.render(
	<Provider store={store}>
		<IntlProvider>
			<ConnectedRouter history={history}>
				<App intl={null} />
			</ConnectedRouter>
		</IntlProvider>
	</Provider>,
	document.getElementById("root") as HTMLElement
);
