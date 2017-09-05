import * as React from "react";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import { connect } from "react-redux";
import {
	FaktumComponentProps,
	FaktumStoreState
} from "../../../nav-soknad/redux/reducer";
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

export default connect((state: FaktumStoreState, props: any) => {
	return {
		fakta: state.faktumStore.fakta
	};
})(ArbeidOgUtdanning);
