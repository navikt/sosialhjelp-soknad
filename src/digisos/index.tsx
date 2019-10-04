import * as React from "react";
import {Route, Switch} from "react-router";
import { injectIntl} from "react-intl";
import SideIkkeFunnet from "../nav-soknad/containers/SideIkkeFunnet";
import ServerFeil from "../nav-soknad/containers/ServerFeil";
import Informasjon from "./informasjon";
import MockBruker from "./mock/mockbruker";
import MockLogin from "./mock/mocklogin";
import SkjemaRouter from "./skjema";
import NavFrontendModal from "nav-frontend-modal";
import Ettersendelse from "./skjema/ettersendelse";
import Link from "./link";

/** Setter globalt hvilket appElement react-modal skal bruke når modal dialog vises
 *
 */
class App extends React.Component<{}, {}> {

    componentDidMount() {
        (NavFrontendModal as any).setAppElement("#root");
    }

    render() {

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
                    <Route path={`/serverfeil`} component={ServerFeil}/>
                    <Route component={SideIkkeFunnet}/>
				</Switch>
			</span>
        );
    }
}

export default injectIntl(App);
