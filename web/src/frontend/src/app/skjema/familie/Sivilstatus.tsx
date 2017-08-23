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

class Sivilstatus extends React.Component<StateProps & DispatchProps, any> {
	render() {
		const { faktum } = this.props;
		return (
			<Sporsmal sporsmalId="familie.sivilstatus.sporsmal">
				<FaktumRadio faktumKey="familie.sivilstatus" value="gift" />
				<Underskjema visible={faktum.get("familie.sivilstatus") === "gift"}>
					<FaktumSkjemagruppe tittelId="arbeid.dinsituasjon.student.true.heltid.sporsmal">
						<div className="skjemaelement">what</div>
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey="familie.sivilstatus" value="ugift" />
				<FaktumRadio faktumKey="familie.sivilstatus" value="samboer" />
				<FaktumRadio faktumKey="familie.sivilstatus" value="enke" />
				<FaktumRadio faktumKey="familie.sivilstatus" value="skilt" />
			</Sporsmal>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(Sivilstatus);
