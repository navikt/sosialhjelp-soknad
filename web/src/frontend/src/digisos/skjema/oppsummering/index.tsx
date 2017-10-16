import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Checkbox } from "nav-frontend-skjema";
import EkspanderbartPanel from "nav-frontend-ekspanderbartpanel";
import { Panel } from "nav-frontend-paneler";

import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { hentOppsummering } from "../../redux/oppsummering/oppsummeringActions";
import { Oppsummering } from "../../redux/oppsummering/oppsummeringTypes";

import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import { State } from "../../redux/reducers";

interface StateProps {
	oppsummering?: Oppsummering;
}

interface LocalState {
	bekreftet: boolean;
}

type Props = FaktumComponentProps &
	DispatchProps &
	StateProps &
	InjectedIntlProps;

class OppsummeringView extends React.Component<Props, LocalState> {
	constructor(props: Props) {
		super(props);
		this.getOppsummering = this.getOppsummering.bind(this);
		this.state = {
			bekreftet: false
		};
	}
	componentDidMount() {
		this.props.dispatch(hentOppsummering());
	}
	getOppsummering() {
		return {
			__html: this.props.oppsummering || ""
		};
	}
	render() {
		const { oppsummering } = this.props;

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
			<div className="skjema-oppsummering">
				{bolker}
				<div className="blokk-m">
					<Panel>
						<div dangerouslySetInnerHTML={{ __html: oppsummering.signatur }} />
					</Panel>
				</div>
			</div>
		) : null;

		return (
			<DigisosSkjemaSteg steg={DigisosSteg.oppsummering}>
				{skjemaOppsummering}
				<div className="skjema-oppsummering__bekreft">
					<Checkbox
						label={this.props.intl.formatMessage({
							id: "oppsummering.bekreft.true"
						})}
						checked={this.state.bekreftet}
						onChange={evt =>
							this.setState({ bekreftet: (evt as any).target.checked })}
					/>
				</div>
			</DigisosSkjemaSteg>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		oppsummering: state.oppsummering.oppsummering
	};
})(injectIntl(OppsummeringView));
