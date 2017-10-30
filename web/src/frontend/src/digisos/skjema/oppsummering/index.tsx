import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Checkbox } from "nav-frontend-skjema";
import EkspanderbartPanel from "nav-frontend-ekspanderbartpanel";

import { REST_STATUS } from "../../../nav-soknad/types";
import LoadContainer from "../../../nav-soknad/components/loadContainer/LoadContainer";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import {
	hentOppsummering,
	bekreftOppsummering
} from "../../../nav-soknad/redux/oppsummering/oppsummeringActions";
import { Oppsummering, OppsummeringActionTypes } from "../../../nav-soknad/redux/oppsummering/oppsummeringTypes";

import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import { State } from "../../redux/reducers";

interface StateProps {
	oppsummering: Oppsummering;
	bekreftet: boolean;
	visBekreftMangler: boolean;
	restStatus: REST_STATUS;
}

interface DispatchProps {
	onChange: () => OppsummeringActionTypes;
	onDidMount: () => OppsummeringActionTypes;
}

type Props = FaktumComponentProps &
	DispatchProps &
	StateProps &
	InjectedIntlProps;

class OppsummeringView extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.getOppsummering = this.getOppsummering.bind(this);
	}
	componentDidMount() {
		this.props.onDidMount();
	}
	getOppsummering() {
		return {
			__html: this.props.oppsummering || ""
		};
	}
	render() {
		const { oppsummering, intl } = this.props;

		const bolker = oppsummering
			? this.props.oppsummering.bolker.map((bolk, idx) => (
					<div className="blokk-xs bolk" key={idx}>
						<EkspanderbartPanel tittel={bolk.tittel} apen={false}>
							<div dangerouslySetInnerHTML={{ __html: bolk.html }} />
						</EkspanderbartPanel>
					</div>
				))
			: null;

		const skjemaOppsummering = oppsummering ? (
			<div className="skjema-oppsummering">{bolker}</div>
		) : null;

		return (
			<LoadContainer restStatus={this.props.restStatus}>
				<DigisosSkjemaSteg steg={DigisosSteg.oppsummering}>
					{skjemaOppsummering}
					<div className="skjema-oppsummering__bekreft">
						<Checkbox
							label={this.props.intl.formatMessage({
								id: "oppsummering.bekreft.true"
							})}
							checked={this.props.bekreftet}
							feil={
								this.props.visBekreftMangler
									? {
										feilmelding: intl.formatHTMLMessage({
											id: "oppsummering.bekreftOpplysninger"
										})
									}
									: null
							}
							onChange={ this.props.onChange }
						/>
					</div>
				</DigisosSkjemaSteg>
			</LoadContainer>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		oppsummering: state.oppsummering.oppsummering,
		bekreftet: state.oppsummering.bekreftet,
		visBekreftMangler: state.oppsummering.visBekreftMangler,
		restStatus: state.oppsummering.restStatus
	};
}, dispatch => {
	return {
		onChange: () => dispatch(bekreftOppsummering()),
		onDidMount: () => dispatch(hentOppsummering())
	};
})(injectIntl(OppsummeringView));
