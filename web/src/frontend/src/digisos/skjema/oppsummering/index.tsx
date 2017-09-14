import * as React from "react";
import { connect } from "react-redux";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import { DispatchProps } from "../../../nav-soknad/redux/faktaTypes";
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
		this.props.dispatch(hentOppsummering("1000B8FNi"));
	}
	getOppsummering() {
		return {
			__html: this.props.oppsummering || ""
		};
	}
	render() {
		return (
			<StegFaktum tittelId="oppsummering.tittel">
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
			</StegFaktum>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		oppsummering: state.oppsummering.oppsummering
	};
})(injectIntl(Oppsummering));
