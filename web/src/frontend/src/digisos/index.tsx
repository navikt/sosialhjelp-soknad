import * as React from "react";
import { connect } from "react-redux";
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
import LoadContainer from "../nav-soknad/components/loadContainer/LoadContainer";
import { SoknadAppState } from "../nav-soknad/redux/reduxTypes";
import { REST_STATUS } from "../nav-soknad/types";

interface StateProps {
	initRestStatus: REST_STATUS;
}

class App extends React.Component<InjectedIntlProps & StateProps, {}> {
	render() {
		return (
			<LoadContainer restStatus={this.props.initRestStatus}>
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
			</LoadContainer>
		);
	}
}

const mapStateToProps = (state: SoknadAppState): StateProps => {
	return {
		initRestStatus: state.soknad.restStatus
	};
};

export default connect(mapStateToProps)(injectIntl(App));
