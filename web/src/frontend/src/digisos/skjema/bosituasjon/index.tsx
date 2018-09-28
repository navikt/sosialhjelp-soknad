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
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";

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
				<SporsmalFaktum faktumKey={bosituasjon.faktum}>
					<RadioFaktum
						id="bosituasjon_radio_eier"
						faktumKey={bosituasjon.faktum}
						value="eier"
						visPanel={true}
					/>
					<RadioFaktum
						id="bosituasjon_radio_leier"
						faktumKey={bosituasjon.faktum}
						value="leier"
						visPanel={true}
					/>
					<RadioFaktum
						id="bosituasjon_radio_kommunal"
						faktumKey={bosituasjon.faktum}
						value="kommunal"
						visPanel={true}
					/>
					<RadioFaktum
						id="bosituasjon_radio_ingen"
						faktumKey={bosituasjon.faktum}
						value="ingen"
						visPanel={true}
					/>
					<RadioFaktum
						id="bosituasjon_radio_annet"
						faktumKey={bosituasjon.faktum}
						value="annet"
						visPanel={true}
					/>
					<div className="skjema-sporsmal--jaNeiSporsmal">
						<Underskjema
							visible={getFaktumVerdi(fakta, bosituasjon.faktum) === "annet"}
							arrow={true}
						>
							<SporsmalFaktum
								faktumKey={annen.faktum}
								style="system"
							>
								{/*TODO opprette checkboxgruppefaktumet*/}
								<RadioFaktum
									id="bosituasjon_radio_foreldre"
									faktumKey={annen.faktum}
									value="foreldre"
									visPanel={true}
								/>
								<RadioFaktum
									id="bosituasjon_radio_familie"
									faktumKey={annen.faktum}
									value="familie"
									visPanel={true}
								/>
								<RadioFaktum
									id="bosituasjon_radio_venner"
									faktumKey={annen.faktum}
									value="venner"
									visPanel={true}
								/>
								<RadioFaktum
									id="bosituasjon_radio_institusjon"
									faktumKey={annen.faktum}
									value="institusjon"
									visPanel={true}
								/>
								<RadioFaktum
									id="bosituasjon_radio_fengsel"
									faktumKey={annen.faktum}
									value="fengsel"
									visPanel={true}
								/>
								<RadioFaktum
									id="bosituasjon_radio_krisesenter"
									faktumKey={annen.faktum}
									value="krisesenter"
									visPanel={true}
								/>
							</SporsmalFaktum>
						</Underskjema>
					</div>
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey={antall.faktum}>
					<BelopFaktum
						faktumKey={antall.faktum}
						maxLength={2}
						kunHeltall={true}
						bredde="XS"
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
