import createSagaMiddleware from "redux-saga";
import {applyMiddleware, compose, createStore} from "redux";
import sagas from "./rootSaga";
import reducers from "./reducers";

export function configureStore() {
    const saga = createSagaMiddleware();

    const middleware = applyMiddleware(saga);
    const createdStore = createStore(reducers(), compose(middleware));
    saga.run(sagas);
    return createdStore;
}
