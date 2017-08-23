import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import Steg from "../../../skjema/components/steg";
import { connect } from "react-redux";
import { FaktumState, FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys } from "../../../skjema/utils";

import FaktumCheckbox from "../../../skjema/faktum/FaktumCheckbox";
import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

class Bosituasjon extends React.Component<FaktumComponentProps, any> {
	render() {
		const { faktum } = this.props;
		const bosituasjon = radioCheckKeys("bosituasjon");
		const annen = radioCheckKeys("bosituasjon.annet.true");
		return (
			<Steg tittelId="bosituasjonbolk.tittel">
				<Sporsmal sporsmalId={bosituasjon.sporsmal}>
					<FaktumRadio faktumKey={bosituasjon.faktum} value="eier" />
					<FaktumRadio faktumKey={bosituasjon.faktum} value="leierprivat" />
					<FaktumRadio faktumKey={bosituasjon.faktum} value="leierkommunalt" />
					<FaktumRadio faktumKey={bosituasjon.faktum} value="ingen" />
					<FaktumRadio faktumKey={bosituasjon.faktum} value="annet" />
					<Underskjema visible={faktum.get(bosituasjon.faktum) === "annet"}>
						<FaktumSkjemagruppe tittelId={annen.sporsmal}>
							<FaktumCheckbox faktumKey={annen.faktum} part="institusjon" />
							<FaktumCheckbox faktumKey={annen.faktum} part="krisesenter" />
							<FaktumCheckbox faktumKey={annen.faktum} part="fengsel" />
							<FaktumCheckbox faktumKey={annen.faktum} part="venner" />
							<FaktumCheckbox faktumKey={annen.faktum} part="foreldre" />
							<FaktumCheckbox faktumKey={annen.faktum} part="familie" />
						</FaktumSkjemagruppe>
					</Underskjema>
				</Sporsmal>
			</Steg>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(Bosituasjon);
