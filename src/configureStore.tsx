import createSagaMiddleware from "redux-saga";
import {applyMiddleware, compose, createStore} from "redux";
import reducers from "./digisos/redux/reducers";
import sagas from "./rootSaga";

export function configureStore() {
    const saga = createSagaMiddleware();

    const middleware = applyMiddleware(saga);
    const createdStore = createStore(reducers(), compose(middleware));
    saga.run(sagas);
    return createdStore;
}
