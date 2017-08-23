import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

class Barn extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { faktum } = this.props;
		const barn = radioCheckKeys("familie.barn");
		const harBarn = radioCheckKeys("familie.barn.true");
		return (
			<Sporsmal sporsmalId={barn.sporsmal}>
				<FaktumRadio faktumKey={barn.faktum} value="true" />
				<Underskjema visible={faktum.get(barn.faktum) === "true"}>
					<FaktumSkjemagruppe tittelId={harBarn.sporsmal}>
						<div className="skjemaelement">what</div>
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={barn.faktum} value="false" />
			</Sporsmal>
		);
	}
}

export default Barn;
