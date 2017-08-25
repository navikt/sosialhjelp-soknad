import * as React from "react";
import Steg from "../../../skjema/components/steg";
import { connect } from "react-redux";
import { FaktumComponentProps, FaktumState } from "../../../skjema/reducer";
import Jobb from "./Jobb";
import Studie from "./Studie";

class ArbeidOgUtdanning extends React.Component<FaktumComponentProps, any> {
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
