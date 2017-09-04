import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import Steg from "../../../skjema/components/steg";
import { connect } from "react-redux";
import {
	FaktumStoreState,
	FaktumComponentProps
} from "../../../skjema/reducer";
import {
	radioCheckKeys,
	inputKeys,
	faktumIsSelected
} from "../../../skjema/utils";

import FaktumCheckbox from "../../../skjema/faktum/FaktumCheckbox";
import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";
import FaktumInput from "../../../skjema/faktum/FaktumInput";

class Bosituasjon extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const bosituasjon = radioCheckKeys("bosituasjon");
		const annen = radioCheckKeys("bosituasjon.annet.true.botype");
		const barnUnder18 = radioCheckKeys("bosituasjon.barnunder18");
		const barnUnder18True = inputKeys("bosituasjon.barnunder18.true");
		const over18 = radioCheckKeys("bosituasjon.personerover18");
		const over18True = inputKeys("bosituasjon.personerover18.true");
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

				<Sporsmal sporsmalId={barnUnder18.sporsmal}>
					<FaktumRadio faktumKey={barnUnder18.faktum} option="true" />
					<Underskjema
						visible={faktumIsSelected(fakta.get(barnUnder18.faktum))}
					>
						<FaktumInput
							faktumKey={barnUnder18True.faktum}
							maxLength={3}
							bredde="xs"
						/>
					</Underskjema>
					<FaktumRadio faktumKey={barnUnder18.faktum} option="false" />
				</Sporsmal>

				<Sporsmal sporsmalId={over18.sporsmal}>
					<FaktumRadio faktumKey={over18.faktum} option="true" />
					<Underskjema visible={faktumIsSelected(fakta.get(over18.faktum))}>
						<FaktumInput
							faktumKey={over18True.faktum}
							maxLength={3}
							bredde="xs"
						/>
					</Underskjema>
					<FaktumRadio faktumKey={over18.faktum} option="false" />
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
