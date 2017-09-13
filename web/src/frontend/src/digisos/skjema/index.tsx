import * as React from "react";
import { withRouter, RouterProps } from "react-router";
import { Route, Switch } from "react-router";
import Steg1 from "./kontaktinfo";
import Steg2 from "./arbeidUtdanning";
import Steg3 from "./familie";
import Steg4 from "./begrunnelse";
import Steg5 from "./bosituasjon";
import Steg6 from "./inntektFormue";
import Steg7 from "./utgifterGjeld";
import Steg8 from "./ekstrainformasjon";
import Steg9 from "./oppsummering";
import { injectIntl, InjectedIntlProps } from "react-intl";
import NavFrontendSpinner from "nav-frontend-spinner";
import StegIndikator from "../../nav-soknad/components/stegIndikator";
import Knapperad from "../../nav-soknad/components/knapperad";
import {
	finnStegFraLocation,
	finnBrukerBehandlingIdFraLocation
} from "./utils";
import { gaTilbake, gaVidere, avbryt } from "./utils";
import { Location } from "history";
import { connect } from "react-redux";
import { DispatchProps } from "../redux/types";
import { lesSoknad } from "../redux/soknad/actions";
import { REST_STATUS } from "../redux/soknad/types";
import { State } from "../redux/reducers";
import {
	setFaktaValideringsfeil,
	clearFaktaValideringsfeil
} from "../../nav-soknad/redux/valideringActions";
import { FaktumValideringsregler } from "../../nav-soknad/validering/types";
import { validerAlleFaktum } from "../../nav-soknad/validering/utils";

const stopEvent = (evt: React.FormEvent<any>) => {
	evt.stopPropagation();
	evt.preventDefault();
};

interface OwnProps {
	restStatus: string;
	match: any;
	location: Location;
	fakta: any;
	valideringer: FaktumValideringsregler[];
}
type Props = OwnProps & RouterProps & InjectedIntlProps & DispatchProps;

class Skjema extends React.Component<
	OwnProps & RouterProps & InjectedIntlProps & DispatchProps,
	{}
> {
	constructor(props: Props) {
		super(props);
		this.handleGaVidere = this.handleGaVidere.bind(this);
	}

	componentDidMount() {
		const brukerBehandlingId = finnBrukerBehandlingIdFraLocation(
			this.props.location
		);
		if (brukerBehandlingId && this.props.fakta.length <= 1) {
			this.props.dispatch(lesSoknad(brukerBehandlingId));
		}
	}

	handleGaVidere(aktivtSteg: number, brukerBehandlingId: string) {
		if (aktivtSteg === 9) {
			this.props.history.push("/kvittering");
			return;
		}

		const valideringsfeil = validerAlleFaktum(
			this.props.fakta,
			this.props.valideringer,
			this.props.intl
		);
		if (valideringsfeil.length === 0) {
			this.props.dispatch(clearFaktaValideringsfeil());
			gaVidere(aktivtSteg, brukerBehandlingId, this.props.history);
		} else {
			this.props.dispatch(setFaktaValideringsfeil(valideringsfeil));
		}
	}

	handleGaTilbake(aktivtSteg: number, brukerBehandlingId: string) {
		gaTilbake(aktivtSteg, brukerBehandlingId, this.props.history);
	}

	render() {
		const aktivtSteg = finnStegFraLocation(this.props.location);
		const erOppsummering = aktivtSteg === 9;
		const brukerBehandlingId = finnBrukerBehandlingIdFraLocation(
			this.props.location
		);
		const { match, intl } = this.props;
		if (this.props.restStatus === REST_STATUS.PENDING) {
			return (
				<div className="application-spinner">
					<NavFrontendSpinner storrelse="xxl" />
				</div>
			);
		} else {
			return (
				<form id="soknadsskjema" onSubmit={stopEvent}>
					{!erOppsummering ? (
						<div className="skjema__stegindikator">
							<StegIndikator
								aktivtSteg={aktivtSteg}
								steg={[
									{
										tittel: intl.formatMessage({ id: "personaliabolk.tittel" })
									},
									{ tittel: intl.formatMessage({ id: "arbeidbolk.tittel" }) },
									{ tittel: intl.formatMessage({ id: "familiebolk.tittel" }) },
									{
										tittel: intl.formatMessage({ id: "begrunnelsebolk.tittel" })
									},
									{
										tittel: intl.formatMessage({ id: "bosituasjonbolk.tittel" })
									},
									{ tittel: intl.formatMessage({ id: "inntektbolk.tittel" }) },
									{ tittel: intl.formatMessage({ id: "utgifterbolk.tittel" }) },
									{
										tittel: intl.formatMessage({ id: "ekstrainfo.tittel" })
									},
									{ tittel: intl.formatMessage({ id: "oppsummering.tittel" }) }
								]}
							/>
						</div>
					) : null}
					<Switch>
						<Route path={`${match.url}/1`} component={Steg1} />
						<Route path={`${match.url}/2`} component={Steg2} />
						<Route path={`${match.url}/3`} component={Steg3} />
						<Route path={`${match.url}/4`} component={Steg4} />
						<Route path={`${match.url}/5`} component={Steg5} />
						<Route path={`${match.url}/6`} component={Steg6} />
						<Route path={`${match.url}/7`} component={Steg7} />
						<Route path={`${match.url}/8`} component={Steg8} />
						<Route path={`${match.url}/9`} component={Steg9} />
					</Switch>
					<Knapperad
						gaVidereLabel={erOppsummering ? "Send søknad" : undefined}
						gaVidere={() => this.handleGaVidere(aktivtSteg, brukerBehandlingId)}
						gaTilbake={() =>
							this.handleGaTilbake(aktivtSteg, brukerBehandlingId)}
						avbryt={() => avbryt()}
					/>
				</form>
			);
		}
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data,
		valideringer: state.validering.valideringsregler,
		restStatus: state.soknad.restStatus,
		brukerBehandlingId: state.soknad.brukerBehandlingId
	};
})(injectIntl(withRouter(Skjema)));
