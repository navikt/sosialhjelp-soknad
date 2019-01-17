import * as React from "react";
import { Route, Switch, Prompt } from "react-router";
import { InjectedIntlProps, injectIntl } from "react-intl";
import SideIkkeFunnet from "../nav-soknad/containers/SideIkkeFunnet";
import ServerFeil from "../nav-soknad/containers/ServerFeil";
import TimeoutBox from "../nav-soknad/components/timeoutbox/TimeoutBox";
import { erSkjemaside } from "../nav-soknad/utils/navigasjonUtils";
import Informasjon from "./informasjon";
import Mock from "./mock";
import MockLogin from "./mocklogin";
import Start from "./start";
import SkjemaRouter from "./skjema/";
import Kvittering from "./kvittering";
import AvbrytSoknad from "../nav-soknad/components/avbrytsoknad/AvbrytSoknad";
import NavFrontendModal from "nav-frontend-modal";
import Ettersendelse from "./skjema/ettersendelse/ettersendelse";

/** Setter globalt hvilket appElement react-modal skal bruke når modal dialog vises
 *
 */
class App extends React.Component<InjectedIntlProps, {}> {

	componentDidMount() {
		(NavFrontendModal as any).setAppElement("#root");
	}

	render() {
		const ettersendelse = (window.location.pathname.match(/ettersendelse$/) != null);
		const informasjon = (window.location.pathname.match(/informasjon$/) != null);
		const mock = (window.location.pathname.match(/mock$/) != null);
		const mocklogin = (window.location.pathname.match(/mock-login$/) != null);

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
						path={`/mock`}
						exact={true}
						component={Mock}
					/>
					<Route
						path={`/mock-login`}
						exact={true}
						component={MockLogin}
					/>
				</Switch>
			{!ettersendelse && !informasjon && !mock && !mocklogin && (
				<span>
					<Switch>
						<Route path={`/bosted`} exact={true} component={Start} />
						<Route
							path={`/skjema/:brukerBehandlingId/:steg`}
							component={SkjemaRouter}
							exact={true}
						/>
						<Route
							path={`/kvittering/:brukerBehandlingId`}
							component={Kvittering}
						/>
						<Route path={`/serverfeil`} component={ServerFeil} />
						<Route component={SideIkkeFunnet} />
					</Switch>
					<Prompt
						message={loc =>
							erSkjemaside(loc.pathname)
								? null
								: "denne-teksten-brukes-ikke-men-trenger-tekst-her-for-å-vise-avbryt-dialog"
						}
					/>
					<TimeoutBox
						sessionDurationInMinutes={30}
						showWarningerAfterMinutes={25}
					/>
					<AvbrytSoknad />
					{this.props.children}
				</span>
			)}
			</span>
		);
	}
}

export default injectIntl(App);
