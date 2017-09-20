import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { getFaktumVerdi, radioCheckKeys } from "../../../nav-soknad/utils";

import FaktumRadio from "../../../nav-soknad/faktum/RadioFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";
import Barneinfo from "./Barneinfo";

class Barn extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const barn = radioCheckKeys("familie.barn");

		return (
			<SporsmalFaktum faktumKey={barn.faktum} required={true}>
				<FaktumRadio faktumKey={barn.faktum} value="true" />
				<Underskjema visible={getFaktumVerdi(fakta, barn.faktum) === "true"}>
					<Barneinfo {...this.props} faktumKey="familie.barn.true" nummer={1} />
				</Underskjema>
				<FaktumRadio faktumKey={barn.faktum} value="false" />
			</SporsmalFaktum>
		);
	}
}

export default Barn;
