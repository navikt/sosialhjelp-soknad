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
				<Sporsmal sporsmalId="begrunnelse.hvorfor.sporsmal">
					<FaktumTextarea
						faktumKey="begrunnelse.hvorfor"
						labelId="begrunnelse.hvorfor.info"
					/>
				</Sporsmal>
				<Sporsmal sporsmalId="begrunnelse.hva.sporsmal">
					<FaktumTextarea
						faktumKey="begrunnelse.hva"
						labelId="begrunnelse.hva.info"
					/>
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
