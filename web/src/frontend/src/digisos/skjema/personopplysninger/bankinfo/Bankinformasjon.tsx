import * as React from "react";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { Checkbox } from "nav-frontend-skjema";
import { ValideringActionKey } from "../../../../nav-soknad/validering/types";
import { erKontonummer } from "../../../../nav-soknad/validering/valideringer";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema";
import { setPath } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataActions";
import { Kontonummer } from "./KontonummerType";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

const FAKTUM_KEY_KONTONUMMER = "kontakt.kontonummer";

class Bankinformasjon extends React.Component<Props, {}> {
	kontonummerInput: HTMLInputElement;

	componentDidMount(): void {
		this.props.setValideringsfeil(null, FAKTUM_KEY_KONTONUMMER);
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BANKINFORMASJON)
	}

	lagreDersomGyldig() {
		const kontonummer: Kontonummer = this.getKontonummer();
		if (kontonummer.verdi !== "") {
			const feilkode: ValideringActionKey = erKontonummer(kontonummer.verdi);
			if (feilkode) {
				this.props.setValideringsfeil(feilkode, FAKTUM_KEY_KONTONUMMER);
			} else {
				this.props.lagreSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BANKINFORMASJON, kontonummer);
				this.props.setValideringsfeil(null, FAKTUM_KEY_KONTONUMMER);
			}
		} else {
			this.props.setValideringsfeil(null, FAKTUM_KEY_KONTONUMMER);
		}
	}

	getKontonummer(): Kontonummer {
		return this.props.soknadsdata.personalia.kontonummer;
	}

	lagreKontonummer(kontonummer: Kontonummer): void {
		this.props.lagreSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BANKINFORMASJON, kontonummer);
	}

	endreKontoBrukerdefinert(brukerdefinert: boolean) {
		const kontonummer: Kontonummer = this.getKontonummer();
		kontonummer.brukerdefinert = brukerdefinert;
		this.lagreKontonummer(kontonummer);
	}

	onChangeInput(verdi: string) {
		const kontonummer: Kontonummer = this.getKontonummer();
		kontonummer.verdi = verdi;
		this.props.oppdaterSoknadsdataState(setPath(this.props.soknadsdata, SoknadsSti.BANKINFORMASJON, kontonummer));
	}

	onChangeCheckboks(event: any): void {
		const kontonummer: Kontonummer = this.getKontonummer();
		const harIkkeKonto = kontonummer.harIkkeKonto ? true : false;
		kontonummer.harIkkeKonto = !harIkkeKonto;
		this.lagreKontonummer(kontonummer);
		event.preventDefault();
	}

	render() {
		const { intl } = this.props;
		const kontonummer: Kontonummer = this.getKontonummer();
		if (!kontonummer) {
			return (<span/>);
		}
		const skjemaErSynlig: boolean = (
			kontonummer.systemverdi === null ||
			kontonummer.brukerdefinert === true
		);
		const infotekst = intl.formatMessage({ id: "kontakt.kontonummer.infotekst.tekst" });
		let endreLabel = intl.formatMessage({id: "kontakt.system.kontonummer.endreknapp.label"});
		let avbrytLabel: string = intl.formatMessage({id: "systeminfo.avbrytendringknapp.label"});
		if(kontonummer.systemverdi === null && skjemaErSynlig) {
			endreLabel = null;
			avbrytLabel = null;
		}

		const harIkkeKonto: boolean = (kontonummer && kontonummer.harIkkeKonto) ? true : false;
		const kontonummerVerdi: string = (kontonummer && kontonummer.verdi && harIkkeKonto === false) ?
			kontonummer.verdi : "";


		return (
			<div style={{ border: "3px dotted red", display: "block" }}>
				<Sporsmal tekster={{ sporsmal: "Kontonummer", infotekst: { tittel: null, tekst: infotekst } }}>
					<SysteminfoMedSkjema
						skjemaErSynlig={skjemaErSynlig}
						onVisSkjema={() => this.endreKontoBrukerdefinert(true)}
						onSkjulSkjema={() => this.endreKontoBrukerdefinert(false)}
						endreLabel={endreLabel}
						avbrytLabel={avbrytLabel}
						skjema={(
							<div>
								<InputEnhanced
									faktumKey="kontakt.kontonummer"
									id="bankinfo_konto"
									className={"input--xxl faktumInput "}
									inputRef={c => (this.kontonummerInput = c)}
									disabled={harIkkeKonto}
									verdi={kontonummerVerdi}
									required={false}
									onChange={(evt: any) => this.onChangeInput(evt.target.value)}
									onBlur={() => this.lagreDersomGyldig()}
									maxLength={13}
									bredde={"S"}
								/>
								<div
									className={"inputPanel " + (harIkkeKonto ? " inputPanel__checked" : " ")}
									onClick={(event: any) => this.onChangeCheckboks(event)}
								>
									<Checkbox
										id="kontakt_kontonummer_har_ikke_checkbox"
										name="kontakt_kontonummer_har_ikke_checkbox"
										checked={harIkkeKonto}
										onChange={(event: any) => this.onChangeCheckboks(event)}
										label={
											<div>
												{intl.formatHTMLMessage({ id: "kontakt.kontonummer.harikke" })}
											</div>
										}
									/>
								</div>
							</div>
						)}
					>
						<Detaljeliste>
							<DetaljelisteElement
								tittel={
									intl.formatHTMLMessage({ id: "kontakt.system.kontonummer.label" })
								}
								verdi={kontonummer.systemverdi}
							/>
						</Detaljeliste>
					</SysteminfoMedSkjema>
				</Sporsmal>
			</div>
		);
	}

}

export {Bankinformasjon as BankinformasjonView};

export default connectSoknadsdataContainer(injectIntl(Bankinformasjon));