import "whatwg-fetch";
import "babel-polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import App from "./app";
import rootSaga from "./sagas";
import FaktumReducer from "./skjema/reducer";
import IntlProvider from "./intlProvider";
import "./index.css";

const rootReducer = combineReducers({
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
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</IntlProvider>,
	document.getElementById("root") as HTMLElement
);

export { store };

registerServiceWorker();
