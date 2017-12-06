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
		const sporsmalFaktum = radioCheckKeys(faktumKey);
		/** Sjekk om komponenten har children og dermed skal vise skjema når ja er valgtg */
		const harSkjema = children !== undefined;
		/** Hent ut true/false verdien fra faktumet, eller fra property på jaNeiPropFaktum dersom det er satt */
		const erValgtVerdi = jaNeiPropFaktum
			? getPropertyVerdi(
					fakta,
					jaNeiPropFaktum.faktumKey,
					jaNeiPropFaktum.property,
					jaNeiPropFaktum.faktumId
				)
			: getFaktumVerdi(fakta, sporsmalFaktum.faktum);
		/** Vis kun skjema dersom komponenten har fått inn skjema og at ja er valgt */
		const visSkjema = harSkjema && faktumIsSelected(erValgtVerdi);
		/** Variabel som holder i properties for radioFaktumene */
		const radioProps = jaNeiPropFaktum
			? jaNeiPropFaktum
			: {
					faktumKey: sporsmalFaktum.faktum,
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
