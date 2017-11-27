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
import TPS from "./tps";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";

interface StateProps {
	visPersonaliaFraTPS: boolean;
	visKontaktinfoFraTPS: boolean;
}

export type Props = StateProps & FaktumComponentProps;

class Personalia extends React.Component<Props, {}> {
	render() {
		if (this.props.visPersonaliaFraTPS) {
			return <TPS {...this.props} />;
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
		visPersonaliaFraTPS:
			state.featuretoggles.data[FeatureToggles.viseTpsPersonalia],
		visKontaktinfoFraTPS:
			state.featuretoggles.data[FeatureToggles.viseTpsPersonalia],
		fakta: state.fakta.data
	};
})(Personalia);
