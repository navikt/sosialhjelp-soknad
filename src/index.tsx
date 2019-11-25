import "whatwg-fetch";
import "core-js";
import "intl";
import "intl/locale-data/jsonp/nb-NO.js";
import './index.less';

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
import {loggException} from "./digisos/redux/navlogger/navloggerActions";
import {erDev} from "./nav-soknad/utils/rest-utils";
import {avbrytSoknad} from "./digisos/redux/soknad/soknadActions";
import {NAVIGASJONSPROMT} from "./nav-soknad/utils";
import {visSoknadAlleredeSendtPrompt} from "./digisos/redux/ettersendelse/ettersendelseActions";
import {getContextPathBasename} from "./configuration";
import {SoknadState} from "./digisos/redux/soknad/soknadTypes";
import LoadContainer from "./LoadContainer";


const history = require('history').createBrowserHistory({
    getUserConfirmation: (msg: any, callback: (flag: boolean) => void) => {
        if (msg === NAVIGASJONSPROMT.SKJEMA) {
            const soknad: SoknadState = store.getState().soknad;
            if (soknad.behandlingsId && soknad.avbrytSoknadSjekkAktiv) {
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
    basename: getContextPathBasename()
});

const logger = createLogger({
    collapsed: true
});


const visReduxLogger = false;

function configureStore() {
    const w : any = window as any;

    const composeEnhancers = erDev() ? (w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

    const saga = createSagaMiddleware();

    const middleware = (erDev() && visReduxLogger)
        ? applyMiddleware(thunk, saga, logger, routerMiddleware(history))
        : applyMiddleware(thunk, saga, routerMiddleware(history));
    const createdStore = createStore(
        reducers(history),
        composeEnhancers(middleware),
    );
    saga.run(sagas);
    return createdStore;
}

const store = configureStore();

window.onerror = (errorMessage, url, line, column, error) => {
    store.dispatch(
        loggException(typeof errorMessage === "string" ?
            errorMessage :
            "Why is typeof errorMessage Event?", url ? url : "", line, column, error
        )
    );
};

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider>
            <LoadContainer>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </LoadContainer>
        </IntlProvider>
    </Provider>,
    document.getElementById("root") as HTMLElement
);
