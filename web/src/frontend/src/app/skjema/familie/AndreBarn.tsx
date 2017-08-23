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

class AndreBarn extends React.Component<StateProps & DispatchProps, any> {
	render() {
		const { faktum } = this.props;
		const FAKTUM = "familie.andrebarn";
		return (
			<Sporsmal sporsmalId={`${FAKTUM}.sporsmal`}>
				<FaktumRadio faktumKey={FAKTUM} value="true" />
				<Underskjema visible={faktum.get(FAKTUM) === "true"}>
					<FaktumSkjemagruppe tittelId={`${FAKTUM}.true.sporsmal`}>
						<div className="skjemaelement">TODO</div>
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={FAKTUM} value="false" />
			</Sporsmal>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(AndreBarn);
