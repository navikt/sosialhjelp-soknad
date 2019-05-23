import React from 'react';
import {Provider} from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import RootRouter from "../routing/RootRouter";
import configureStore, {history} from "../store/configureStore";

const store = configureStore();


const App: React.FC = () => {
  return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <RootRouter />
          {/*// TODO TimeoutBox. Kan ikke være her. Ikke felles for alle sidene*/}
          {/*// TODO AvbrytSoknad*/}
        </ConnectedRouter>
      </Provider>
  );
}

export default App;
