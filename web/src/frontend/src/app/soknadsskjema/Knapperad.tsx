import * as React from "react";
import { connect } from "react-redux";
import { Knapp } from "nav-frontend-knapper";
import { withRouter, RouterProps } from "react-router";
import { ANTALL_STEG } from "./konstanter";
import "./knapperad.css";

interface OwnProps {
	aktivtSteg: number;
}

type Props = OwnProps & RouterProps;

class SkjemaKnapperad extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.gaVidere = this.gaVidere.bind(this);
		this.gaTilbake = this.gaTilbake.bind(this);
		this.avbryt = this.avbryt.bind(this);
	}
	gaTilSteg(steg: number) {
		this.props.history.push(`/skjema/steg${steg}`);
	}
	gaVidere() {
		const steg = Math.min(ANTALL_STEG, this.props.aktivtSteg + 1);
		this.gaTilSteg(steg);
	}
	gaTilbake() {
		this.gaTilSteg(Math.max(1, this.props.aktivtSteg - 1));
	}
	avbryt() {
		alert("TODO");
	}
	render() {
		return (
			<div className="skjema-knapperad">
				<Knapp type="hoved" onClick={this.gaVidere}>
					Gå videre
				</Knapp>
				<Knapp type="standard" onClick={this.gaTilbake}>
					Tilbake
				</Knapp>
				<a href="#" onClick={this.avbryt}>
					Avbryt
				</a>
			</div>
		);
	}
}

export default connect((state: any, props: OwnProps) => {
	return props;
})(withRouter(SkjemaKnapperad));
