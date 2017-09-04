import * as React from "react";
import { connect } from "react-redux";
import {
	FaktumStoreState,
	FaktumComponentProps
} from "../../../nav-skjema/redux/reducer";
import Steg from "../../../nav-skjema/components/steg";
import Sivilstatus from "./Sivilstatus";
import Barn from "./Barn";

class Familie extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		return (
			<Steg tittelId="familiebolk.tittel">
				<Sivilstatus fakta={fakta} />
				<Barn fakta={fakta} />
			</Steg>
		);
	}
}

export default connect((state: FaktumStoreState, props: any) => {
	return {
		fakta: state.faktumStore.fakta
	};
})(Familie);
