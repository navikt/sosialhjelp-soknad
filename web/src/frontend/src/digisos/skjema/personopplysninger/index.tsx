import * as React from "react";
import { connect } from "react-redux";
import { State } from "../../redux/reducers";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import William from "../../../nav-soknad/components/svg/illustrasjoner/William";
import BasisPersonalia from "./personalia/BasisPersonalia";
import Adresse from "./adresse/Adresse";
import Telefon from "./telefon/Telefon";
import Bankinformasjon from "./bankinfo/Bankinformasjon";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../nav-soknad/components/informasjonspanel";
import { DigisosFarge } from "../../../nav-soknad/components/svg/DigisosFarger";
import { FormattedMessage } from "react-intl";

interface Props {
	gjenopptattSoknad: boolean;
}

class Personopplysninger extends React.Component<Props, {}> {

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
				<Telefon/>
				<Bankinformasjon/>
			</DigisosSkjemaSteg>
		)
	}
}

const mapStateToProps = (state: State) => ({
	gjenopptattSoknad: state.soknad.gjenopptattSoknad,
});

export default connect<{}, {}, Props>(
	mapStateToProps
)(Personopplysninger);
