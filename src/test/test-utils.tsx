import {render, RenderOptions} from "@testing-library/react";
import {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "../digisos/redux/reducers";
import sagas from "../rootSaga";

function configureStore() {
    const saga = createSagaMiddleware();

    const middleware = applyMiddleware(saga);
    const createdStore = createStore(reducers(), compose(middleware));
    saga.run(sagas);
    return createdStore;
}

const store = configureStore();

const Wrapper: React.FC = ({children}) => (
    <Provider store={store}>
        <IntlProvider defaultLocale="nb" locale="nb">
            {children}
        </IntlProvider>
    </Provider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
    render(ui, {wrapper: Wrapper, ...options});

export * from "@testing-library/react";
export {customRender as render};
