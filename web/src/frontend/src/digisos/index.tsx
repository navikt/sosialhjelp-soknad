import * as React from "react";
import "./styles/app.css";
import { FormattedMessage } from "react-intl";
import { Route, Switch } from "react-router";
import Start from "./start";
import Skjema from "./skjema";
import Kvittering from "./kvittering";
import { Sidetittel } from "nav-frontend-typografi";

class App extends React.Component<{}, {}> {
	render() {
		return (
			<div className="app-digisos">
				<div className="app-digisos__title">
					<Sidetittel>
						<FormattedMessage id="skjema.tittel" />
					</Sidetittel>
				</div>
				<Switch>
					<Route path={`/informasjon`} exact={true} component={Start} />
					<Route path={`/skjema/:brukerBehandlingId`} component={Skjema} />
					<Route path={`/kvittering`} component={Kvittering} />
				</Switch>
				{this.props.children}
			</div>
		);
	}
}

export default App;
