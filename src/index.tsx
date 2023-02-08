import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import "./index.css";
import "@navikt/ds-css";

import * as React from "react";
import {Suspense} from "react";
import * as ReactDOM from "react-dom";

import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./digisos/redux/reducers";
import sagas from "./rootSaga";
import Modal from "react-modal";
import {initAmplitude} from "./nav-soknad/utils/amplitude";
import {logWindowError} from "./nav-soknad/utils/loggerUtils";
import {injectDecoratorClientSide} from "@navikt/nav-dekoratoren-moduler";
import {RouterProvider} from "react-router-dom";
import {router} from "./digisos";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import "./i18n";
import {Loader} from "@navikt/ds-react";
import {RedirectHack} from "./RedirectHack";
import {ErrorPanels} from "./ErrorPanels";

Modal.setAppElement("#root");

function configureStore() {
    const saga = createSagaMiddleware();

    const middleware = applyMiddleware(saga);
    const createdStore = createStore(reducers(), compose(middleware));
    saga.run(sagas);
    return createdStore;
}

const store = configureStore();

window.onerror = logWindowError;
initAmplitude();
const queryClient = new QueryClient();

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
        <RedirectHack>
            <Suspense fallback={<Loader />}>
                <QueryClientProvider client={queryClient}>
                    <ErrorPanels>
                        <RouterProvider router={router} />
                    </ErrorPanels>
                </QueryClientProvider>
            </Suspense>
        </RedirectHack>
    </Provider>,
    document.getElementById("root") as HTMLElement
);
