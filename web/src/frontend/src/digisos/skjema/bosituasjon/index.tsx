import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import Steg from "../../../nav-skjema/components/steg";
import { connect } from "react-redux";
import {
	FaktumStoreState,
	FaktumComponentProps
} from "../../../nav-skjema/redux/reducer";
import { radioCheckKeys } from "../../../nav-skjema/utils";

import CheckboxFaktum from "../../../nav-skjema/faktum/CheckboxFaktum";
import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-skjema/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-skjema/components/underskjema";

class Bosituasjon extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const bosituasjon = radioCheckKeys("bosituasjon");
		const annen = radioCheckKeys("bosituasjon.annet.botype");
		return (
			<Steg tittelId="bosituasjonbolk.tittel">
				<Sporsmal sporsmalId={bosituasjon.sporsmal}>
					<RadioFaktum faktumKey={bosituasjon.faktum} option="eier" />
					<RadioFaktum faktumKey={bosituasjon.faktum} option="leierprivat" />
					<RadioFaktum faktumKey={bosituasjon.faktum} option="leierkommunalt" />
					<RadioFaktum faktumKey={bosituasjon.faktum} option="ingen" />
					<RadioFaktum faktumKey={bosituasjon.faktum} option="annet" />
					<Underskjema visible={fakta.get(bosituasjon.faktum) === "annet"}>
						<SkjemagruppeFaktum tittelId={annen.sporsmal}>
							{/*TODO opprette checkboxgruppefaktumet*/}
							<CheckboxFaktum faktumKey={annen.faktum} option="institusjon" />
							<CheckboxFaktum faktumKey={annen.faktum} option="krisesenter" />
							<CheckboxFaktum faktumKey={annen.faktum} option="fengsel" />
							<CheckboxFaktum faktumKey={annen.faktum} option="venner" />
							<CheckboxFaktum faktumKey={annen.faktum} option="foreldre" />
							<CheckboxFaktum faktumKey={annen.faktum} option="familie" />
						</SkjemagruppeFaktum>
					</Underskjema>
				</Sporsmal>
			</Steg>
		);
	}
}

export default connect((state: FaktumStoreState, props: any) => {
	return {
		fakta: state.faktumStore.fakta
	};
})(Bosituasjon);
