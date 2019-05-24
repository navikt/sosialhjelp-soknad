import React from "react";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from 'history';
import reducers from '../digisos/store/rootReducer';
// import sagas from '../digisos/saga/rootSaga';
// import thunk from 'redux-thunk';
// import createSagaMiddleware from "redux-saga";
// import { history } from "./store/configureStore";

export const TestContext: React.FunctionComponent<{children: React.ReactChild}> = ({children}) => {

	const history = createBrowserHistory({
		basename: "/"
	});

	// const devtools: any = (f: any) => f;
	// const saga = createSagaMiddleware();
	// const middleware = applyMiddleware(thunk, saga, routerMiddleware(history));
	// const store = createStore(reducers, devtools, middleware);
	// saga.run(sagas);


	const w : any = window as any;
	const devtools: any = w.__REDUX_DEVTOOLS_EXTENSION__ ? w.__REDUX_DEVTOOLS_EXTENSION__() : (f:any)=>f;

	const store = createStore(
		reducers(history),
		compose(
			applyMiddleware(
				routerMiddleware(history)
			),
			devtools
		)
	);

	return (
		<Provider store={store}>
			{children}
		</Provider>
	);

};

const prettier = require("prettier");

export const pretty = (html: string) => {
	return prettier.format(html, {parser: "html"})
};


