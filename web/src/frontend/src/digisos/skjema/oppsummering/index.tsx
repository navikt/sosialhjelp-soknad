import * as React from "react";
import { connect } from "react-redux";
import Steg from "../../../nav-skjema/components/steg";
import { DispatchProps } from "../../../nav-skjema/redux/types";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { hentOppsummering } from "../../../redux/soknad/actions";
import { SoknadState } from "../../../redux/soknad/types";
import FaktumCheckbox from "../../../nav-skjema/faktum/FaktumCheckbox";
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
			<Steg tittelId="oppsummering.tittel">
				<div
					className="skjema-oppsummering"
					dangerouslySetInnerHTML={
						this.props.oppsummering ? this.getOppsummering() : undefined
					}
				/>
				<div className="skjema-oppsummering__bekreft">
					<FaktumCheckbox faktumKey="oppsummering.bekreft" option="true" />
				</div>
			</Steg>
		);
	}
}

export default connect((state: { soknad: SoknadState }, props: any) => {
	return {
		oppsummering: state.soknad.oppsummering
	};
})(Oppsummering);
