import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";
import { DispatchProps } from "../../../redux/types";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

interface StateProps {
	faktum: FaktumMap;
}

class Barn extends React.Component<StateProps & DispatchProps, any> {
	render() {
		const { faktum } = this.props;
		return (
			<Sporsmal sporsmalId="familie.barn.sporsmal">
				<FaktumRadio faktumKey="familie.barn" value="true" />
				<Underskjema visible={faktum.get("familie.barn") === "true"}>
					<FaktumSkjemagruppe tittelId="familie.barn">
						<div className="skjemaelement">what</div>
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey="familie.barn" value="false" />
			</Sporsmal>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(Barn);
