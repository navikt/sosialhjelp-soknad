import * as React from "react";
import {
	Route,
	RouterProps,
	Switch,
	Redirect,
	withRouter,
	matchPath
} from "react-router";
import { Location } from "history";
import { connect } from "react-redux";
import NavFrontendSpinner from "nav-frontend-spinner";

import Steg1 from "./personalia";
import Steg2 from "./arbeidUtdanning";
import Steg3 from "./familie";
import Steg4 from "./begrunnelse";
import Steg5 from "./bosituasjon";
import Steg6 from "./inntektFormue";
import Steg7 from "./utgifterGjeld";
import Steg8 from "./ekstrainformasjon";
import Oppsummering from "./oppsummering";

import Feilside from "../../nav-soknad/components/feilmeldinger/Feilside";
import { Faktum, REST_STATUS } from "../../nav-soknad/types";
import { getProgresjonFaktum } from "../../nav-soknad/redux/faktaUtils";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { State } from "../redux/reducers";
import { hentSoknad } from "../redux/soknad/soknadActions";
import { finnBrukerBehandlingIdFraLocation } from "./utils";

interface OwnProps {
	match: any;
	location: Location;
}

interface UrlParams {
	brukerbehandlingId: string;
	steg: string;
}

interface StateProps {
	fakta: Faktum[];
	progresjon: number;
	restStatus: string;
}

class SkjemaRouter extends React.Component<
	OwnProps & StateProps & RouterProps & DispatchProps,
	{}
> {
	componentDidMount() {
		const brukerBehandlingId = finnBrukerBehandlingIdFraLocation(
			this.props.location
		);
		if (brukerBehandlingId && this.props.fakta.length <= 1) {
			this.props.dispatch(hentSoknad(brukerBehandlingId));
		}
	}
	render() {
		const { restStatus, match, progresjon } = this.props;
		if (
			restStatus === REST_STATUS.INITIALISERT ||
			restStatus === REST_STATUS.PENDING
		) {
			return (
				<div className="application-spinner">
					<NavFrontendSpinner storrelse="xxl" />
				</div>
			);
		} else if (restStatus === REST_STATUS.FEILET) {
			return <p>Det oppstod en feil under lasting av data</p>;
		} else {
			const localMatch = matchPath(this.props.location.pathname, {
				path: "/skjema/:brukerbehandlingId/:steg"
			});
			const { steg } = localMatch.params as UrlParams;
			const maksSteg = progresjon;
			if (parseInt(steg, 10) > maksSteg) {
				return <Redirect to={`${match.url}/${maksSteg}`} />;
			}
			const path = "/skjema/:brukerBehandlingId";
			return (
				<Switch>
					<Route path={`${path}/1`} component={Steg1} />
					<Route path={`${path}/2`} component={Steg2} />
					<Route path={`${path}/3`} component={Steg3} />
					<Route path={`${path}/4`} component={Steg4} />
					<Route path={`${path}/5`} component={Steg5} />
					<Route path={`${path}/6`} component={Steg6} />
					<Route path={`${path}/7`} component={Steg7} />
					<Route path={`${path}/8`} component={Steg8} />
					<Route path={`${path}/9`} component={Oppsummering} />
					<Route component={Feilside} />
				</Switch>
			);
		}
	}
}

const mapStateToProps = (state: State): StateProps => {
	const dataLoaded = state.soknad.restStatus === REST_STATUS.OK;
	let progresjon = 0;
	if (dataLoaded) {
		const faktum = getProgresjonFaktum(state.fakta.data);
		progresjon = parseInt(faktum.value as string, 10);
	}
	return {
		fakta: state.fakta.data,
		progresjon,
		restStatus: state.soknad.restStatus
	};
};

export default connect(mapStateToProps)(withRouter(SkjemaRouter));
