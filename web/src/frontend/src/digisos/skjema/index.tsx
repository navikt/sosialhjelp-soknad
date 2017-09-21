import * as React from "react";
import { Redirect, Route, RouterProps, Switch, withRouter } from "react-router";
import Steg1 from "./kontaktinfo";
import Steg2 from "./arbeidUtdanning";
import Steg3 from "./familie";
import Steg4 from "./begrunnelse";
import Steg5 from "./bosituasjon";
import Steg6 from "./inntektFormue";
import Steg7 from "./utgifterGjeld";
import Steg8 from "./ekstrainformasjon";
import Oppsummering from "./oppsummering";
import { InjectedIntlProps, injectIntl } from "react-intl";
import NavFrontendSpinner from "nav-frontend-spinner";
import { Location } from "history";
import { connect } from "react-redux";
import { DispatchProps } from "../redux/types";
import { REST_STATUS } from "../redux/soknad/soknadTypes";
import { State } from "../redux/reducers";
import Feilside from "../../nav-soknad/components/feilmeldinger/Feilside";
import { finnStegFraLocation } from "./utils";
import { getProgresjonFaktum } from "../../nav-soknad/redux/faktaUtils";
import { hentSoknad } from "../redux/soknad/soknadActions";
import { finnBrukerBehandlingIdFraLocation } from "./utils";
import { Faktum } from "../../nav-soknad/redux/faktaTypes";

interface OwnProps {
	match: any;
	location: Location;
	dataLoaded: boolean;
	fakta: Faktum[];
	progresjon: number;
}

class SkjemaRouter extends React.Component<
	OwnProps & RouterProps & InjectedIntlProps & DispatchProps,
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
		const { dataLoaded, match, progresjon, location } = this.props;
		if (!dataLoaded) {
			return (
				<div className="application-spinner">
					<NavFrontendSpinner storrelse="xxl" />
				</div>
			);
		} else {
			const aktivtSteg = finnStegFraLocation(location);
			const maksSteg = progresjon + 1;
			if (aktivtSteg > maksSteg) {
				return <Redirect to={`${match.url}/${maksSteg}`} />;
			}
			return (
				<Switch>
					<Route path={`${match.url}/1`} component={Steg1} />
					<Route path={`${match.url}/2`} component={Steg2} />
					<Route path={`${match.url}/3`} component={Steg3} />
					<Route path={`${match.url}/4`} component={Steg4} />
					<Route path={`${match.url}/5`} component={Steg5} />
					<Route path={`${match.url}/6`} component={Steg6} />
					<Route path={`${match.url}/7`} component={Steg7} />
					<Route path={`${match.url}/8`} component={Steg8} />
					<Route path={`${match.url}/9`} component={Oppsummering} />
					<Route component={Feilside} />
				</Switch>
			);
		}
	}
}

export default connect((state: State, props: any) => {
	const dataLoaded = state.fakta.restStatus === REST_STATUS.OK;
	let progresjon = 0;
	if (dataLoaded) {
		const faktum = getProgresjonFaktum(state.fakta.data);
		progresjon = parseInt(faktum.value as string, 10);
	}
	return {
		fakta: state.fakta.data,
		dataLoaded,
		progresjon
	};
})(injectIntl(withRouter(SkjemaRouter)));
