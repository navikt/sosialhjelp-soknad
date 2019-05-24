import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from "redux-saga";
import reducers from './rootReducer';
import thunk from "redux-thunk";
import sagas from './../saga/rootSaga';

export const history = createBrowserHistory({
    basename: "soknadsosialhjelp"
});

export default function configureStore() {
    const w : any = window as any;
    const devtools: any = w.__REDUX_DEVTOOLS_EXTENSION__ ? w.__REDUX_DEVTOOLS_EXTENSION__() : (f:any)=>f;

    const saga = createSagaMiddleware();

    const store = createStore(
        reducers(history),
        compose(
            applyMiddleware(
                thunk,
                saga,
                routerMiddleware(history)
            ),
            devtools
        )
    );
    saga.run(sagas);
    return store;
};
