import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import { connect } from "react-redux";
import {
	FaktumStoreState,
	FaktumComponentProps
} from "../../../nav-soknad/redux/reducer";
import {
	radioCheckKeys,
	inputKeys,
	faktumIsSelected,
	getFaktumVerdi
} from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";

class Bosituasjon extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const bosituasjon = radioCheckKeys("bosituasjon");
		const annen = radioCheckKeys("bosituasjon.annet.true.botype");
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
						visible={getFaktumVerdi(fakta, bosituasjon.faktum) === "annet"}
					>
						<SkjemagruppeFaktum faktumId={annen.faktum}>
							{/*TODO opprette checkboxgruppefaktumet*/}
							<RadioFaktum faktumKey={annen.faktum} option="institusjon" />
							<RadioFaktum faktumKey={annen.faktum} option="krisesenter" />
							<RadioFaktum faktumKey={annen.faktum} option="fengsel" />
							<RadioFaktum faktumKey={annen.faktum} option="venner" />
							<RadioFaktum faktumKey={annen.faktum} option="foreldre" />
							<RadioFaktum faktumKey={annen.faktum} option="familie" />
						</SkjemagruppeFaktum>
					</Underskjema>
				</SporsmalFaktum>
				<SporsmalFaktum faktumId={over18.faktum}>
					<RadioFaktum faktumKey={over18.faktum} option="true" />
					<Underskjema
						visible={faktumIsSelected(getFaktumVerdi(fakta, over18.faktum))}
					>
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

export default connect((state: FaktumStoreState, props: any) => {
	return {
		fakta: state.faktumStore.fakta
	};
})(Bosituasjon);
