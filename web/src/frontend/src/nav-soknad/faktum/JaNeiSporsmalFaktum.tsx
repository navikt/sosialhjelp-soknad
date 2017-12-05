import * as React from "react";
import ValgMedUnderskjema from "../components/valgMedUnderskjema";
import RadioFaktum from "../faktum/RadioFaktum";
import Underskjema from "../components/underskjema";
import { Faktum } from "../types";

import SporsmalFaktum, {
	OwnProps as SporsmalFaktumProps
} from "./SporsmalFaktum";

interface Props extends SporsmalFaktumProps {
	fakta: Faktum[];
}

import { faktumIsSelected, getFaktumVerdi, radioCheckKeys } from "../utils";

class JaNeiSporsmalFaktum extends React.Component<Props, {}> {
	render() {
		const valgFaktum = radioCheckKeys(this.props.faktumKey);
		const harSkjema = this.props.children !== undefined;
		const visSkjema =
			harSkjema &&
			faktumIsSelected(getFaktumVerdi(this.props.fakta, valgFaktum.faktum));
		return (
			<SporsmalFaktum
				{...this.props}
				style={visSkjema ? "jaNeiSporsmal" : "normal"}
			>
				<ValgMedUnderskjema
					underskjema={
						<Underskjema visible={visSkjema}>{this.props.children}</Underskjema>
					}
				>
					<RadioFaktum faktumKey={valgFaktum.faktum} value="true" />
					<RadioFaktum faktumKey={valgFaktum.faktum} value="false" />
				</ValgMedUnderskjema>
			</SporsmalFaktum>
		);
	}
}

export default JaNeiSporsmalFaktum;
