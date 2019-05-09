import * as React from "react";
import { connect } from "react-redux";
import { State } from "../../redux/reducers";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import William from "../../../nav-soknad/components/svg/illustrasjoner/William";
import { InformasjonspanelIkon } from "../../../nav-soknad/components/informasjonspanel";
import { DigisosFarge } from "../../../nav-soknad/components/svg/DigisosFarger";
import Informasjonspanel from "../../../nav-soknad/components/informasjonspanel";
import { FormattedMessage } from "react-intl";
import Telefon from "./telefon/Telefon";
import Bankinformasjon from "./bankinfo/Bankinformasjon";
import Adresse from "./adresse/Adresse";
import BasisPersonalia from "./personalia/BasisPersonalia";

interface OwnProps {
	hentVedleggsForventning?: (fakta: any) => void;
	gjenopptattSoknad: boolean;
}

export type Props = OwnProps & FaktumComponentProps & DispatchProps;

class Personopplysninger extends React.Component<Props, OwnProps> {
	render() {
		const gjennopptattSoknadInfoPanel = (
			<div className="skjema-sporsmal">
				<Informasjonspanel
					ikon={InformasjonspanelIkon.ELLA}
					farge={DigisosFarge.VIKTIG}
				>
					<FormattedMessage id="applikasjon.advarsel.gjenopptatt"/>
				</Informasjonspanel>
			</div>);

		return (
			<DigisosSkjemaSteg
				steg={DigisosSteg.kontakt}
				ikon={<William/>}
			>
				{this.props.gjenopptattSoknad && (gjennopptattSoknadInfoPanel)}
				<BasisPersonalia/>
				<Adresse/>
				<Telefon />
				<Bankinformasjon />
			</DigisosSkjemaSteg>
		);
	}
}

const mapStateToProps = (state: State) => ({
	fakta: state.fakta.data,
	gjenopptattSoknad: state.soknad.gjenopptattSoknad,

});

export default connect<{}, {}, Props>(
	mapStateToProps
)(Personopplysninger);
