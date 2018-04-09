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
	/** Når skjema skal vises - default nei */
	skjemaTilhorerValg?: "ja" | "nei";
	/** Om faktumet skal være synlig eller ikke */
	visible?: boolean;
	id?: string;
}
type Props = OwnProps & FaktumComponentProps;

import { getFaktumVerdi, getPropertyVerdi, radioCheckKeys } from "../utils";

class JaNeiSporsmalFaktum extends React.Component<Props, {}> {
	render() {
		const {
			fakta,
			faktumKey,
			faktumId,
			jaNeiPropFaktum,
			skjemaTilhorerValg = "ja",
			children
		} = this.props;
		const sporsmalFaktum = radioCheckKeys(faktumKey);
		/** Sjekk om komponenten har children og dermed skal vise skjema når ja er valgtg */
		const harSkjema = children !== undefined;
		/** Hent ut true/false verdien fra faktumet, eller fra property på jaNeiPropFaktum dersom det er satt */
		const jaNeiVerdi = jaNeiPropFaktum
			? getPropertyVerdi(
					fakta,
					jaNeiPropFaktum.faktumKey,
					jaNeiPropFaktum.property,
					jaNeiPropFaktum.faktumId
				)
			: getFaktumVerdi(fakta, sporsmalFaktum.faktum);
		/** Vis kun skjema dersom komponenten har fått inn skjema og at ja er valgt */
		const visSkjema =
			(harSkjema && (skjemaTilhorerValg === "ja" && jaNeiVerdi === "true")) ||
			(skjemaTilhorerValg === "nei" && jaNeiVerdi === "false");
		/** Variabel som holder i properties for radioFaktumene */
		const radioProps = jaNeiPropFaktum
			? jaNeiPropFaktum
			: {
					faktumKey: sporsmalFaktum.faktum,
					faktumId
				};

		let id_radio_ja = null;
		let id_radio_nei = null;
		if (this.props.id) {
			id_radio_ja = this.props.id + "_radio_ja";
			id_radio_nei = this.props.id + "_radio_nei";
		} else {
			id_radio_ja = faktumKey.replace(/\./g, "_") + "_" + this.randomId() + "_radio_ja";
			id_radio_ja = id_radio_ja.replace(/__/g, "_");
			id_radio_nei = faktumKey.replace(/\./g, "_") + "_" + this.randomId() + "_radio_nei";
			id_radio_nei = id_radio_nei.replace(/__/g, "_");
		}

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
					<RadioFaktum id={id_radio_ja} {...radioProps} value="true" />
					<RadioFaktum id={id_radio_nei} {...radioProps} value="false" />
				</ValgMedUnderskjema>
			</SporsmalFaktum>
		);
	}

	private randomId() {
		return Math.round(Math.random() * 1000000);
	}
}

export default connect((state: SoknadAppState, props: OwnProps) => {
	return {
		fakta: state.fakta.data
	};
})(JaNeiSporsmalFaktum);
