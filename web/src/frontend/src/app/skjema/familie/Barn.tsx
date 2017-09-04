import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";
import Barneinfo from "./Barneinfo";

class Barn extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const barn = radioCheckKeys("familie.barn");

		return (
			<Sporsmal sporsmalId={barn.sporsmal} hjelpetekstId={barn.hjelpetekst}>
				<FaktumRadio faktumKey={barn.faktum} option="true" />
				<Underskjema visible={fakta.get(barn.faktum) === "true"}>
					<FaktumSkjemagruppe tittelId="familie.barn.true.tittel">
						<Barneinfo
							{...this.props}
							faktumKey="familie.barn.true"
							nummer={1}
						/>
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={barn.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Barn;
