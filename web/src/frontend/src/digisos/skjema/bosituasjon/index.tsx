import * as React from "react";
import { connect } from "react-redux";

import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";
import {
	radioCheckKeys,
	inputKeys,
	getFaktumVerdi
} from "../../../nav-soknad/utils";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";

import { State } from "../../redux/reducers";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";

class Bosituasjon extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const bosituasjon = radioCheckKeys("bosituasjon");
		const annen = radioCheckKeys("bosituasjon.annet.botype");
		const antall = inputKeys("bosituasjon.antallpersoner");
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.bosituasjonbolk}>
				<SporsmalFaktum faktumKey={bosituasjon.faktum} required={true}>
					<RadioFaktum faktumKey={bosituasjon.faktum} value="eier" />
					<RadioFaktum faktumKey={bosituasjon.faktum} value="leier" />
					<RadioFaktum faktumKey={bosituasjon.faktum} value="kommunal" />
					<RadioFaktum faktumKey={bosituasjon.faktum} value="ingen" />
					<RadioFaktum faktumKey={bosituasjon.faktum} value="annet" />
					<Underskjema
						visible={getFaktumVerdi(fakta, bosituasjon.faktum) === "annet"}
					>
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
				<SporsmalFaktum faktumKey={antall.faktum} >
					<BelopFaktum
							faktumKey={antall.faktum}
							maxLength={2}
							kunHeltall={true}
							bredde="xs"
						/>
				</SporsmalFaktum>
			</DigisosSkjemaSteg>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data
	};
})(Bosituasjon);
