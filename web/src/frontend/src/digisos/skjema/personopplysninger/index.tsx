import * as React from "react";
import { connect } from "react-redux";

import { State } from "../../redux/reducers";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import TelefonFaktum from "../../../nav-soknad/faktum/typedInput/TelefonFaktum";
import { Skjema as BankinformasjonSkjema } from "./tps/Bankinformasjon";
import { FeatureToggles } from "../../../featureToggles";
import { radioCheckKeys } from "../../../nav-soknad/utils";
import Personalia from "./tps/Personalia";
import Adresseinfo from "./tps/Adresseinfo";
import Telefoninfo from "./tps/Telefoninfo";
import Bankinformasjon from "./tps/Bankinformasjon";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";

interface StateProps {
	visPersonaliaFraTPSfeatureToggle: boolean;
}

export type Props = StateProps & FaktumComponentProps;

class Personopplysninger extends React.Component<Props, {}> {
	render() {
		if (this.props.visPersonaliaFraTPSfeatureToggle) {
			return (
				<DigisosSkjemaSteg steg={DigisosSteg.kontakt}>
					<SporsmalFaktum faktumKey="kontakt.system.personalia" style="system">
						<Personalia fakta={this.props.fakta} />
					</SporsmalFaktum>
					<SporsmalFaktum faktumKey="kontakt.system.kontaktinfo" style="system">
						<Adresseinfo fakta={this.props.fakta} />
						<Telefoninfo fakta={this.props.fakta} />
					</SporsmalFaktum>
					<Bankinformasjon fakta={this.props.fakta} />
				</DigisosSkjemaSteg>
			);
		}
		const statsborger = radioCheckKeys("kontakt.statsborger");
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.kontakt}>
				<BankinformasjonSkjema fakta={this.props.fakta} />
				<SporsmalFaktum faktumKey="kontakt.telefon">
					<TelefonFaktum faktumKey="kontakt.telefon" maxLength={8} />
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey={statsborger.faktum}>
					<RadioFaktum faktumKey={statsborger.faktum} value="true" />
					<RadioFaktum faktumKey={statsborger.faktum} value="false" />
				</SporsmalFaktum>
			</DigisosSkjemaSteg>
		);
	}
}

export default connect((state: State): Props => {
	return {
		visPersonaliaFraTPSfeatureToggle:
			state.featuretoggles.data[FeatureToggles.viseTpsPersonalia],
		fakta: state.fakta.data
	};
})(Personopplysninger);
