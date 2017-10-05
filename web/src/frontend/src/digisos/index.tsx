import * as React from "react";
import { Route, Switch } from "react-router";

import Feilside from "../nav-soknad/components/feilmeldinger/Feilside";

import Start from "./start";
import SkjemaRouter from "./skjema/";
import Kvittering from "./kvittering";

import "./styles/app.css";
import TimeoutBox from "../nav-soknad/components/timeoutbox/TimeoutBox";

class App extends React.Component<{}, {}> {
	render() {
		return (
			<div className="app-digisos container">
				<Switch>
					<Route path={`/informasjon`} exact={true} component={Start} />
					<Route
						path={`/skjema/:brukerBehandlingId`}
						component={SkjemaRouter}
					/>
					<Route path={`/kvittering`} component={Kvittering} />
					<Route component={Feilside} />
				</Switch>
				<TimeoutBox />
				{this.props.children}
			</div>
		);
	}
}

export default App;
