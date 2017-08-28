import "whatwg-fetch";
import "babel-polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import App from "./app";
import thunk from "redux-thunk";
import SoknadReducer from "./redux/soknad/reducer";
import FaktumReducer from "./skjema/reducer";
import IntlProvider from "./intlProvider";
import "./index.css";
import { erDev } from "./app/utils";

const rootReducer = combineReducers({
	soknad: SoknadReducer,
	faktum: FaktumReducer
});

function configureStore() {
	/* tslint:disable-next-line */
	const devtools: any = (window['devToolsExtension'] && erDev()) ? window['devToolsExtension']() : (f:any)=>f;
	const middleware = applyMiddleware(thunk);
	return middleware(devtools(createStore))(rootReducer);
}

const store = configureStore();
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
