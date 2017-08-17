import "whatwg-fetch";
import "babel-polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createBrowserHistory from "history/createBrowserHistory";
import createSagaMiddleware from "redux-saga";

import AppRouter from "./app/routers";
import rootSaga from "./app/sagas";
import AppReducer from "./app/reducers";
import FaktumReducer from "./app/faktum/reducer";
import IntlProvider from "./intlProvider";
import "./index.css";

const history = createBrowserHistory();

const rootReducer = combineReducers({
	app: AppReducer,
	faktum: FaktumReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<IntlProvider>
		<Provider store={store}>
			<AppRouter history={history} />
		</Provider>
	</IntlProvider>,
	document.getElementById("root") as HTMLElement
);

export { store, history };

registerServiceWorker();
