import * as React from "react";
import { connect } from "react-redux";
import { Knapp } from "nav-frontend-knapper";
import { withRouter, RouterProps } from "react-router";
import "./knapperad.css";
import { gaTilbake, gaVidere, avbryt } from "../../utils";

interface OwnProps {
	aktivtSteg: number;
}

type Props = OwnProps & RouterProps;

class SkjemaKnapperad extends React.Component<Props, {}> {
	render() {
		const { history, aktivtSteg } = this.props;
		return (
			<div className="skjema-knapperad">
				<Knapp
					type="hoved"
					htmlType="button"
					onClick={() => gaVidere(aktivtSteg, history)}
				>
					Gå videre
				</Knapp>
				<Knapp
					type="standard"
					htmlType="button"
					onClick={() => gaTilbake(aktivtSteg, history)}
				>
					Tilbake
				</Knapp>
				<a href="#" onClick={() => avbryt()}>
					Avbryt
				</a>
			</div>
		);
	}
}

export default connect((state: any, props: OwnProps) => {
	return props;
})(withRouter(SkjemaKnapperad));
