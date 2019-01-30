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
import BoligIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/BoligIllustrasjon";
import {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import BosituasjonView from "../bosituasjon_ny/Bosituasjon";

class Bosituasjon extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const bosituasjon = radioCheckKeys("bosituasjon");
		const annen = radioCheckKeys("bosituasjon.annet.botype");
		const antall = inputKeys("bosituasjon.antallpersoner");
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.bosituasjonbolk} ikon={<BoligIllustrasjon/>}>
				<BosituasjonView />
				<SporsmalFaktum faktumKey={bosituasjon.faktum} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
					<RadioFaktum
						id="bosituasjon_radio_eier"
						faktumKey={bosituasjon.faktum}
						value="eier"
					/>
					<RadioFaktum
						id="bosituasjon_radio_leier"
						faktumKey={bosituasjon.faktum}
						value="leier"
					/>
					<RadioFaktum
						id="bosituasjon_radio_kommunal"
						faktumKey={bosituasjon.faktum}
						value="kommunal"
					/>
					<RadioFaktum
						id="bosituasjon_radio_ingen"
						faktumKey={bosituasjon.faktum}
						value="ingen"
					/>
					<RadioFaktum
						id="bosituasjon_radio_annet"
						faktumKey={bosituasjon.faktum}
						value="annet"
					/>
					<div className="skjema-sporsmal--jaNeiSporsmal">
						<Underskjema
							visible={getFaktumVerdi(fakta, bosituasjon.faktum) === "annet"}
							arrow={true}
						>
							<SporsmalFaktum
								faktumKey={annen.faktum}
								style="system"
								legendTittelStyle={LegendTittleStyle.FET_NORMAL}
							>
								{/*TODO opprette checkboxgruppefaktumet*/}
								<RadioFaktum
									id="bosituasjon_radio_foreldre"
									faktumKey={annen.faktum}
									value="foreldre"
								/>
								<RadioFaktum
									id="bosituasjon_radio_familie"
									faktumKey={annen.faktum}
									value="familie"
								/>
								<RadioFaktum
									id="bosituasjon_radio_venner"
									faktumKey={annen.faktum}
									value="venner"
								/>
								<RadioFaktum
									id="bosituasjon_radio_institusjon"
									faktumKey={annen.faktum}
									value="institusjon"
								/>
								<RadioFaktum
									id="bosituasjon_radio_fengsel"
									faktumKey={annen.faktum}
									value="fengsel"
								/>
								<RadioFaktum
									id="bosituasjon_radio_krisesenter"
									faktumKey={annen.faktum}
									value="krisesenter"
								/>
							</SporsmalFaktum>
						</Underskjema>
					</div>
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey={antall.faktum} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
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
