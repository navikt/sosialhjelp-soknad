import * as React from "react";
import Steg from "../../../skjema/components/steg";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";
import { DispatchProps } from "../../../redux/types";
import Jobb from "./Jobb";
import Studie from "./Studie";

interface StateProps {
	faktum: FaktumMap;
}

class ArbeidOgUtdanning extends React.Component<
	StateProps & DispatchProps,
	any
> {
	render() {
		const { faktum } = this.props;
		return (
			<Steg tittelId="arbeidbolk.tittel">
				<Jobb faktum={faktum} />
				<Studie faktum={faktum} />
			</Steg>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(ArbeidOgUtdanning);
