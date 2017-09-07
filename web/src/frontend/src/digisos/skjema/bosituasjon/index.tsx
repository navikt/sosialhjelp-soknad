import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { State } from "../../redux/reducers";
import {
	radioCheckKeys,
	inputKeys,
	faktumIsSelected,
	getFaktumVerdi
} from "../../../nav-soknad/utils";

import CheckboxFaktum from "../../../nav-soknad/faktum/CheckboxFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";

class Bosituasjon extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const bosituasjon = radioCheckKeys("bosituasjon");
		const annen = radioCheckKeys("bosituasjon.annet.true.botype");
		const barnUnder18 = radioCheckKeys("bosituasjon.barnunder18");
		const barnUnder18True = inputKeys("bosituasjon.barnunder18.true.antall");
		const over18 = radioCheckKeys("bosituasjon.personerover18");
		const over18True = inputKeys("bosituasjon.personerover18.true.antall");
		return (
			<StegFaktum tittelId="bosituasjonbolk.tittel">
				<SporsmalFaktum faktumId={bosituasjon.faktum}>
					<RadioFaktum faktumKey={bosituasjon.faktum} option="eier" />
					<RadioFaktum faktumKey={bosituasjon.faktum} option="leierprivat" />
					<RadioFaktum faktumKey={bosituasjon.faktum} option="leierkommunalt" />
					<RadioFaktum faktumKey={bosituasjon.faktum} option="ingen" />
					<RadioFaktum faktumKey={bosituasjon.faktum} option="annet" />
					<Underskjema
						visible={getFaktumVerdi(fakta, bosituasjon.faktum) === "annet"}>
						<SkjemagruppeFaktum faktumId={annen.faktum}>
							{/*TODO opprette checkboxgruppefaktumet*/}
							<CheckboxFaktum faktumKey={annen.faktum} option="institusjon" />
							<CheckboxFaktum faktumKey={annen.faktum} option="krisesenter" />
							<CheckboxFaktum faktumKey={annen.faktum} option="fengsel" />
							<CheckboxFaktum faktumKey={annen.faktum} option="venner" />
							<CheckboxFaktum faktumKey={annen.faktum} option="foreldre" />
							<CheckboxFaktum faktumKey={annen.faktum} option="familie" />
						</SkjemagruppeFaktum>
					</Underskjema>
				</SporsmalFaktum>
				<SporsmalFaktum faktumId={barnUnder18.faktum}>
					<RadioFaktum faktumKey={barnUnder18.faktum} option="true" />
					<Underskjema
						visible={faktumIsSelected(
							getFaktumVerdi(fakta, barnUnder18.faktum)
						)}>
						<InputFaktum
							faktumKey={barnUnder18True.faktum}
							maxLength={3}
							bredde="xs"
						/>
					</Underskjema>
					<RadioFaktum faktumKey={barnUnder18.faktum} option="false" />
				</SporsmalFaktum>
				<SporsmalFaktum faktumId={over18.faktum}>
					<RadioFaktum faktumKey={over18.faktum} option="true" />
					<Underskjema
						visible={faktumIsSelected(getFaktumVerdi(fakta, over18.faktum))}>
						<InputFaktum
							faktumKey={over18True.faktum}
							maxLength={3}
							bredde="xs"
						/>
					</Underskjema>
					<RadioFaktum faktumKey={over18.faktum} option="false" />
				</SporsmalFaktum>{" "}
			</StegFaktum>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.faktum.fakta
	};
})(Bosituasjon);
