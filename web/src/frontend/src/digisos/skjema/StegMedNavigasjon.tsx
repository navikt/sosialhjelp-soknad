import * as React from "react";
import { RouterProps, withRouter } from "react-router";
import { InjectedIntlProps, injectIntl } from "react-intl";
import NavFrontendSpinner from "nav-frontend-spinner";
import StegIndikator from "../../nav-soknad/components/stegIndikator";
import Knapperad from "../../nav-soknad/components/knapperad";
import {
	avbryt,
	finnBrukerBehandlingIdFraLocation,
	finnStegFraLocation,
	gaTilbake,
	gaVidere
} from "./utils";
import { Location } from "history";
import { connect } from "react-redux";
import { DispatchProps } from "../redux/types";
import { hentSoknad } from "../redux/soknad/soknadActions";
import { REST_STATUS } from "../redux/soknad/soknadTypes";
import { State } from "../redux/reducers";
import {
	clearFaktaValideringsfeil,
	setFaktaValideringsfeil,
	setProgresjon
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

class StegMedNavigasjon extends React.Component<
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
			this.props.dispatch(hentSoknad(brukerBehandlingId));
		}
	}

	handleGaVidere(aktivtSteg: number, brukerBehandlingId: string) {
		if (aktivtSteg === 9) {
			this.props.history.push("/kvittering");
			return;
		}

		const valideringsfeil = validerAlleFaktum(
			this.props.fakta,
			this.props.valideringer
		);
		if (valideringsfeil.length === 0) {
			this.props.dispatch(clearFaktaValideringsfeil());
			this.props.dispatch(setProgresjon(aktivtSteg));
			gaVidere(aktivtSteg, brukerBehandlingId, this.props.history);
		} else {
			this.props.dispatch(setFaktaValideringsfeil(valideringsfeil));
		}
	}

	handleGaTilbake(aktivtSteg: number, brukerBehandlingId: string) {
		this.props.dispatch(clearFaktaValideringsfeil());
		gaTilbake(aktivtSteg, brukerBehandlingId, this.props.history);
	}

	render() {
		const aktivtSteg = finnStegFraLocation(this.props.location);
		const erOppsummering = aktivtSteg === 9;
		const brukerBehandlingId = finnBrukerBehandlingIdFraLocation(
			this.props.location
		);
		const { intl, children } = this.props;
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
									}
								]}
							/>
						</div>
					) : null}
					{children}
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
		brukerBehandlingId: state.soknad.data.brukerBehandlingId
	};
})(injectIntl(withRouter(StegMedNavigasjon)));
