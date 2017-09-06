import * as React from "react";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import { connect } from "react-redux";
import {
	FaktumAppState,
	FaktumComponentProps
} from "../../../nav-soknad/redux/reducer";

import YtelserFraNAV from "./YtelserFraNAV";
import SoknaderUnderBehandling from "./SoknaderUnderBehandling";
import Bostotte from "./Bostotte";
import Eiendeler from "./Eiendeler";
import Bankinnskudd from "./Bankinnskudd";
import Utbetaling from "./Utbetaling";

class InntektFormue extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		return (
			<StegFaktum tittelId="inntektbolk.tittel">
				<YtelserFraNAV />
				<SoknaderUnderBehandling />
				<Bostotte fakta={fakta} />
				<Eiendeler fakta={fakta} />
				<Bankinnskudd fakta={fakta} />
				<Utbetaling fakta={fakta} />
			</StegFaktum>
		);
	}
}

export default connect((state: FaktumAppState, props: any) => {
	return {
		fakta: state.faktumStore.fakta
	};
})(InntektFormue);
