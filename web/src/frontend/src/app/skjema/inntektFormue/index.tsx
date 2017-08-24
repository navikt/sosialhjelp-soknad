import * as React from "react";
import Steg from "../../../skjema/components/steg";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";

import YtelserFraNAV from "./YtelserFraNAV";
import SoknaderUnderBehandling from "./SoknaderUnderBehandling";
import Bostotte from "./Bostotte";
import Eiendeler from "./Eiendeler";
import Bankinnskudd from "./Bankinnskudd";
import Utbetaling from "./Utbetaling";

interface StateProps {
	faktum: FaktumMap;
}

class InntektFormue extends React.Component<StateProps, any> {
	render() {
		const { faktum } = this.props;
		return (
			<Steg tittelId="Inntekt og formue">
				<YtelserFraNAV />
				<SoknaderUnderBehandling />
				<Bostotte faktum={faktum} />
				<Eiendeler faktum={faktum} />
				<Bankinnskudd faktum={faktum} />
				<Utbetaling faktum={faktum} />
			</Steg>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(InntektFormue);
