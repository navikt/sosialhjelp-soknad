import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import Steg from "../../../skjema/components/steg";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";
import { faktumIsSelected } from "../../../skjema/utils";
import { DispatchProps } from "../../../redux/types";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

interface StateProps {
	faktum: FaktumMap;
}

class Steg1 extends React.Component<StateProps & DispatchProps, any> {
	render() {
		const { faktum } = this.props;
		return (
			<Steg tittelId="arbeidbolk.tittel">
				<Sporsmal sporsmalId="dinsituasjon.jobb.sporsmal">
					<FaktumRadio faktumKey="dinsituasjon.jobb" value="true" />
					<Underskjema
						visible={faktumIsSelected(faktum.get("dinsituasjon.jobb"))}
					>
						<FaktumSkjemagruppe tittelId="dinsituasjon.jobb.true.sporsmal">
							<FaktumRadio faktumKey="dinsituasjon.jobb.true" value="heltid" />
							<FaktumRadio faktumKey="dinsituasjon.jobb.true" value="deltid" />
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="dinsituasjon.jobb" value="false" />
				</Sporsmal>
				<Sporsmal sporsmalId="dinsituasjon.studerer.sporsmal">
					<FaktumRadio faktumKey="dinsituasjon.studerer" value="true" />
					<Underskjema
						visible={faktumIsSelected(faktum.get("dinsituasjon.studerer"))}
					>
						<FaktumSkjemagruppe tittelId="dinsituasjon.studerer.true.sporsmal">
							<FaktumRadio
								faktumKey="dinsituasjon.studerer.true"
								value="heltid"
							/>
							<FaktumRadio
								faktumKey="dinsituasjon.studerer.true"
								value="deltid"
							/>
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="dinsituasjon.studerer" value="false" />
				</Sporsmal>
			</Steg>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(Steg1);
