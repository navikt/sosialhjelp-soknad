import * as React from "react";
import { connect } from "react-redux";
import { SoknadAppState } from "../redux/reduxTypes";

import ValgMedUnderskjema from "../components/valgMedUnderskjema";
import RadioFaktum from "../faktum/RadioFaktum";
import Underskjema from "../components/underskjema";
import { FaktumComponentProps } from "../redux/fakta/faktaTypes";

import SporsmalFaktum from "./SporsmalFaktum";

interface OwnProps {
	/** Nøkkel til spørsmålets faktum */
	faktumKey: string;
	/** Id til faktum dersom dette er nødvendig */
	faktumId?: number;
	/** Må settes dersom ja/nei valget settes som properties på et eget faktum */
	jaNeiPropFaktum?: {
		faktumKey: string;
		property?: string;
		faktumId?: number;
	};
	/** Om faktumet skal være synlig eller ikke */
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
		const {
			fakta,
			faktumKey,
			faktumId,
			jaNeiPropFaktum,
			children
		} = this.props;
		const valgFaktum = radioCheckKeys(faktumKey);
		const harSkjema = children !== undefined;
		const erValgtVerdi = jaNeiPropFaktum
			? getPropertyVerdi(
					fakta,
					jaNeiPropFaktum.faktumKey,
					jaNeiPropFaktum.property,
					jaNeiPropFaktum.faktumId
				)
			: getFaktumVerdi(fakta, valgFaktum.faktum);
		const visSkjema = harSkjema && faktumIsSelected(erValgtVerdi);
		const radioProps = jaNeiPropFaktum
			? jaNeiPropFaktum
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
