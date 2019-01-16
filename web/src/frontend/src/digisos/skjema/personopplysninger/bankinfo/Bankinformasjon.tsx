import * as React from "react";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { DispatchProps } from "../../../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { State } from "../../../redux/reducers";
import { Checkbox, Feil, Input } from "nav-frontend-skjema";
import { fetchPut, fetchToJson } from "../../../../nav-soknad/utils/rest-utils";
import { ValideringActionKey, Valideringsfeil } from "../../../../nav-soknad/validering/types";
import { erKontonummer } from "../../../../nav-soknad/validering/valideringer";
import { setFaktumValideringsfeil } from "../../../../nav-soknad/redux/valideringActions";
import { InjectedIntl, InjectedIntlProps, injectIntl } from "react-intl";
import { navigerTilServerfeil } from "../../../../nav-soknad/redux/navigasjon/navigasjonActions";
import { oppdaterSoknadsdata } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";

interface OwnProps {
	brukerBehandlingId?: string;
	bankinformasjon?: null | BankinformasjonType;
	feil?: any;
}

interface BankinformasjonType {
	brukerdefinert: boolean;
	systemverdi: string | null;
	verdi: string;
	harIkkeKonto: boolean;
}

type Props = OwnProps & DispatchProps & InjectedIntlProps;

class Bankinformasjon extends React.Component<Props, {}> {

	FAKTUM_KEY_KONTONUMMER = "kontakt.kontonummer";

	componentDidMount(): void {
		this.nullstillValideringsfeil();
		const url = `soknader/${this.props.brukerBehandlingId}/personalia/kontonummer`;
		fetchToJson(url).then((response: BankinformasjonType) => {
			this.props.dispatch(oppdaterSoknadsdata({bankinformasjon: response}));
		}).catch(() => {
			this.props.dispatch(navigerTilServerfeil());
		});
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
					...{systemverdi: verdi, verdi}
				};
				this.oppdaterBankinformasjon(bankinformasjon);
				this.nullstillValideringsfeil();
			}
		} else {
			this.nullstillValideringsfeil();
		}
	}

	oppdaterBankinformasjon(bankinformasjon: BankinformasjonType): void {
		const url = `soknader/${this.props.brukerBehandlingId}/personalia/kontonummer`;
		fetchPut(url, JSON.stringify(bankinformasjon)).then(() => {
			this.props.dispatch(oppdaterSoknadsdata({bankinformasjon}));
		}).catch(() => {
			this.props.dispatch(navigerTilServerfeil());
		});
	}

	nullstillValideringsfeil() {
		this.props.dispatch(setFaktumValideringsfeil(null, this.FAKTUM_KEY_KONTONUMMER));
	}

	getFeil(intl: InjectedIntl): Feil {
		const feilkode = this.props.feil.find(
			(f: Valideringsfeil) => f.faktumKey === this.FAKTUM_KEY_KONTONUMMER
		);
		return !feilkode ? null : {
			feilmelding: intl.formatHTMLMessage({ id: feilkode.feilkode })
		};
	}

	onChangeInput(verdi: string) {
		this.props.dispatch(oppdaterSoknadsdata({
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
			this.nullstillValideringsfeil();
		}
		const oppdatertBankinformasjon: BankinformasjonType =
			{...bankinformasjon, ...{harIkkeKonto: harIkkeKontonummer}};
		// Oppdater redux state så bruker ikke må vente til server respons før checkboks verdi blir oppdatert
		this.props.dispatch(oppdaterSoknadsdata({oppdatertBankinformasjon}));
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
		return (
			<Sporsmal tekster={{sporsmal: "Kontonummer"}}>
				<div>
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
				</div>
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
