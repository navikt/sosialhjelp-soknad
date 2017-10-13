import * as React from "react";
import { Route, Switch } from "react-router";

import Feilside from "../nav-soknad/components/feilmeldinger/Feilside";
import TimeoutBox from "../nav-soknad/components/timeoutbox/TimeoutBox";

import Start from "./start";
import SkjemaRouter from "./skjema/";
import Kvittering from "./kvittering";
import AvbrytSoknad from "../nav-soknad/components/avbrytsoknad/AvbrytSoknad";

class App extends React.Component<{}, {}> {
	render() {
		return (
			<div className="app-digisos container">
				<Switch>
					<Route path={`/informasjon`} exact={true} component={Start} />
					<Route
						path={`/skjema/:brukerBehandlingId/:steg`}
						component={SkjemaRouter}
						exact={true}
					/>
					<Route path={`/kvittering`} component={Kvittering} />
					<Route
						component={() => (
							<Feilside

								tekst="Vi fant ikke siden du prøvde å åpne"
								visTilbakeKnapp={true}
							/>
						)}
					/>
				</Switch>
				<TimeoutBox
					sessionDurationInMinutes={30}
					showWarningerAfterMinutes={25}
				/>
				<AvbrytSoknad/>
				{this.props.children}
			</div>
		);
	}
}

export default App;
