import * as React from "react";
import "./styles/app.css";
import { FormattedMessage } from "react-intl";
import { Route, Switch } from "react-router";
import Start from "./start";
import SkjemaRouter from "./skjema/";
import Kvittering from "./kvittering";
import FeilSide from "../nav-soknad/components/feilmeldinger/feilSide";

class App extends React.Component<{}, {}> {
	render() {
		return (
			<div className="app-digisos">
				<h1 className="app-digisos__title">
					<FormattedMessage id="skjema.tittel"/>
				</h1>
				<Switch>
					<Route path={`/informasjon`} exact={true} component={Start}/>
					<Route path={`/skjema/:brukerBehandlingId`} component={SkjemaRouter}/>
					<Route path={`/kvittering`} component={Kvittering}/>
					<Route component={FeilSide} />
				</Switch>
				{this.props.children}
			</div>
		);
	}
}

export default App;
