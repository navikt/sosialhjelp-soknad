import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { radioCheckKeys } from "../../../nav-skjema/utils";

import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-skjema/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-skjema/components/underskjema";
import Barneinfo from "./Barneinfo";

class Barn extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const barn = radioCheckKeys("familie.barn");

		return (
			<Sporsmal sporsmalId={barn.sporsmal}>
				<RadioFaktum faktumKey={barn.faktum} option="true" />
				<Underskjema visible={fakta.get(barn.faktum) === "true"}>
					<SkjemagruppeFaktum tittelId="familie.barn.true.tittel">
						<Barneinfo
							{...this.props}
							faktumKey="familie.barn.true"
							nummer={1}
						/>
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={barn.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Barn;
