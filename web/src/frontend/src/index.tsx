import "whatwg-fetch";
import "babel-polyfill";
import "intl";
import "intl/locale-data/jsonp/nb-NO.js";
import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom";

import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import createSagaMiddleware from "redux-saga";

import {ConnectedRouter, routerMiddleware} from 'connected-react-router';

import reducers from "./digisos/redux/reducers";
import sagas from "./rootSaga"
import IntlProvider from "./intlProvider";
import App from "./digisos";
import {loggException} from "./nav-soknad/redux/navlogger/navloggerActions";
import {erDev} from "./nav-soknad/utils/rest-utils";
import {avbrytSoknad} from "./nav-soknad/redux/soknad/soknadActions";
import {SoknadState} from "./nav-soknad/redux/reduxTypes";
import {NAVIGASJONSPROMT} from "./nav-soknad/utils";
import {visSoknadAlleredeSendtPrompt} from "./nav-soknad/redux/ettersendelse/ettersendelseActions";


const history = require('history').createBrowserHistory({
    getUserConfirmation: (msg: any, callback: (flag: boolean) => void) => {
        if (msg === NAVIGASJONSPROMT.SKJEMA) {
            const soknad: SoknadState = store.getState().soknad;
            if (soknad.data.brukerBehandlingId && soknad.avbrytSoknadSjekkAktiv) {
                store.dispatch(avbrytSoknad("START"));
                callback(false);
            } else {
                callback(true);
            }

        } else if (msg === NAVIGASJONSPROMT.ETTERSENDELSE) {
            store.dispatch(visSoknadAlleredeSendtPrompt(true));
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

interface WindowType {
    new(): Window;
    prototype: Window;
}

function configureStore() {
    // @ts-ignore
    const composeEnhancers = erDev() ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;
    const saga = createSagaMiddleware();
    const middleware = (erDev() && visReduxLogger)
        ? applyMiddleware(thunk, saga, logger, routerMiddleware(history))
        : applyMiddleware(thunk, saga, routerMiddleware(history));
    const createdStore = createStore(
        reducers,
        composeEnhancers(middleware),
    );
    saga.run(sagas);
    return createdStore;
}

const store = configureStore();

window.onerror = (errorMessage, url, line, column, error) => {
    store.dispatch(loggException(errorMessage.toString(), url ? url : "", line, column, error));
};

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </IntlProvider>
    </Provider>,
    document.getElementById("root") as HTMLElement
);
