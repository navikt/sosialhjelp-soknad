import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
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
			<SporsmalFaktum faktumId={barn.faktum}>
				<FaktumRadio faktumKey={barn.faktum} option="true" />
				<Underskjema visible={fakta.get(barn.faktum) === "true"}>
					<Barneinfo {...this.props} faktumKey="familie.barn.true" nummer={1} />
				</Underskjema>
				<FaktumRadio faktumKey={barn.faktum} option="false" />
			</SporsmalFaktum>
		);
	}
}

export default Barn;
