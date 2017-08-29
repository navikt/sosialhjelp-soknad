import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { faktumIsSelected, radioCheckKeys } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

class Jobb extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const jobb = radioCheckKeys("dinsituasjon.jobb");
		const jobber = radioCheckKeys("dinsituasjon.jobb.true");
		return (
			<Sporsmal sporsmalId={jobb.sporsmal}>
				<FaktumRadio faktumKey={jobb.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(fakta.get(jobb.faktum))}>
					<FaktumSkjemagruppe tittelId={jobber.sporsmal}>
						<FaktumRadio faktumKey={jobber.faktum} option="heltid" />
						<FaktumRadio faktumKey={jobber.faktum} option="deltid" />
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={jobb.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Jobb;
