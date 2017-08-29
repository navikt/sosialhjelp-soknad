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
		const harBarn = radioCheckKeys("familie.barn.true");
		return (
			<Sporsmal sporsmalId={barn.sporsmal}>
				<FaktumRadio faktumKey={barn.faktum} option="true" />
				<Underskjema visible={fakta.get(barn.faktum) === "true"}>
					<FaktumSkjemagruppe tittelId={harBarn.sporsmal}>
						<Barneinfo
							{...this.props}
							faktumKey="familie.barneinfo"
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
