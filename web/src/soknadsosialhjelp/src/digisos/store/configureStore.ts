import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './rootReducer';

export const history = createBrowserHistory({
    basename: "soknadsosialhjelp"
});

export default function configureStore() {
    const w : any = window as any;
    const devtools: any = w.__REDUX_DEVTOOLS_EXTENSION__ ? w.__REDUX_DEVTOOLS_EXTENSION__() : (f:any)=>f;

    const store = createStore(
        createRootReducer(history),
        compose(
            applyMiddleware(
                routerMiddleware(history)
            ),
            devtools
        )
    );
    return store;
};
