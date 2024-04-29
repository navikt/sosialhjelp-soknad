import {render, RenderOptions} from "@testing-library/react";
import {ReactElement, Suspense} from "react";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import * as React from "react";
import i18n from "../lib/i18n";
import {I18nextProvider} from "react-i18next";
import reducers from "../lib/redux/reducers";

function configureStore() {
    const saga = createSagaMiddleware();

    const middleware = applyMiddleware(saga);
    const createdStore = createStore(reducers(), compose(middleware));
    return createdStore;
}

const store = configureStore();

const Wrapper = ({children}: {children: React.ReactNode}) => (
    <Provider store={store}>
        <Suspense fallback={null}>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </Suspense>
    </Provider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
    render(ui, {wrapper: Wrapper, ...options});

export * from "@testing-library/react";
export {customRender as render};
