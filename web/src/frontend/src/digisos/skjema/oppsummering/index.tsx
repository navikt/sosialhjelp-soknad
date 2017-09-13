import * as React from "react";
import { connect } from "react-redux";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import { DispatchProps } from "../../../nav-soknad/redux/faktaTypes";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import CheckboxFaktum from "../../../nav-soknad/faktum/CheckboxFaktum";
import { hentOppsummering } from "../../redux/oppsummering/oppsummeringActions";
import { State } from "../../redux/reducers";
import "./oppsummering.css";

interface StateProps {
	oppsummering?: string;
}

type Props = FaktumComponentProps & DispatchProps & StateProps;

class Oppsummering extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
		this.getOppsummering = this.getOppsummering.bind(this);
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
					<CheckboxFaktum faktumKey="oppsummering.bekreft" option="true" />
				</div>
			</StegFaktum>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		oppsummering: state.oppsummering.oppsummering
	};
})(Oppsummering);
