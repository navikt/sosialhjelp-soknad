import * as React from "react";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";
import { DispatchProps } from "../../../redux/types";

import Steg from "../../../skjema/components/steg";
import Sporsmal from "../../../skjema/components/sporsmal";
import FaktumTextarea from "../../../skjema/faktum/FaktumTextarea";

interface StateProps {
	faktum: FaktumMap;
}

class Begrunnelse extends React.Component<StateProps & DispatchProps, {}> {
	render() {
		return (
			<Steg tittelId="begrunnelsebolk.tittel">
				<Sporsmal sporsmalId="begrunnelse.hvorfor">
					<FaktumTextarea faktumKey="begrunnelse.hvorfor" />
				</Sporsmal>
				<Sporsmal sporsmalId="begrunnelse.hva">
					<FaktumTextarea faktumKey="begrunnelse.hva" />
				</Sporsmal>
			</Steg>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(Begrunnelse);
