import * as React from "react";
import { Route, Switch } from "react-router";
import { InjectedIntlProps, injectIntl } from "react-intl";
import SideIkkeFunnet from "../nav-soknad/components/feilside/IkkeFunnet";
import TimeoutBox from "../nav-soknad/components/timeoutbox/TimeoutBox";

import Informasjon from "./informasjon";
import Start from "./start";
import SkjemaRouter from "./skjema/";
import Kvittering from "./kvittering";
import AvbrytSoknad from "../nav-soknad/components/avbrytsoknad/AvbrytSoknad";
import ServerFeil from "../nav-soknad/components/feilside/ServerFeil";

class App extends React.Component<InjectedIntlProps, {}> {
	render() {
		return (
			<div className="app-digisos container">
				<Switch>
					<Route path={`/informasjon`} exact={true} component={Informasjon} />
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
				<TimeoutBox
					sessionDurationInMinutes={30}
					showWarningerAfterMinutes={25}
				/>
				<AvbrytSoknad />
				{this.props.children}
			</div>
		);
	}
}

export default injectIntl(App);
