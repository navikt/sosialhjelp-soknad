import * as React from "react";
import Informasjonspanel from "../../../nav-soknad/components/informasjonspanel";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import SysteminfoMedSkjema from "../../../nav-soknad/components/systeminfoMedSkjema";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { Faktum } from "../../../nav-soknad/types";
import { State } from "../../redux/reducers";
import { connect } from "react-redux";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import Detaljeliste, { DetaljelisteElement } from "../../../nav-soknad/components/detaljeliste";

interface StateProps {
	fakta: Faktum[];
	sivilstatusFaktum: Faktum;
	ektefelleFaktum: Faktum;
}

type Props = DispatchProps &
	StateProps &
	InjectedIntlProps;

class SivilstatusTPS extends React.Component<Props, {}> {

	render() {

		const sivilstatusFaktum = this.props.sivilstatusFaktum;
		const status = sivilstatusFaktum.value;
		const ektefelleFaktum = this.props.ektefelleFaktum;

		const NAME = "navn";
		const FODSELSDATO = "fodselsdato";
		const FOLKEREGISTRERT = "folkeregistrertsammen";
		const IKKETILGANGTILEKTEFELLE = "ikkeTilgangTilEktefelle";

		const FOLKEREGISTRERTVERDI = ektefelleFaktum.properties[FOLKEREGISTRERT] === "true" ? "Ja" : "Nei";

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
								verdi={status}
							/>
						</Detaljeliste>

						{ !ektefelleFaktum.properties[IKKETILGANGTILEKTEFELLE] &&
						<div>
							{
								ektefelleFaktum.properties[NAME] &&
								<h4 className="skjema-sporsmal__infotekst__tittel">
									<FormattedMessage id="system.familie.sivilstatus.infotekst"/>
								</h4>
							}

							<Detaljeliste>
								{
									ektefelleFaktum.properties[NAME] &&
									<DetaljelisteElement
										tittel={
											<FormattedMessage id="system.familie.sivilstatus.gift.ektefelle.navn"/>
										}
										verdi={ ektefelleFaktum.properties[NAME] }
									/>
								}
								{
									ektefelleFaktum.properties[FODSELSDATO] &&
									<DetaljelisteElement
										tittel={
											<FormattedMessage id="system.familie.sivilstatus.gift.ektefelle.fodselsdato"/>
										}
										verdi={ektefelleFaktum.properties[FODSELSDATO]}
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
						</div> }

					</SysteminfoMedSkjema>
				</SporsmalFaktum>
				<Informasjonspanel
					icon={<img src="/soknadsosialhjelp/statisk/bilder/illustrasjon_william.svg"/>}
					style="advarsel"
				>
					<h4 className="skjema-sporsmal__infotekst__tittel">
						<FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tittel"/>
					</h4>
					<FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tekst"/>
				</Informasjonspanel>
			</div>
		);
	}

}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data,
	};
})(injectIntl(SivilstatusTPS));
