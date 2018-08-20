import * as React from "react";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../nav-soknad/components/informasjonspanel";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import SysteminfoMedSkjema from "../../../nav-soknad/components/systeminfoMedSkjema";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { Faktum } from "../../../nav-soknad/types";
import { State } from "../../redux/reducers";
import { connect } from "react-redux";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import Detaljeliste, { DetaljelisteElement } from "../../../nav-soknad/components/detaljeliste";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";

interface StateProps {
	fakta: Faktum[];
	sivilstatusFaktum: Faktum;
	ektefelleFaktum: Faktum;
}

type Props = DispatchProps &
	StateProps &
	InjectedIntlProps;

class SivilstatusTPS extends React.Component<Props, {}> {

	formaterDato(fodselsDato: string){

		if (fodselsDato){
			const aar = fodselsDato.slice(0, 4);
			const maaned = fodselsDato.slice(5, 7);
			const dag = fodselsDato.slice(8);

			return `${dag}.${maaned}.${aar}`;
		}

		return ""
	}

	renderEktefelleInformasjon(ektefelleFaktum: Faktum){

		const FORNAVN = "fornavn";
		const MELLOMNAVN = "mellomnavn";
		const ETTERNAVN = "etternavn";

		const fornavn = ektefelleFaktum.properties[FORNAVN] ? ektefelleFaktum.properties[FORNAVN] : "";
		const mellomnavn = ektefelleFaktum.properties[MELLOMNAVN] ? ektefelleFaktum.properties[MELLOMNAVN] : "";
		const etternavn = ektefelleFaktum.properties[ETTERNAVN] ? ektefelleFaktum.properties[ETTERNAVN] : "";

		const navnString = `${fornavn} ${mellomnavn} ${etternavn}`;

		const FODSELSDATO = "fodselsdato";
		const fodselsDato = ektefelleFaktum.properties[FODSELSDATO];
		const datoFormatert = this.formaterDato(fodselsDato);

		const FOLKEREGISTRERT = "folkeregistrertsammen";
		const FOLKEREGISTRERTVERDI = ektefelleFaktum.properties[FOLKEREGISTRERT] === "true" ? "Ja" : "Nei";

		const IKKETILGANGTILEKTEFELLE = "ikketilgangtilektefelle";

		if (ektefelleFaktum.properties[IKKETILGANGTILEKTEFELLE] === "true"){
			return null;
		}

		return (
			<div>
				<h4 className="skjema-sporsmal__infotekst__tittel">
					<FormattedMessage id="system.familie.sivilstatus.infotekst"/>
				</h4>
				<Detaljeliste>
					{
						ektefelleFaktum.properties[FORNAVN] &&
						<DetaljelisteElement
							tittel={
								<FormattedMessage id="system.familie.sivilstatus.gift.ektefelle.navn"/>
							}
							verdi={ navnString }
						/>
					}
					{
						ektefelleFaktum.properties[FODSELSDATO] &&
						<DetaljelisteElement
							tittel={
								<FormattedMessage id="system.familie.sivilstatus.gift.ektefelle.fodselsdato"/>
							}
							verdi={datoFormatert}
						/>
					}
					{
						ektefelleFaktum.properties[FOLKEREGISTRERT] &&
						<DetaljelisteElement
							tittel={
								<FormattedMessage id="system.familie.sivilstatus.gift.ektefelle.folkereg"/>
							}
							verdi={ FOLKEREGISTRERTVERDI }
						/>
					}
				</Detaljeliste>
			</div>)
	}

	render() {

		const ektefelleFaktum: Faktum = this.props.ektefelleFaktum;
		const IKKETILGANGTILEKTEFELLE = "ikketilgangtilektefelle";

		return (
			<div>
				<SporsmalFaktum faktumKey="system.familie.sivilstatus" style="system">
					<p>
						<FormattedMessage id="system.familie.sivilstatus"/>
					</p>
					<SysteminfoMedSkjema>
						<Detaljeliste>
							<DetaljelisteElement
								tittel={
									<FormattedMessage id="system.familie.sivilstatus.label"/>
								}
								verdi={<FormattedMessage id="familie.sivilstatus.gift"/>}
							/>
						</Detaljeliste>
						{ this.renderEktefelleInformasjon(ektefelleFaktum) }
					</SysteminfoMedSkjema>
				</SporsmalFaktum>
				{ ektefelleFaktum.properties[IKKETILGANGTILEKTEFELLE] &&
				  ektefelleFaktum.properties[IKKETILGANGTILEKTEFELLE] !== "true" &&
					(<Informasjonspanel
						farge={DigisosFarge.NAV_GRONN_LIGHTEN_60}
						ikon={InformasjonspanelIkon.ELLA}
					>
						<h4 className="skjema-sporsmal__infotekst__tittel">
							<FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tittel"/>
						</h4>
						<FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tekst"/>
					</Informasjonspanel>)
				}
			</div>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data,
	};
})(injectIntl(SivilstatusTPS));
