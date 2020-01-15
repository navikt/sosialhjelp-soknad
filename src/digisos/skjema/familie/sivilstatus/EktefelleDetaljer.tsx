import { Person, Sivilstatus } from "./FamilieTypes";
import {FormattedDate, FormattedMessage, injectIntl} from "react-intl";
import * as React from "react";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, IntlProps} from "../../../../nav-soknad/utils";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";

type Props = SoknadsdataContainerProps & IntlProps;

class EktefelleDetaljer extends React.Component<Props, {}> {

	renderSivilstatusLabel(ektefelleHarDiskresjonskode: boolean | undefined) {
		let formattedMessageId: string = "system.familie.sivilstatus.label";
		if (ektefelleHarDiskresjonskode && ektefelleHarDiskresjonskode === true) {
			formattedMessageId = "system.familie.sivilstatus.ikkeTilgang.label";
		}
		return <FormattedMessage id={formattedMessageId}/>
	}

	renderEktefelleInformasjon() {
		const { soknadsdata } = this.props;
		const sivilstatus: Sivilstatus = soknadsdata.familie.sivilstatus;
		const ektefelle: Person | undefined = sivilstatus.ektefelle;
		const INTL_ID_EKTEFELLE = "system.familie.sivilstatus.gift.ektefelle";
		return (
			<div className="sivilstatus__ektefelleinfo">
				{ektefelle && ektefelle.navn && ektefelle.navn.fulltNavn && (
					<Detaljeliste>
						<DetaljelisteElement
							tittel={<FormattedMessage id={INTL_ID_EKTEFELLE + ".navn"}/>}
							verdi={ektefelle.navn.fulltNavn}
						/>
						{ ektefelle.fodselsdato &&
							<DetaljelisteElement
								tittel={<FormattedMessage id={INTL_ID_EKTEFELLE + ".fodselsdato"}/>}
								verdi={<span className="dato">
									<FormattedDate value={ektefelle.fodselsdato} day="numeric" month="long" year="numeric"/>
								</span>}
							/>
						}
						<DetaljelisteElement
							tittel={
								<FormattedMessage id={INTL_ID_EKTEFELLE + ".folkereg"}/>
							}
							verdi={
								(sivilstatus.erFolkeregistrertSammen === true ?
										<FormattedMessage
											id={INTL_ID_EKTEFELLE + ".folkeregistrertsammen.true"}/> :
										<FormattedMessage
											id={INTL_ID_EKTEFELLE + ".folkeregistrertsammen.false"}/>
								)
							}
						/>
					</Detaljeliste>
				)}
			</div>
		);
	}

	render() {
		const { soknadsdata, intl } = this.props;
		const sivilstatus: Sivilstatus = soknadsdata.familie.sivilstatus;
		const harDiskresjonskode: boolean | undefined = sivilstatus.harDiskresjonskode;
		return (
			<div className="sivilstatus skjema-sporsmal">
				<Sporsmal
					tekster={getFaktumSporsmalTekst(intl, "system.familie.sivilstatus")}
					stil="system"
				>
					<div className="sivilstatus__infotekst">
						<FormattedMessage id="system.familie.sivilstatus"/>
					</div>
					<div className="sivilstatus__giftlabel">
						{this.renderSivilstatusLabel(harDiskresjonskode)}
						{this.renderEktefelleInformasjon()}
					</div>
				</Sporsmal>
				{harDiskresjonskode !== true && (
					<Informasjonspanel
						farge={DigisosFarge.VIKTIG}
						ikon={InformasjonspanelIkon.ELLA}
					>
						<h4 className="skjema-sporsmal__infotekst__tittel">
							<FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tittel"/>
						</h4>
						<FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tekst"/>
					</Informasjonspanel>
				)}
			</div>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(EktefelleDetaljer));
