import * as React from "react";
import {Route, Switch} from "react-router";
import SideIkkeFunnet from "../nav-soknad/containers/SideIkkeFunnet";
import Informasjon from "./informasjon";
import SelvstendigNaringsdrivende from "./selvstendignaringsdrivende";
import MockBruker from "./mock/mockbruker";
import MockLogin from "./mock/mocklogin";
import SkjemaRouter from "./skjema";
import Ettersendelse from "./skjema/ettersendelse";
import Link from "./link";
import {StartSide} from "./startside/startside";

const App: React.FC = () => {

    return (
        <span>
            <Switch>
                <Route
                    path={`/skjema/:brukerBehandlingId/ettersendelse`}
                    component={Ettersendelse}
                />
                <Route
                    path={`/informasjon`}
                    exact={true}
                    component={Informasjon}
                />
                <Route
                    path={`/selvstendignaringsdrivende`}
                    exact={true}
                    component={SelvstendigNaringsdrivende}
                />
                <Route
                    path={`/startside`}
                    exact={true}
                    component={StartSide}
                />
                <Route
                    path={`/link`}
                    exact={true}
                    component={Link}
                />
                <Route
                    path={`/mock`}
                    exact={true}
                    component={MockBruker}
                />
                <Route
                    path={`/mock-login`}
                    exact={true}
                    component={MockLogin}
                />
                <Route
                    path={`/undersokelse`}
                    exact={true}
                    component={() => <div style={{height: "67vh"}}/>}
                />
                <Route
                    path={`/skjema/:brukerBehandlingId/:steg`}
                    component={SkjemaRouter}
                    exact={true}
                />
                <Route component={SideIkkeFunnet}/>
            </Switch>
        </span>
    );
};

export default App;
