import * as React from "react";
import "./styles/app.css";
import { Route, Switch } from "react-router";
import Start from "./start";
import SkjemaRouter from "./skjema/";
import Kvittering from "./kvittering";
import Feilside from "../nav-soknad/components/feilmeldinger/Feilside";

class App extends React.Component<{}, {}> {
	render() {
		return (
			<div className="app-digisos">
				<Switch>
					<Route path={`/informasjon`} exact={true} component={Start} />
					<Route
						path={`/skjema/:brukerBehandlingId`}
						component={SkjemaRouter}
					/>
					<Route path={`/kvittering`} component={Kvittering} />
					<Route component={Feilside} />
				</Switch>
				{this.props.children}
			</div>
		);
	}
}

export default App;
