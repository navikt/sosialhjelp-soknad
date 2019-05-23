import * as React from "react";
import './index.css';
import {Provider} from "react-redux";
import * as ReactDOM from "react-dom";
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from "./configureStore";
import {Route, Switch} from "react-router";

const store = configureStore();

window.onerror = (errorMessage, url, line, column, error) => {
    console.warn("TODO: Implementer clientlogger");
    // store.dispatch(loggException(errorMessage.toString(), url, line, column, error));
};

const Digisos: React.FC = () => {
    return (
        <Provider store={store}>
            <div>
                <ConnectedRouter history={history}>
                    <div><h1>Digisos 3.0</h1></div>
                    <Switch>
                        <Route exact path="/informasjon" render={() => (<div><h2>Informasjon</h2></div>)} />
                        <Route exact path="/" render={() => (<div>Match</div>)} />
                        <Route render={() => (<div>Miss</div>)} />
                    </Switch>
                </ConnectedRouter>
            </div>
        </Provider>
    )
};

ReactDOM.render(<Digisos/>, document.getElementById('root'));
