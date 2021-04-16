import * as React from "react";
import {Redirect, Route, Switch} from "react-router";
import SideIkkeFunnet from "../nav-soknad/containers/SideIkkeFunnet";
import Informasjon from "./informasjon";
import MockBruker from "./mock/mockbruker";
import SkjemaRouter from "./skjema";
import Ettersendelse from "./skjema/ettersendelse";
import Link from "./link";

const App: React.FC = () => {
    return (
        <span>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/informasjon" />
                </Route>
                <Route path={`/skjema/:brukerBehandlingId/ettersendelse`} component={Ettersendelse} />
                <Route path={`/informasjon`} exact={true} component={Informasjon} />
                <Route path={`/link`} exact={true} component={Link} />
                <Route path={`/mock`} exact={true} component={MockBruker} />
                <Route path={`/mock-login`} exact={true}>
                    <Redirect to="/informasjon" />
                </Route>
                <Route path={`/undersokelse`} exact={true} component={() => <div style={{height: "67vh"}} />} />
                <Route path={`/skjema/:brukerBehandlingId/:steg`} component={SkjemaRouter} exact={true} />
                <Route component={SideIkkeFunnet} />
            </Switch>
        </span>
    );
};

export default App;
