import * as React from "react";
import {Route, Switch, Prompt} from "react-router";
import {InjectedIntlProps, injectIntl} from "react-intl";
import SideIkkeFunnet from "../nav-soknad/containers/SideIkkeFunnet";
import ServerFeil from "../nav-soknad/containers/ServerFeil";
import TimeoutBox from "../nav-soknad/components/timeoutbox/TimeoutBox";
import {
    erEttersendelseSide,
    erSkjemaEllerEttersendelseSide,
    erSkjemaSide, NAVIGASJONSPROMT,
} from "../nav-soknad/utils/navigasjonUtils";
import Informasjon from "./informasjon";
import MockBruker from "./mock/mockbruker";
import MockLogin from "./mock/mocklogin";
import SkjemaRouter from "./skjema/";
import AvbrytSoknad from "../nav-soknad/components/avbrytsoknad/AvbrytSoknad";
import NavFrontendModal from "nav-frontend-modal";
import Ettersendelse from "./skjema/ettersendelse/ettersendelse";
import SoknadAlleredeSendtPromt from "../nav-soknad/components/soknadAlleredeSendtPromt/SoknadAlleredeSendtPromt";
import Link from "./link";

/** Setter globalt hvilket appElement react-modal skal bruke når modal dialog vises
 *
 */
class App extends React.Component<InjectedIntlProps, {}> {

    componentDidMount() {
        (NavFrontendModal as any).setAppElement("#root");
    }

    render() {
        const skjema = erSkjemaSide(window.location.pathname);
        const ettersendelse = (window.location.pathname.match(/ettersendelse$/) != null);
        const informasjon = (window.location.pathname.match(/informasjon$/) != null);
        const mock = (window.location.pathname.match(/mock$/) != null);
        const mocklogin = (window.location.pathname.match(/mock-login$/) != null);
        const undersokelse = (window.location.pathname.match(/undersokelse$/) != null);
        const link = (window.location.pathname.match(/link$/) != null);

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
                {!ettersendelse && !informasjon && !link && !mock && !mocklogin && !undersokelse && (
                    <span>
					<Prompt
                        message={loc =>
                            erSkjemaEllerEttersendelseSide(loc.pathname)
                                ? true
                                : NAVIGASJONSPROMT.SKJEMA
                        }
                    />
					<TimeoutBox
                        sessionDurationInMinutes={30}
                        showWarningerAfterMinutes={25}
                    />
					<AvbrytSoknad/>
                        {this.props.children}
				</span>
                )}
                {!skjema && !informasjon && !link && !mock && !mocklogin && !undersokelse && (
                    <span>
                    <Prompt
                        message={loc =>
                            erEttersendelseSide(loc.pathname)
                                ? true
                                : NAVIGASJONSPROMT.ETTERSENDELSE
                        }
                    />
                    <SoknadAlleredeSendtPromt/>
                </span>
                )}
			</span>
        );
    }
}

export default injectIntl(App);
