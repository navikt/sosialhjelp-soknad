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

class Studie extends React.Component<Props, any> {
	render() {
		const { faktum } = this.props;
		const studie = radioCheckKeys("dinsituasjon.studerer");
		const studerer = radioCheckKeys("dinsituasjon.studerer.true");
		return (
			<Sporsmal sporsmalId={studie.sporsmal}>
				<FaktumRadio faktumKey={studie.faktum} value="true" />
				<Underskjema visible={faktumIsSelected(faktum.get(studie.faktum))}>
					<FaktumSkjemagruppe tittelId={studerer.sporsmal}>
						<FaktumRadio faktumKey={studerer.faktum} value="heltid" />
						<FaktumRadio faktumKey={studerer.faktum} value="deltid" />
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={studie.faktum} value="false" />
			</Sporsmal>
		);
	}
}
export default Studie;
