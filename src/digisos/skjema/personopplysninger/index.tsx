import * as React from "react";
import {connect} from "react-redux";
import {State} from "../../redux/reducers";
import {DispatchProps} from "../../redux/reduxTypes";
import { ErSystemdataEndret } from "../../redux/soknad/soknadActionTypes";
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
import {getErSystemdataEndret} from "../../redux/soknad/soknadActions";

interface OwnProps {
	hentVedleggsForventning?: (fakta: any) => void;
	erGjenopptattSoknad: boolean;
	skalSjekkeOmSystemdataErEndret: boolean;
	erSystemdataEndret: ErSystemdataEndret;
	behandlingsId: string | undefined,
}

export type Props = OwnProps & DispatchProps;

class Personopplysninger extends React.Component<Props, OwnProps> {

	componentDidMount() {
		const {skalSjekkeOmSystemdataErEndret, dispatch, behandlingsId} = this.props;
		if (skalSjekkeOmSystemdataErEndret && behandlingsId) {
			dispatch(getErSystemdataEndret(behandlingsId));
		}
	}

	render() {
		const { erGjenopptattSoknad, erSystemdataEndret, skalSjekkeOmSystemdataErEndret } = this.props;
		const skjulGjenopptattInfoPanel = true;
		const gjenopptattSoknadInfoPanel = (
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
				{!skjulGjenopptattInfoPanel && erGjenopptattSoknad && erSystemdataEndret === ErSystemdataEndret.NO && (gjenopptattSoknadInfoPanel)}
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
	erGjenopptattSoknad: state.soknad.erGjenopptattSoknad,
	skalSjekkeOmSystemdataErEndret: state.soknad.skalSjekkeOmSystemdataErEndret,
	erSystemdataEndret: state.soknad.erSystemdataEndret,
	behandlingsId: state.soknad.behandlingsId
});

export default connect(
	mapStateToProps
)(Personopplysninger);
