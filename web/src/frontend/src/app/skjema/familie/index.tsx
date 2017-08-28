import * as React from "react";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";
import Steg from "../../../skjema/components/steg";
import Sivilstatus from "./Sivilstatus";
import Barn from "./Barn";

interface StateProps {
	faktum: FaktumMap;
}

class Familie extends React.Component<StateProps, {}> {
	render() {
		const { faktum } = this.props;
		return (
			<Steg tittelId="familiebolk.tittel">
				<Sivilstatus faktum={faktum} />
				<Barn faktum={faktum} />
			</Steg>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(Familie);
