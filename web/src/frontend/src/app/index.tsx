import * as React from "react";
import "./styles/app.css";
import { FormattedMessage } from "react-intl";
import { Route, Switch } from "react-router";
import Start from "./start";
import Skjema from "./skjema";

class App extends React.Component<{}, {}> {
	render() {
		return (
			<div className="app-digisos">
				<h1>
					<FormattedMessage id="skjema.tittel" />
				</h1>
				<Switch>
					<Route path={`/informasjon`} exact={true} component={Start} />
					<Route path={`/skjema/:brukerBehandlingId`} component={Skjema} />
				</Switch>
				{this.props.children}
			</div>
		);
	}
}

export default App;
