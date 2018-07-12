import * as React from "react";
import Informasjonspanel from "../../../nav-soknad/components/informasjonspanel";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import SysteminfoMedSkjema from "../../../nav-soknad/components/systeminfoMedSkjema";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { Faktum } from "../../../nav-soknad/types";
import { State } from "../../redux/reducers";
import { connect } from "react-redux";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import Detaljeliste, {DetaljelisteElement} from "../../../nav-soknad/components/detaljeliste";

interface StateProps {
	fakta: Faktum[];
	systemFamilieSivilstatusFakta: any;
}

type Props = DispatchProps &
	StateProps &
	InjectedIntlProps;

class SivilstatusTPS extends React.Component<Props, {}>{

	render(){

		const faktum = this.props.systemFamilieSivilstatusFakta
		const status = faktum.value;

		return(
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

						<h4 className="skjema-sporsmal__infotekst__tittel">
							<FormattedMessage id="system.familie.sivilstatus.infotekst"/>
						</h4>

						<Detaljeliste>
							<DetaljelisteElement
								tittel={
									<FormattedMessage id="system.familie.sivilstatus.gift.ektefelle.navn"/>
								}
								verdi={status}
							/>
							<DetaljelisteElement
								tittel={
									<FormattedMessage id="system.familie.sivilstatus.gift.ektefelle.fodselsdato"/>
								}
								verdi={status}
							/>
							<DetaljelisteElement
								tittel={
									<FormattedMessage id="system.familie.sivilstatus.gift.ektefelle.folkereg"/>
								}
								verdi={status}
							/>
						</Detaljeliste>
					</SysteminfoMedSkjema>
				</SporsmalFaktum>
				<Informasjonspanel
					icon={<img src="/soknadsosialhjelp/statisk/bilder/illustrasjon_william.svg"/>}
					style="advarsel"
				>
					<div style={{fontWeight: 'bold'}}>
						Når du er gift har du og din ektefelle plikt til å forsørge hverandre
					</div>
					Vi vurderer den samlede økonomien deres når vi beregner økonomisk sosialhjelp.
					Da trenger vi opplysninger og dokumentasjon om situasjonen til ektefellen din.
					Ektefellen din kan sende inn en egen digital søknad,
					eller dere kan ta kontakt med det lokale NAV-kontoret.
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