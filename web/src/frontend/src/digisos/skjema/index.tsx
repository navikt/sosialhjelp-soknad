import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import {
	Route,
	RouterProps,
	Switch,
	withRouter,
	matchPath
} from "react-router";
import { Location } from "history";
import { connect } from "react-redux";

import Steg1 from "./personalia";
import Steg2 from "./arbeidUtdanning";
import Steg3 from "./familie";
import Steg4 from "./begrunnelse";
import Steg5 from "./bosituasjon";
import Steg6 from "./inntektFormue";
import Steg7 from "./utgifterGjeld";
import Steg8 from "./ekstrainformasjon/EkstraInformasjon";
import Oppsummering from "./oppsummering";

import Feilside from "../../nav-soknad/components/feilmeldinger/Feilside";
import LoadContainer from "../../nav-soknad/components/loadContainer/LoadContainer";
import { Faktum } from "../../nav-soknad/types";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { State } from "../redux/reducers";
import { hentSoknad } from "../redux/soknad/soknadActions";

interface OwnProps {
	match: any;
	location: Location;
}

interface StateProps {
	fakta: Faktum[];
	restStatus: string;
	gyldigUrl: boolean;
	steg: string;
	brukerbehandlingId: string;
}

interface UrlParams {
	brukerbehandlingId: string;
	steg: string;
}

class SkjemaRouter extends React.Component<
	OwnProps & StateProps & RouterProps & DispatchProps & InjectedIntlProps,
	{}
> {
	componentWillMount() {
		if (this.props.brukerbehandlingId && this.props.fakta.length <= 1) {
			this.props.dispatch(hentSoknad(this.props.brukerbehandlingId));
		}
	}
	render() {
		const { gyldigUrl, restStatus, intl } = this.props;

		if (!gyldigUrl) {
			return (
				<Feilside
					tekst={intl.formatMessage({ id: "feilmelding.404" })}
					feilkode="404"
					visTilbakeKnapp={true}
				/>
			);
		}
		const path = "/skjema/:brukerBehandlingId";
		return (
			<LoadContainer restStatus={restStatus}>
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
			</LoadContainer>
		);
	}
}

const mapStateToProps = (
	state: State,
	props: OwnProps & RouterProps
): StateProps => {
	const match = matchPath(props.location.pathname, {
		path: "/skjema/:brukerbehandlingId/:steg"
	});
	const { steg, brukerbehandlingId } = match.params as UrlParams;
	return {
		fakta: state.fakta.data,
		restStatus: state.soknad.restStatus,
		steg,
		brukerbehandlingId,
		gyldigUrl: brukerbehandlingId !== undefined && steg !== undefined
	};
};

export default connect(mapStateToProps)(withRouter(injectIntl(SkjemaRouter)));
