import React from 'react';
import {Provider} from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, {history} from "./store/configureStore";
import App from "./view/App";

const store = configureStore();

const Index: React.FC = () => {
  return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
          {/*// TODO TimeoutBox. Kan ikke være her. Ikke felles for alle sidene*/}
          {/*// TODO AvbrytSoknad*/}
        </ConnectedRouter>
      </Provider>
  );
}

export default Index;
