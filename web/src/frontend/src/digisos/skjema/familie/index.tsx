import * as React from "react";
import { connect } from "react-redux";
import {
	FaktumAppState,
	FaktumComponentProps
} from "../../../nav-soknad/redux/reducer";
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

export default connect((state: FaktumAppState, props: any) => {
	return {
		fakta: state.faktumStore.fakta,
		feil: state.faktumValidation.feil
	};
})(Familie);
