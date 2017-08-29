import * as React from "react";
import Steg from "../../../skjema/components/steg";
import { connect } from "react-redux";
import {
	FaktumComponentProps,
	FaktumStoreState
} from "../../../skjema/reducer";
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
