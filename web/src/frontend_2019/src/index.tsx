import * as React from "react";
import './index.css';
import {Provider} from "react-redux";
import * as ReactDOM from "react-dom";
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from "./configureStore";
import RootRouter from "./RootRouter";

const store = configureStore();

window.onerror = (errorMessage, url, line, column, error) => {
    console.warn("TODO: Implementer clientlogger");
    // store.dispatch(loggException(errorMessage.toString(), url, line, column, error));
};

const App: React.FC = () => {
    return (
        <Provider store={store}>
            {/*<IntlProvider>*/}
                <ConnectedRouter history={history}>
                    <RootRouter />
                    {/*// TODO TimeoutBox. Kan ikke være her. Ikke felles for alle sidene*/}
                    {/*// TODO AvbrytSoknad*/}
                </ConnectedRouter>
            {/*</IntlProvider>*/}
        </Provider>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));
