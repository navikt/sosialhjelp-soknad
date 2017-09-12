import * as React from "react";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { State } from "../../redux/reducers";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import Sivilstatus from "./Sivilstatus";
import Barn from "./Barn";

class Familie extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		return (
			<StegFaktum tittelId="familiebolk.tittel">
				<Sivilstatus fakta={fakta} />
				<Barn fakta={fakta} />
			</StegFaktum>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data,
		feil: state.validering.feil
	};
})(Familie);
