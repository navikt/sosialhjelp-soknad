import * as React from "react";
import { connect } from "react-redux";
import { SoknadAppState } from "../redux/reduxTypes";

import ValgMedUnderskjema from "../components/valgMedUnderskjema";
import RadioFaktum from "../faktum/RadioFaktum";
import Underskjema from "../components/underskjema";
import { FaktumComponentProps } from "../redux/fakta/faktaTypes";

import SporsmalFaktum from "./SporsmalFaktum";

interface OwnProps {
	faktumKey: string;
	faktumId?: number;
	jaNeiFaktum?: {
		faktumKey: string;
		property?: string;
		faktumId?: number;
	};
	visible?: boolean;
}
type Props = OwnProps & FaktumComponentProps;

import {
	faktumIsSelected,
	getFaktumVerdi,
	getPropertyVerdi,
	radioCheckKeys
} from "../utils";

class JaNeiSporsmalFaktum extends React.Component<Props, {}> {
	render() {
		const { fakta, faktumKey, faktumId, jaNeiFaktum, children } = this.props;
		const valgFaktum = radioCheckKeys(faktumKey);
		const harSkjema = children !== undefined;
		const faktumVerdi = jaNeiFaktum
			? getPropertyVerdi(
					fakta,
					jaNeiFaktum.faktumKey,
					jaNeiFaktum.property,
					jaNeiFaktum.faktumId
				)
			: getFaktumVerdi(fakta, valgFaktum.faktum);
		const visSkjema = harSkjema && faktumIsSelected(faktumVerdi);
		const radioProps = jaNeiFaktum
			? jaNeiFaktum
			: {
					faktumKey: valgFaktum.faktum,
					faktumId
				};

		return (
			<SporsmalFaktum
				{...this.props}
				style={visSkjema ? "jaNeiSporsmal" : "normal"}
			>
				<ValgMedUnderskjema
					underskjema={
						<Underskjema visible={visSkjema}>{children}</Underskjema>
					}
				>
					<RadioFaktum {...radioProps} value="true" />
					<RadioFaktum {...radioProps} value="false" />
				</ValgMedUnderskjema>
			</SporsmalFaktum>
		);
	}
}

export default connect((state: SoknadAppState, props: OwnProps) => {
	return {
		fakta: state.fakta.data
	};
})(JaNeiSporsmalFaktum);
