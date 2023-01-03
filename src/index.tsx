import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import "./index.css";
import "@navikt/ds-css";

import * as React from "react";
import * as ReactDOM from "react-dom";

import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import * as Sentry from "@sentry/react";

import reducers from "./digisos/redux/reducers";
import sagas from "./rootSaga";
import IntlProvider from "./intlProvider";
import LoadContainer from "./LoadContainer";
import Modal from "react-modal";
import {initAmplitude} from "./nav-soknad/utils/amplitude";
import {logException, NavLogEntry, NavLogLevel} from "./nav-soknad/utils/loggerUtils";
import {injectDecoratorClientSide} from "@navikt/nav-dekoratoren-moduler";
import {Integrations} from "@sentry/tracing";
import {BrowserRouter, RouterProvider} from "react-router-dom";
import {createBrowserHistory} from "history";
import {basePath} from "./configuration";
import {RouterHistory} from "@sentry/react/types/reactrouter";
import {router} from "./digisos";

Modal.setAppElement("#root");

const history = createBrowserHistory();

Sentry.init({
    dsn: "https://e81d69cb0fb645068f8b9329fd3a138a@sentry.gc.nav.no/99",
    integrations: [
        new Integrations.BrowserTracing({
            routingInstrumentation: Sentry.reactRouterV5Instrumentation(history as unknown as RouterHistory),
        }),
    ],
    environment: process.env.REACT_APP_ENVIRONMENT,
    tracesSampleRate: 1.0,
});

function configureStore() {
    const saga = createSagaMiddleware();

    const middleware = applyMiddleware(saga);
    const createdStore = createStore(reducers(), compose(middleware));
    saga.run(sagas);
    return createdStore;
}

const store = configureStore();

window.onerror = (errorMessage, url, line, column, error) => {
    const stacktrace = error?.hasOwnProperty("stack") ? "\nStacktrace" + error.stack : "";
    const logEntry: NavLogEntry = {
        level: NavLogLevel.ERROR,
        userAgent: window.navigator.userAgent,
        url: document.location.href,
        message: errorMessage.toString(),
        jsFileUrl: url,
        lineNumber: line,
        error: stacktrace,
    };
    if (column) {
        logEntry.columnNumber = column;
    }
    logException(logEntry);
};

initAmplitude();

// Dersom appen bygges og deployes med docker-image vil dekoratøren bli lagt på serverside med express i Docker (eks ved deploy til miljø)
if (process.env.NODE_ENV !== "production") {
    injectDecoratorClientSide({
        env: "dev",
        simple: true,
        feedback: false,
        chatbot: false,
        shareScreen: false,
    });
}

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider>
            <LoadContainer>
                <RouterProvider router={router} />
            </LoadContainer>
        </IntlProvider>
    </Provider>,
    document.getElementById("root") as HTMLElement
);
