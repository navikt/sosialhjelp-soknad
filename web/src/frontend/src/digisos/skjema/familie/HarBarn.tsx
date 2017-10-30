import * as React from "react";

import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import FaktumRadio from "../../../nav-soknad/faktum/RadioFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { getFaktumVerdi, radioCheckKeys } from "../../../nav-soknad/utils";

import Barneinfo from "./Barneinfo";
import Barnebidrag from "./Barnebidrag";

class HarBarn extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const barn = radioCheckKeys("familie.barn");

		return (
			<SporsmalFaktum faktumKey={barn.faktum}>
				<FaktumRadio faktumKey={barn.faktum} value="true" />
				<Underskjema visible={getFaktumVerdi(fakta, barn.faktum) === "true"}>
					<Barnebidrag />
					<Barneinfo
						{...this.props}
						faktumKey="familie.barn.true.barn"
						parentFaktumKey={barn.faktum}
						nummer={1}
					/>
				</Underskjema>
				<FaktumRadio faktumKey={barn.faktum} value="false" />
			</SporsmalFaktum>
		);
	}
}

export default HarBarn;
