import { Ektefelle, Sivilstatus, SIVILSTATUS_STI } from "./FamilieTypes";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import * as React from "react";
import { State } from "../../../redux/reducers";
import { connect } from "react-redux";
import { fetchSoknadsdataAction } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataActions";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";

interface OwnProps {
	brukerBehandlingId?: string;
	sivilstatus?: Sivilstatus;
	hentSivilstatus?: (brukerBehandlingId: string) => void;
}

type Props = OwnProps & InjectedIntlProps;

class SivilstatusView extends React.Component<Props, {}> {

	componentDidMount() {
		this.props.hentSivilstatus(this.props.brukerBehandlingId);
	}

	renderSivilstatusLabel(ektefelleHarDiskresjonskode: boolean): any {
		let formattedMessageId: string = "system.familie.sivilstatus.label";
		if (ektefelleHarDiskresjonskode && ektefelleHarDiskresjonskode === true) {
			formattedMessageId = "system.familie.sivilstatus.ikkeTilgang.label";
		}
		return <FormattedMessage id={formattedMessageId}/>
	}

	renderEktefelleInformasjon() {
		const { sivilstatus } = this.props;
		const ektefelle: Ektefelle = sivilstatus.ektefelle;

		return (
			<div className="sivilstatus__ektefelleinfo">
				{ektefelle && ektefelle.navn && ektefelle.navn.fulltNavn && (
					<Detaljeliste>
						<DetaljelisteElement
							tittel={<FormattedMessage id="system.familie.sivilstatus.gift.ektefelle.navn"/>}
							verdi={ektefelle.navn.fulltNavn}
						/>
						<DetaljelisteElement
							tittel={<FormattedMessage id="system.familie.sivilstatus.gift.ektefelle.fodselsdato"/>}
							verdi={this.formaterDato(ektefelle.fodselsdato)}
						/>
						<DetaljelisteElement
							tittel={
								<FormattedMessage id="system.familie.sivilstatus.gift.ektefelle.folkereg"/>
							}
							verdi={
								(sivilstatus.folkeregistrertMedEktefelle === true ?
										<FormattedMessage
											id="system.familie.sivilstatus.gift.ektefelle.folkeregistrertsammen.true"/> :
										<FormattedMessage
											id="system.familie.sivilstatus.gift.ektefelle.folkeregistrertsammen.false"/>
								)
							}
						/>
					</Detaljeliste>
				)}
			</div>
		);
	}

	formaterDato(fodselsDato: string) {
		if (fodselsDato) {
			const aar = fodselsDato.slice(0, 4);
			const maaned = fodselsDato.slice(5, 7);
			const dag = fodselsDato.slice(8);
			return `${dag}.${maaned}.${aar}`;
		}
		return "";
	}

	render() {
		const { intl, sivilstatus } = this.props;
		const ektefelleHarDiskresjonskode: boolean = sivilstatus.ektefelleHarDiskresjonskode;

		return (
			<div style={{ border: "3px dotted red", display: "block" }}>
				<div className="sivilstatus skjema-sporsmal">
					<Sporsmal
						tekster={getFaktumSporsmalTekst(intl, "system.familie.sivilstatus")}
						style="system"
					>
						<div className="sivilstatus__infotekst">
							<FormattedMessage id="system.familie.sivilstatus"/>
						</div>
						<div className="sivilstatus__giftlabel">
							{this.renderSivilstatusLabel(ektefelleHarDiskresjonskode)}
							{this.renderEktefelleInformasjon()}
						</div>
					</Sporsmal>
					{ektefelleHarDiskresjonskode !== true && (
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
			</div>
		);
	}
}

const mapStateToProps = (state: State) => ({
	brukerBehandlingId: state.soknad.data.brukerBehandlingId,
	feil: state.validering.feil,
	sivilstatus: state.soknadsdata.familie.sivilstatus
});

const mapDispatchToProps = (dispatch: any) => ({
	hentSivilstatus: (brukerBehandlingId: string) => {
		dispatch(fetchSoknadsdataAction(brukerBehandlingId, SIVILSTATUS_STI));
	}
});

export default connect<{}, {}, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(injectIntl(SivilstatusView));
