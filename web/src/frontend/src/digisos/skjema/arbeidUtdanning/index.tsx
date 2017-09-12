import * as React from "react";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { State } from "../../redux/reducers";
import Jobb from "./Jobb";
import Studie from "./Studie";

class ArbeidOgUtdanning extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		return (
			<StegFaktum tittelId="arbeidbolk.tittel">
				<Jobb fakta={fakta} />
				<Studie fakta={fakta} />
			</StegFaktum>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.faktum.data
	};
})(ArbeidOgUtdanning);
