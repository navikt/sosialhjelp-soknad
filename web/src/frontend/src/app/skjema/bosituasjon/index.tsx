import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import Steg from "../../../skjema/components/steg";
import { connect } from "react-redux";
import {
	FaktumStoreState,
	FaktumComponentProps
} from "../../../skjema/reducer";
import { radioCheckKeys } from "../../../skjema/utils";

import FaktumCheckbox from "../../../skjema/faktum/FaktumCheckbox";
import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

class Bosituasjon extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const bosituasjon = radioCheckKeys("bosituasjon");
		const annen = radioCheckKeys("bosituasjon.annet.botype");
		return (
			<Steg tittelId="bosituasjonbolk.tittel">
				<Sporsmal sporsmalId={bosituasjon.sporsmal}>
					<FaktumRadio faktumKey={bosituasjon.faktum} option="eier" />
					<FaktumRadio faktumKey={bosituasjon.faktum} option="leierprivat" />
					<FaktumRadio faktumKey={bosituasjon.faktum} option="leierkommunalt" />
					<FaktumRadio faktumKey={bosituasjon.faktum} option="ingen" />
					<FaktumRadio faktumKey={bosituasjon.faktum} option="annet" />
					<Underskjema visible={fakta.get(bosituasjon.faktum) === "annet"}>
						<FaktumSkjemagruppe tittelId={annen.sporsmal}>
							{/*TODO opprette checkboxgruppefaktumet*/}
							<FaktumCheckbox faktumKey={annen.faktum} option="institusjon" />
							<FaktumCheckbox faktumKey={annen.faktum} option="krisesenter" />
							<FaktumCheckbox faktumKey={annen.faktum} option="fengsel" />
							<FaktumCheckbox faktumKey={annen.faktum} option="venner" />
							<FaktumCheckbox faktumKey={annen.faktum} option="foreldre" />
							<FaktumCheckbox faktumKey={annen.faktum} option="familie" />
						</FaktumSkjemagruppe>
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
