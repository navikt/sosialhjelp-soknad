import * as React from "react";
import ValgMedUnderskjema from "../components/valgMedUnderskjema";
import Underskjema from "../components/underskjema";
import Sporsmal, { LegendTittleStyle } from "../components/sporsmal/Sporsmal";
import { erMobilVisning } from "../utils/domUtils";
import { SporsmalFaktumTekst } from "../types";
import RadioEnhanced from "./RadioEnhanced";


interface Props {
	/** Nøkkel til spørsmålets faktum */
	faktumKey: string;

	/** Når skjema skal vises - default nei */
	skjemaTilhorerValg?: "ja" | "nei";
	/** Om faktumet skal være synlig eller ikke */
	visible?: boolean;
	id?: string;
	legendTittelStyle?: LegendTittleStyle;
	tekster: SporsmalFaktumTekst;

	verdi: null | boolean;
	onChange?: (verdi: boolean) => void;
}

class JaNeiSporsmal extends React.Component<Props, {}> {

	handleOnChange(verdi: any): void {
		if(this.props.onChange) {
			this.props.onChange(verdi);
		}
	}

	render() {
		const {
			faktumKey,
			children,
			verdi
		} = this.props;

		/** Sjekk om komponenten har children og dermed skal vise skjema når ja er valtg */
		const harUnderSkjema = children !== undefined;
		/** Hent ut true/false verdien fra faktumet, eller fra property på jaNeiPropFaktum dersom det er satt */
		// const jaNeiVerdi = verdi;
		/** Vis kun skjema dersom komponenten har fått inn skjema og at ja er valgt */
		const visUnderSkjema = harUnderSkjema && verdi === true;
			// (harSkjema && (skjemaTilhorerValg === "ja" && jaNeiVerdi === "true")) ||
			// (skjemaTilhorerValg === "nei" && jaNeiVerdi === "false");
		/** Variabel som holder i properties for radioFaktumene */

		let idRadioJa: string = null;
		let idRadioNei: string = null;
		if (this.props.id) {
			idRadioJa = this.props.id + "_radio_ja";
			idRadioNei = this.props.id + "_radio_nei";
		} else {
			idRadioJa = faktumKey.replace(/\./g, "_") + "_radio_ja";
			idRadioJa = idRadioJa.replace(/__/g, "_");
			idRadioNei = faktumKey.replace(/\./g, "_") + "_radio_nei";
			idRadioNei = idRadioNei.replace(/__/g, "_");
		}

		const mobilVisning = erMobilVisning();

		if (this.props.visible === false) {
			return null;
		}
		return (
			<Sporsmal
				tekster={this.props.tekster}
				style={visUnderSkjema ? "jaNeiSporsmal" : "normal"}
				legendTittelStyle={this.props.legendTittelStyle || LegendTittleStyle.DEFAULT}
			>
				<ValgMedUnderskjema
					underskjema={ children ?
						<Underskjema visible={visUnderSkjema}>{children}</Underskjema> : <span/>
					}
				>
					<RadioEnhanced
						getName={() => idRadioJa}
						faktumKey={this.props.faktumKey}
						id={idRadioJa}
						value={"true"}
						checked={verdi && verdi === true}
						className="inputPanel__smal"
						onChange={() => this.handleOnChange(true)}

					/>
					{!mobilVisning && (
						<RadioEnhanced
							faktumKey={this.props.faktumKey}
							id={idRadioNei}
							value={"false"}
							checked={verdi !== null && verdi === false}
							getName={() =>  idRadioNei}
							onChange={() => this.handleOnChange(false)}
							className="inputPanel__smal"
						/>
					) }
				</ValgMedUnderskjema>
				{mobilVisning && (
					<RadioEnhanced
						faktumKey={this.props.faktumKey}
						id={idRadioNei}
						value={"false"}
						checked={verdi !== null && verdi === false}
						getName={() =>  idRadioNei}
						onChange={() => this.handleOnChange(false)}
						className={
							"inputPanel__smal inputPanel__mobil--nei " +
							visUnderSkjema ? "inputPanel__mobil--uten-underSkjema" : ""}
					/>
				) }
			</Sporsmal>
		);
	}

}

export default JaNeiSporsmal;
