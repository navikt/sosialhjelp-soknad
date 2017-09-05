import * as React from "react";
import Steg from "../../../nav-soknad/components/steg";
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
			<Steg tittelId="arbeidbolk.tittel">
				<Jobb fakta={fakta} />
				<Studie fakta={fakta} />
			</Steg>
		);
	}
}

export default connect((state: FaktumStoreState, props: any) => {
	return {
		fakta: state.faktumStore.fakta
	};
})(ArbeidOgUtdanning);
