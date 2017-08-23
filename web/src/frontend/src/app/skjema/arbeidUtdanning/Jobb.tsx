import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { FaktumMap } from "../../../skjema/reducer";
import { faktumIsSelected, radioCheckKeys } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

interface Props {
	faktum: FaktumMap;
}

class Jobb extends React.Component<Props, any> {
	render() {
		const { faktum } = this.props;
		const jobb = radioCheckKeys("dinsituasjon.jobb");
		const jobber = radioCheckKeys("dinsituasjon.jobb.true");
		return (
			<Sporsmal sporsmalId={jobb.sporsmal}>
				<FaktumRadio faktumKey={jobb.faktum} value="true" />
				<Underskjema visible={faktumIsSelected(faktum.get(jobb.faktum))}>
					<FaktumSkjemagruppe tittelId={jobber.sporsmal}>
						<FaktumRadio faktumKey={jobber.faktum} value="heltid" />
						<FaktumRadio faktumKey={jobber.faktum} value="deltid" />
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={jobb.faktum} value="false" />
			</Sporsmal>
		);
	}
}

export default Jobb;
