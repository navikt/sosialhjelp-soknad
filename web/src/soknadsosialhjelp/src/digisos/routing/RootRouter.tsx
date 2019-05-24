import {Route, Switch} from "react-router";
import * as React from "react";
import Informasjon from "../view/informasjon";

const RootRouter: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/informasjon" component={Informasjon} />
            <Route exact path="/" render={() => (<div>Match</div>)} />
            <Route render={() => (<div>Miss</div>)} />
        </Switch>
    );
};

export default RootRouter;
