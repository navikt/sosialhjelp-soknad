import * as React from "react";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
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
} from "./bankinformasjonActions";
import { oppdaterSoknadsdataAction } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema";

interface OwnProps {
	brukerBehandlingId?: string;
	bankinformasjon?: null | BankinformasjonType;
	feil?: any;
	hentBankinformasjon?: (brukerBehandlingId: string) => void;
	nullstillBankinfoValideringsfeil?: () => void;
	setFaktumValideringsfeil?: (valideringer: Valideringsfeil) => void;
	oppdaterBankinformasjon?: (brukerBehandlingId: string, bankinformasjon: BankinformasjonType) => void;
	oppdaterSoknadsdata?: (verdi: any) => void;
}

type Props = OwnProps & InjectedIntlProps;

const FAKTUM_KEY_KONTONUMMER = "kontakt.kontonummer";

class Bankinformasjon extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.nullstillBankinfoValideringsfeil();
		this.props.hentBankinformasjon(this.props.brukerBehandlingId);
	}

	lagreDersomGyldig(verdi: string) {
		if (verdi !== "") {
			const valideringActionKey: ValideringActionKey = erKontonummer(verdi);
			if (valideringActionKey) {
				const valideringsfeil: Valideringsfeil = {
					faktumKey: FAKTUM_KEY_KONTONUMMER,
					feilkode: valideringActionKey
				};
				this.props.setFaktumValideringsfeil(valideringsfeil);
			} else {
				const bankinformasjon: BankinformasjonType = {
					...this.props.bankinformasjon,
					...{ verdi }
				};
				this.oppdaterBankinformasjon(bankinformasjon);
				this.props.nullstillBankinfoValideringsfeil();
			}
		} else {
			this.props.nullstillBankinfoValideringsfeil();
		}
	}

	oppdaterBankinformasjon(bankinformasjon: BankinformasjonType): void {
		this.props.oppdaterBankinformasjon(this.props.brukerBehandlingId, bankinformasjon);
	}

	getFeil(intl: InjectedIntl): Feil {
		const feilkode = this.props.feil.find((f: Valideringsfeil) => f.faktumKey === FAKTUM_KEY_KONTONUMMER);
		return !feilkode ? null : { feilmelding: intl.formatHTMLMessage({ id: feilkode.feilkode }) };
	}

	endreKontoBrukerdefinert(brukerdefinert: boolean) {
		this.oppdaterBankinformasjon({ ...this.props.bankinformasjon, ...{ brukerdefinert } });
	}

	onChangeInput(verdi: string) {
		this.props.oppdaterSoknadsdata({
			bankinformasjon: { ...this.props.bankinformasjon, ...{ verdi } }
		});
	}

	onChangeCheckboks(event: any): void {
		let harIkkeKontonummer: boolean = false;
		const { bankinformasjon } = this.props;
		if (bankinformasjon !== null && bankinformasjon.harIkkeKonto !== null) {
			harIkkeKontonummer = !bankinformasjon.harIkkeKonto;
		}
		if (harIkkeKontonummer) {
			this.props.nullstillBankinfoValideringsfeil();
		}
		const oppdatertBankinformasjon: BankinformasjonType =
			{ ...bankinformasjon, ...{ harIkkeKonto: harIkkeKontonummer } };
		this.props.oppdaterSoknadsdata({ oppdatertBankinformasjon });
		this.oppdaterBankinformasjon(oppdatertBankinformasjon);
		event.preventDefault();
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
			return (<span/>);
		}

		const infotekst = bankinformasjon.systemverdi ?
			intl.formatMessage({ id: "kontakt.system.kontonummer.infotekst.tekst" }) : null;

		const skjemaErSynlig = bankinformasjon.brukerdefinert;
		return (
			<Sporsmal tekster={{ sporsmal: "Kontonummer", infotekst: { tittel: null, tekst: infotekst } }}>
				<b style={{color: "red"}}>Ny komponent.</b>
				<SysteminfoMedSkjema
					skjemaErSynlig={skjemaErSynlig}
					onVisSkjema={() => this.endreKontoBrukerdefinert(true)}
					onSkjulSkjema={() => this.endreKontoBrukerdefinert(false)}
					endreLabel={
						intl.formatMessage({
							id: "kontakt.system.kontonummer.endreknapp.label"
						})
					}
					avbrytLabel={
						intl.formatMessage({
							id: "systeminfo.avbrytendringknapp.label"
						})
					}
					skjema={(
						<span>
							<Input
								id="bankinfo_konto"
								className={"input--xxl faktumInput "}
								autoComplete="off"
								name={name}
								disabled={harIkkeKontonummer}
								value={kontonummer}
								onChange={(evt: any) => this.onChangeInput(evt.target.value)}
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
				>
					<Detaljeliste>
						<DetaljelisteElement
							tittel={
								<FormattedMessage id="kontakt.system.kontonummer.label"/>
							}
							verdi={bankinformasjon.systemverdi}
						/>
					</Detaljeliste>
				</SysteminfoMedSkjema>
			</Sporsmal>
		);
	}

}

const mapStateToProps = (state: State) => ({
	brukerBehandlingId: state.soknad.data.brukerBehandlingId,
	feil: state.validering.feil,
	bankinformasjon: state.soknadsdata.bankinformasjon
});

const mapDispatchToProps = (dispatch: any) => ({
	nullstillBankinfoValideringsfeil: () => {
		dispatch(setFaktumValideringsfeil(null, FAKTUM_KEY_KONTONUMMER))
	},
	hentBankinformasjon: (brukerBehandlingId: string) => {
		dispatch(hentBankinformasjonAction(brukerBehandlingId))
	},
	setFaktumValideringsfeil: (valideringsfeil: Valideringsfeil) => {
		dispatch(setFaktumValideringsfeil(valideringsfeil, FAKTUM_KEY_KONTONUMMER))
	},
	oppdaterBankinformasjon: (brukerBehandlingId: string, bankinformasjon: BankinformasjonType) => {
		dispatch(oppdaterBankinformasjonAction(brukerBehandlingId, bankinformasjon));
	},
	oppdaterSoknadsdata: (data: any) => {
		dispatch(oppdaterSoknadsdataAction(data))
	}
});

export {Bankinformasjon as BankinformasjonView};

export default connect<{}, {}, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(injectIntl(Bankinformasjon));
