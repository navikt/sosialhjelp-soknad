import * as React from "react";
import { connect } from "react-redux";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { Checkbox } from "nav-frontend-skjema";
import { hentOppsummering } from "../../redux/oppsummering/oppsummeringActions";
import { State } from "../../redux/reducers";
import { injectIntl, InjectedIntlProps } from "react-intl";
import "./oppsummering.css";

interface StateProps {
	oppsummering?: string;
}

interface LocalState {
	bekreftet: boolean;
}

type Props = FaktumComponentProps &
	DispatchProps &
	StateProps &
	InjectedIntlProps;

class Oppsummering extends React.Component<Props, LocalState> {
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
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.oppsummering}>
				<div
					className="skjema-oppsummering"
					dangerouslySetInnerHTML={
						this.props.oppsummering ? this.getOppsummering() : undefined
					}
				/>
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
})(injectIntl(Oppsummering));
