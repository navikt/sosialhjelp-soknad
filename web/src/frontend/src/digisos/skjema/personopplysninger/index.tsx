import * as React from "react";
import {connect} from "react-redux";
import {State} from "../../redux/reducers";
import {DispatchProps} from "../../../nav-soknad/redux/reduxTypes";
import {FaktumComponentProps} from "../../../nav-soknad/redux/fakta/faktaTypes";
import { getErSystemdataEndret } from "../../../nav-soknad/redux/soknad/soknadActions";
import { ErSystemdataEndret } from "../../../nav-soknad/redux/soknad/soknadActionTypes";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import William from "../../../nav-soknad/components/svg/illustrasjoner/William";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import {FormattedMessage} from "react-intl";
import Telefon from "./telefon/Telefon";
import Bankinformasjon from "./bankinfo/Bankinformasjon";
import Adresse from "./adresse/Adresse";
import BasisPersonalia from "./personalia/BasisPersonalia";
import NavFrontendSpinner from "nav-frontend-spinner";

interface OwnProps {
	hentVedleggsForventning?: (fakta: any) => void;
	gjenopptattSoknad: boolean;
	skalSjekkeOmSystemdataErEndret: boolean;
	erSystemdataEndret: ErSystemdataEndret;
}

export type Props = OwnProps & FaktumComponentProps & DispatchProps;

class Personopplysninger extends React.Component<Props, OwnProps> {

	componentDidMount() {
		if (this.props.skalSjekkeOmSystemdataErEndret) {
			this.props.dispatch(getErSystemdataEndret());
		}
	}

	render() {
		const { erSystemdataEndret, skalSjekkeOmSystemdataErEndret } = this.props;
		const gjennopptattSoknadInfoPanel = (
			<div className="skjema-sporsmal">
				<Informasjonspanel
					ikon={InformasjonspanelIkon.ELLA}
					farge={DigisosFarge.VIKTIG}
				>
					<FormattedMessage id="applikasjon.advarsel.gjenopptatt"/>
				</Informasjonspanel>
			</div>);
		const systemdataEndretInfoPanel = (
			<div className="skjema-sporsmal">
				<Informasjonspanel
					ikon={InformasjonspanelIkon.ELLA}
					farge={DigisosFarge.VIKTIG}
				>
					<FormattedMessage id="oppsummering.systemdataendret.true"/>
				</Informasjonspanel>
			</div>);

		if (skalSjekkeOmSystemdataErEndret){
			return (
				<div className="application-spinner">
					<NavFrontendSpinner type="XXL" />
				</div>
			)
		}

		return (
			<DigisosSkjemaSteg
				steg={DigisosSteg.kontakt}
				ikon={<William/>}
			>
				{this.props.gjenopptattSoknad && erSystemdataEndret === ErSystemdataEndret.NO && (gjennopptattSoknadInfoPanel)}
				{erSystemdataEndret === ErSystemdataEndret.YES && (systemdataEndretInfoPanel)}
				<BasisPersonalia/>
				<Adresse/>
				<Telefon />
				<Bankinformasjon />
			</DigisosSkjemaSteg>
		);
	}
}

const mapStateToProps = (state: State) => ({
	gjenopptattSoknad: state.soknad.gjenopptattSoknad,
	skalSjekkeOmSystemdataErEndret: state.soknad.skalSjekkeOmSystemdataErEndret,
	erSystemdataEndret: state.soknad.erSystemdataEndret
});

export default connect(
	mapStateToProps
)(Personopplysninger);
