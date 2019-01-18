import * as React from "react";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { DispatchProps } from "../../../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { State } from "../../../redux/reducers";
import { Checkbox, Feil, Input } from "nav-frontend-skjema";
import { ValideringActionKey, Valideringsfeil } from "../../../../nav-soknad/validering/types";
import { erKontonummer } from "../../../../nav-soknad/validering/valideringer";
import { setFaktumValideringsfeil } from "../../../../nav-soknad/redux/valideringActions";
import { FormattedMessage, InjectedIntl, InjectedIntlProps, injectIntl } from "react-intl";
import {
	Bankinformasjon as BankinformasjonType,
	hentBankinformasjonAction,
	oppdaterBankinformasjonAction
} from "../../../../nav-soknad/redux/soknadsdata/bankinformasjonActions";
import { oppdaterSoknadsdataAction } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Lenkeknapp from "../../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import Underskjema from "../../../../nav-soknad/components/underskjema";

interface OwnProps {
	brukerBehandlingId?: string;
	bankinformasjon?: null | BankinformasjonType;
	feil?: any;
}

type Props = OwnProps & DispatchProps & InjectedIntlProps;

class Bankinformasjon extends React.Component<Props, {}> {

	FAKTUM_KEY_KONTONUMMER = "kontakt.kontonummer";

	componentDidMount(): void {
		this.nullstillBankinfoValideringsfeil();
		this.props.dispatch(hentBankinformasjonAction(this.props.brukerBehandlingId));
	}

	lagreDersomGyldig(verdi: string) {
		if(verdi !== "") {
			const valideringActionKey: ValideringActionKey = erKontonummer(verdi);
			if (valideringActionKey) {
				const valideringsfeil: Valideringsfeil = {
					faktumKey: this.FAKTUM_KEY_KONTONUMMER,
					feilkode: valideringActionKey
				};
				this.props.dispatch(setFaktumValideringsfeil(valideringsfeil, this.FAKTUM_KEY_KONTONUMMER));
			} else {
				const bankinformasjon: BankinformasjonType = {
					...this.props.bankinformasjon,
					...{verdi}
				};
				this.oppdaterBankinformasjon(bankinformasjon);
				this.nullstillBankinfoValideringsfeil();
			}
		} else {
			this.nullstillBankinfoValideringsfeil();
		}
	}

	oppdaterBankinformasjon(bankinformasjon: BankinformasjonType): void {
		this.props.dispatch(oppdaterBankinformasjonAction(this.props.brukerBehandlingId, bankinformasjon ));
	}

	nullstillBankinfoValideringsfeil = () => {
		this.props.dispatch(setFaktumValideringsfeil(null, this.FAKTUM_KEY_KONTONUMMER));
	};

	getFeil(intl: InjectedIntl): Feil {
		const feilkode = this.props.feil.find( (f: Valideringsfeil) => f.faktumKey === this.FAKTUM_KEY_KONTONUMMER);
		return !feilkode ? null : {feilmelding: intl.formatHTMLMessage({ id: feilkode.feilkode })};
	}

	onChangeInput(verdi: string) {
		this.props.dispatch(oppdaterSoknadsdataAction({
			bankinformasjon: {...this.props.bankinformasjon, ...{verdi}}
		}));
	}

	onChangeCheckboks(event: any): void {
		let harIkkeKontonummer: boolean = false;
		const { bankinformasjon } = this.props;
		if (bankinformasjon !== null && bankinformasjon.harIkkeKonto !== null) {
			harIkkeKontonummer = !bankinformasjon.harIkkeKonto;
		}
		if (harIkkeKontonummer) {
			this.nullstillBankinfoValideringsfeil();
		}
		const oppdatertBankinformasjon: BankinformasjonType =
			{...bankinformasjon, ...{harIkkeKonto: harIkkeKontonummer}};
		this.props.dispatch(oppdaterSoknadsdataAction({oppdatertBankinformasjon}));
		this.oppdaterBankinformasjon(oppdatertBankinformasjon);
		event.preventDefault();
	}

	endreKontoBrukerdefinert(brukerdefinert: boolean) {
		this.oppdaterBankinformasjon({...this.props.bankinformasjon, ...{brukerdefinert}});
	}

	render() {
		const { bankinformasjon, intl } = this.props;
		let kontonummer = "";
		let harIkkeKontonummer: boolean = false;
		if (bankinformasjon) {
			if (bankinformasjon.harIkkeKonto !== null) {
				harIkkeKontonummer = bankinformasjon.harIkkeKonto;
			}
			if (bankinformasjon.verdi !== null && !harIkkeKontonummer) {
				kontonummer = bankinformasjon.verdi;
			}
		}

		if (!bankinformasjon) {
			return (<span />);
		}

		const infotekst = bankinformasjon.systemverdi ?
			intl.formatMessage({id: "kontakt.system.kontonummer.infotekst.tekst"}) : null;
		return (
			<Sporsmal tekster={{sporsmal: "Kontonummer", infotekst: {tittel: null, tekst: infotekst}}}>
				{bankinformasjon.systemverdi && (
					<div className="systeminfoMedSkjema">
						<Underskjema
							arrow={false}
							visible={true}
							collapsable={false}
							style="system"
						>
							<Detaljeliste>
								<DetaljelisteElement
									tittel={
										<FormattedMessage id="kontakt.system.kontonummer.label"/>
									}
									verdi={bankinformasjon.systemverdi}
								/>
							</Detaljeliste>
							{!bankinformasjon.brukerdefinert && (
								<Lenkeknapp
									onClick={() => this.endreKontoBrukerdefinert(true)}
									id={"endre_lenke"}
								>
									{intl.formatMessage({
										id: "kontakt.system.kontonummer.endreknapp.label"
									})}
								</Lenkeknapp>
							)}
						</Underskjema>
					</div>
				)}
				{bankinformasjon.brukerdefinert && (
					<span>
						<Input
							id="bankinfo_konto"
							className={"input--xxl faktumInput " }
							autoComplete="off"
							name={name}
							disabled={harIkkeKontonummer}
							value={kontonummer}
							onChange={(evt: any) => this.onChangeInput(evt.target.value) }
							onBlur={(event) => this.lagreDersomGyldig(event.target.value)}
							label={intl.formatHTMLMessage({ id: "kontakt.kontonummer.label" })}
							feil={this.getFeil(intl)}
							maxLength={13}
							bredde={"S"}
							noValidate={
								true /* Unngå at nettleser validerer og evt. fjerner verdien */
							}
						/>
						<div
							className={"inputPanel " + (harIkkeKontonummer ? " inputPanel__checked" : " ")}
							onClick={(event: any) => this.onChangeCheckboks(event)}
						>
							<Checkbox
								id="kontakt_kontonummer_har_ikke_checkbox_2"
								name="kontakt_kontonummer_har_ikke_checkbox_2"
								checked={harIkkeKontonummer}
								onChange={(event: any) => this.onChangeCheckboks(event)}
								label={
									<div>
										{intl.formatHTMLMessage({ id: "kontakt.kontonummer.harikke" })}
									</div>
								}
							/>
						</div>
					</span>
				)}
				{bankinformasjon.brukerdefinert && bankinformasjon.systemverdi && (
					<Lenkeknapp
						onClick={() => this.endreKontoBrukerdefinert(false)}
						id={"angre_lenke"}
					>
						{intl.formatMessage({id: "systeminfo.avbrytendringknapp.label"})}
					</Lenkeknapp>
				)}
			</Sporsmal>
		);
	}

}

const mapStateToProps = (state: State) => ({
	brukerBehandlingId: state.soknad.data.brukerBehandlingId,
	feil: state.validering.feil,
	bankinformasjon: state.soknadsdata.bankinformasjon
});

export default connect<{}, {}, OwnProps>(
	mapStateToProps
)(injectIntl(Bankinformasjon));
