import { Person, Sivilstatus, SIVILSTATUS_STI, Status } from "./FamilieTypes";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import * as React from "react";
import { State } from "../../../redux/reducers";
import {
	fetchPutSoknadsdataAction,
	fetchSoknadsdataAction
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataActions";
import { connect } from "react-redux";
import Sporsmal, { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";
import PersonSkjema from "../../../../nav-soknad/faktum/PersonSkjema";
import { oppdaterSoknadsdataAction } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";

interface OwnProps {
	brukerBehandlingId?: string;
	sivilstatus?: Sivilstatus;
	hentSivilstatus?: (brukerBehandlingId: string) => void;
	lagreSivilstatus?: (brukerBehandlingId: string, sivilstatus: Sivilstatus) => void;
	oppdaterSoknadsdata?: (verdi: any) => void;
}


type Props = OwnProps & InjectedIntlProps;

interface RadioProps {
	id?: string;
	verdi: Status;
	checked: boolean;
	onClick: (verdi: Status) => void;
}

const SivilstatusRadioknapp: React.FunctionComponent<RadioProps> = ({verdi, id, checked, onClick}) => {
	const componentId = id ? id : "sivilstatus_" + verdi + "_radio";
	return (
		<RadioEnhanced
			getName={() => componentId}
			id={componentId}
			faktumKey="familie.sivilstatus"
			value={verdi}
			checked={checked}
			onChange={() => onClick(verdi)}
		/>
	);
};

class SivilstatusComponent extends React.Component<Props, {}> {

	componentDidMount() {
		this.props.hentSivilstatus(this.props.brukerBehandlingId);
	}

	onChangePerson(person: Person) {
		console.warn("onChange: " + JSON.stringify(person, null, 4));
		this.props.lagreSivilstatus(this.props.brukerBehandlingId, this.props.sivilstatus);
	}

	onClickSivilstatus(verdi: Status) {
		const sivilstatus = {...this.props.sivilstatus};
		sivilstatus.sivilstatus = verdi;
		this.props.oppdaterSoknadsdata({
			familie: { sivilstatus }
		});
		this.props.lagreSivilstatus(this.props.brukerBehandlingId, this.props.sivilstatus);
	}

	onClickBorSammen(verdi: boolean) {
		const sivilstatus = {...this.props.sivilstatus};
		sivilstatus.borSammenMed = verdi;
		this.props.oppdaterSoknadsdata({
			familie: { sivilstatus }
		});
		this.props.lagreSivilstatus(this.props.brukerBehandlingId, this.props.sivilstatus);
	}

	render() {
		const sivilstatus = this.props.sivilstatus ? this.props.sivilstatus.sivilstatus : null;
		const borSammenMed = this.props.sivilstatus ? this.props.sivilstatus.borSammenMed : null;

		return (
			<div style={{ border: "3px dotted red", display: "block" }}>
				<div className="skjema-sporsmal">
					<Sporsmal sprakNokkel="familie.sivilstatus">
						<SivilstatusRadioknapp
							verdi={Status.GIFT}
							checked={sivilstatus === Status.GIFT}
							onClick={(verdi) => this.onClickSivilstatus(verdi)}
						/>
						<div className="skjema-sporsmal--jaNeiSporsmal">
							<Underskjema
								visible={sivilstatus === Status.GIFT}
								arrow={true}
							>
								<Sporsmal
									sprakNokkel="familie.sivilstatus.gift.ektefelle"
									legendTittelStyle={LegendTittleStyle.FET_NORMAL}
								>
									<div>
										<div className="blokk-s">
											<PersonSkjema
												id="ektefelle"
												person={this.props.sivilstatus.ektefelle}
												sivilstatus={this.props.sivilstatus}
												onChange={(person: Person) => {
													this.onChangePerson(person)
												}}
												oppdaterSoknadsdata={this.props.oppdaterSoknadsdata}
											/>
										</div>
									</div>
									<Sporsmal
										sprakNokkel="familie.sivilstatus.gift.ektefelle.borsammen"
									>
										<RadioEnhanced
											id={"sivilstatus_gift_bor_sammen_radio_ja"}
											faktumKey="familie.sivilstatus.gift.ektefelle.borsammen"
											value="true"
											checked={this.props.sivilstatus.borSammenMed === true}
											onChange={() => this.onClickBorSammen(true)}
										/>
										<RadioEnhanced
											id={"sivilstatus_gift_bor_sammen_radio_nei"}
											faktumKey="familie.sivilstatus.gift.ektefelle.borsammen"
											value="false"
											checked={borSammenMed === false}
											onChange={() => this.onClickBorSammen(false)}
										/>
									</Sporsmal>
								</Sporsmal>
							</Underskjema>
						</div>
						<SivilstatusRadioknapp
							verdi={Status.UGIFT}
							checked={sivilstatus === Status.UGIFT}
							onClick={(verdi) => this.onClickSivilstatus(verdi)}
						/>
						<SivilstatusRadioknapp
							verdi={Status.SAMBOER}
							checked={sivilstatus === Status.SAMBOER}
							onClick={(verdi) => this.onClickSivilstatus(verdi)}
						/>
						<SivilstatusRadioknapp
							verdi={Status.ENKE}
							checked={sivilstatus === Status.ENKE}
							onClick={(verdi) => this.onClickSivilstatus(verdi)}
						/>
						<SivilstatusRadioknapp
							verdi={Status.SKILT}
							checked={sivilstatus === Status.SKILT}
							onClick={(verdi) => this.onClickSivilstatus(verdi)}
						/>
						<SivilstatusRadioknapp
							verdi={Status.SEPARERT}
							checked={sivilstatus === Status.SEPARERT}
							onClick={(verdi) => this.onClickSivilstatus(verdi)}
						/>
					</Sporsmal>
					<Informasjonspanel
						synlig={ sivilstatus === Status.GIFT }
						farge={DigisosFarge.VIKTIG}
						ikon={InformasjonspanelIkon.ELLA}
						>
						<h4 className="skjema-sporsmal__infotekst__tittel">
							<FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tittel"/>
						</h4>
						<FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tekst"/>
					</Informasjonspanel>
				</div>
			</div>
		)
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
	},
	oppdaterSoknadsdata: (data: any) => {
		dispatch(oppdaterSoknadsdataAction(data))
	},
	lagreSivilstatus: (brukerbehandlingId: string, sivilstatus: Sivilstatus) => {
		dispatch(fetchPutSoknadsdataAction(brukerbehandlingId, SIVILSTATUS_STI, sivilstatus));
	}
});

export default connect<{}, {}, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(injectIntl(SivilstatusComponent));
