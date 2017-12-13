import * as React from "react";
import { connect } from "react-redux";

import { State } from "../../redux/reducers";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import TelefonFaktum from "../../../nav-soknad/faktum/typedInput/TelefonFaktum";
import { Skjema as BankinformasjonSkjema } from "./tps/Bankinformasjon";
import { FeatureToggles } from "../../../featureToggles";
import { radioCheckKeys } from "../../../nav-soknad/utils";
import Personalia from "./tps/Personalia";
import Adresseinfo from "./tps/Adresseinfo";
import Telefoninfo from "./tps/Telefoninfo";
import Bankinformasjon from "./tps/Bankinformasjon";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import { hentVedleggsForventning } from "../../../nav-soknad/redux/vedlegg/vedleggActions";

interface StateProps {
	visPersonaliaFraTPSfeatureToggle: boolean;
}

interface StateProps {
	visPersonaliaFraTPSfeatureToggle: boolean;
	hentVedleggsForventning?: (fakta: any) => void;
}

export type Props = StateProps & FaktumComponentProps;

class Personopplysninger extends React.Component<Props, StateProps> {

	componentDidMount() {
		this.props.hentVedleggsForventning(this.props.fakta);
	}

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
				<JaNeiSporsmalFaktum faktumKey={statsborger.faktum} />
			</DigisosSkjemaSteg>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => ({
	hentVedleggsForventning: (fakta: any) => dispatch(hentVedleggsForventning(fakta))
});

const mapStateToProps = (state: State) => ({
	visPersonaliaFraTPSfeatureToggle:
	state.featuretoggles.data[FeatureToggles.viseTpsPersonalia] === "true",
	fakta: state.fakta.data
});

export default connect<{}, {}, Props>(
	mapStateToProps,
	mapDispatchToProps
)(Personopplysninger);
