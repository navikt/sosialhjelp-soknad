import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { State } from "../../redux/reducers";
import {
	radioCheckKeys,
	inputKeys,
	faktumIsSelected,
	getFaktumVerdi
} from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";

class Bosituasjon extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const bosituasjon = radioCheckKeys("bosituasjon");
		const annen = radioCheckKeys("bosituasjon.annet.botype");
		const barnUnder18 = radioCheckKeys("bosituasjon.barnunder18");
		const barnUnder18True = inputKeys("bosituasjon.barnunder18.true.antall");
		const over18 = radioCheckKeys("bosituasjon.personover18");
		const over18True = inputKeys("bosituasjon.personover18.true.antall");
		return (
			<StegFaktum tittelId="bosituasjonbolk.tittel">
				<SporsmalFaktum faktumKey={bosituasjon.faktum} required={true}>
					<RadioFaktum faktumKey={bosituasjon.faktum} value="eier" />
					<RadioFaktum faktumKey={bosituasjon.faktum} value="leierprivat" />
					<RadioFaktum faktumKey={bosituasjon.faktum} value="leierkommunalt" />
					<RadioFaktum faktumKey={bosituasjon.faktum} value="ingen" />
					<RadioFaktum faktumKey={bosituasjon.faktum} value="annet" />
					<Underskjema
						visible={getFaktumVerdi(fakta, bosituasjon.faktum) === "annet"}>
						<SporsmalFaktum faktumKey={annen.faktum}>
							{/*TODO opprette checkboxgruppefaktumet*/}
							<RadioFaktum faktumKey={annen.faktum} value="institusjon" />
							<RadioFaktum faktumKey={annen.faktum} value="krisesenter" />
							<RadioFaktum faktumKey={annen.faktum} value="fengsel" />
							<RadioFaktum faktumKey={annen.faktum} value="venner" />
							<RadioFaktum faktumKey={annen.faktum} value="foreldre" />
							<RadioFaktum faktumKey={annen.faktum} value="familie" />
						</SporsmalFaktum>
					</Underskjema>
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey={barnUnder18.faktum} required={true}>
					<RadioFaktum faktumKey={barnUnder18.faktum} value="true" />
					<Underskjema
						visible={faktumIsSelected(
							getFaktumVerdi(fakta, barnUnder18.faktum)
						)}>
						<BelopFaktum
							required={true}
							faktumKey={barnUnder18True.faktum}
							kunHeltall={true}
							maxLength={3}
							bredde="xs"
						/>
					</Underskjema>
					<RadioFaktum faktumKey={barnUnder18.faktum} value="false" />
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey={over18.faktum} required={true}>
					<RadioFaktum faktumKey={over18.faktum} value="true" />
					<Underskjema
						visible={faktumIsSelected(getFaktumVerdi(fakta, over18.faktum))}>
						<BelopFaktum
							required={true}
							faktumKey={over18True.faktum}
							maxLength={3}
							kunHeltall={true}
							bredde="xs"
						/>
					</Underskjema>
					<RadioFaktum faktumKey={over18.faktum} value="false" />
				</SporsmalFaktum>{" "}
			</StegFaktum>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data
	};
})(Bosituasjon);
