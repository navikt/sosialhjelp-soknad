import * as React from "react";
import Sporsmal from "../../../nav-soknad/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { radioCheckKeys } from "../../../nav-soknad/utils";

import FaktumRadio from "../../../nav-soknad/faktum/RadioFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";
import Barneinfo from "./Barneinfo";

class Barn extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const barn = radioCheckKeys("familie.barn");

		return (
			<Sporsmal sporsmalId={barn.sporsmal} hjelpetekstId={barn.hjelpetekst}>
				<FaktumRadio faktumKey={barn.faktum} option="true" />
				<Underskjema visible={fakta.get(barn.faktum) === "true"}>
					<Barneinfo {...this.props} faktumKey="familie.barn.true" nummer={1} />
				</Underskjema>
				<FaktumRadio faktumKey={barn.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Barn;
