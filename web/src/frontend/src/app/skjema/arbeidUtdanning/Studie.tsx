import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { faktumIsSelected, radioCheckKeys } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

class Studie extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const studie = radioCheckKeys("dinsituasjon.studerer");
		const studerer = radioCheckKeys("dinsituasjon.studerer.true.grad");
		return (
			<Sporsmal sporsmalId={studie.sporsmal}>
				<FaktumRadio faktumKey={studie.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(fakta.get(studie.faktum))}>
					<FaktumSkjemagruppe tittelId={studerer.sporsmal}>
						<FaktumRadio faktumKey={studerer.faktum} option="heltid" />
						<FaktumRadio faktumKey={studerer.faktum} option="deltid" />
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={studie.faktum} option="false" />
			</Sporsmal>
		);
	}
}
export default Studie;
