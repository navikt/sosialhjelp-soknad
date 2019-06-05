import * as React from "react";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { Checkbox } from "nav-frontend-skjema";
import { erKontonummer } from "../../../../nav-soknad/validering/valideringer";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema";
import { Kontonummer } from "./KontonummerType";
import {
	connectSoknadsdataContainer,
	onEndretValideringsfeil,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import { REST_STATUS } from "../../../../nav-soknad/types";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import {ValideringsfeilType} from "../../../../nav-soknad/redux/valideringActionTypes";

interface OwnProps {
	disableLoadingAnimation?: boolean;
}

interface State {
	oppstartsModus: boolean
}

type Props = SoknadsdataContainerProps & InjectedIntlProps & OwnProps;

const FAKTUM_KEY_KONTONUMMER = "kontakt.kontonummer";

class Bankinformasjon extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			oppstartsModus: true
		}
	}

	componentWillUpdate(nextProps: Readonly<Props>) {
		const restStatus = nextProps.soknadsdata.restStatus.personalia.kontonummer;
		if (this.state.oppstartsModus === true && restStatus === REST_STATUS.OK) {
			this.setState({oppstartsModus: false});
		}
	}

	componentDidMount() {
		this.props.clearValideringsfeil(FAKTUM_KEY_KONTONUMMER);
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BANKINFORMASJON)
	}

	onBlur() {
		const { soknadsdata } = this.props;
		let kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
		let feilkode: ValideringsfeilType = null;
		if (kontonummer.brukerutfyltVerdi !== null && kontonummer.brukerutfyltVerdi !== "") {
			feilkode = this.validerKontonummer(kontonummer.brukerutfyltVerdi);
			if (!feilkode) {
				kontonummer = this.vaskKontonummerVerdi(kontonummer);
				this.props.lagreSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BANKINFORMASJON, kontonummer);
			}
		} else {
			onEndretValideringsfeil(feilkode, FAKTUM_KEY_KONTONUMMER, this.props.feil, () => {
				this.props.setValideringsfeil(feilkode, FAKTUM_KEY_KONTONUMMER);
			});
			this.props.lagreSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BANKINFORMASJON, kontonummer);
		}
	}

	validerKontonummer(brukerutfyltVerdi: string): ValideringsfeilType {
		brukerutfyltVerdi = brukerutfyltVerdi.replace(/[ \.]/g,"");
		const feilkode: ValideringsfeilType = erKontonummer(brukerutfyltVerdi);
		onEndretValideringsfeil(feilkode, FAKTUM_KEY_KONTONUMMER, this.props.feil, () => {
			this.props.setValideringsfeil(feilkode, FAKTUM_KEY_KONTONUMMER);
		});
		return feilkode;
	}

	endreKontoBrukerdefinert(brukerdefinert: boolean) {
		const { soknadsdata } = this.props;
		const kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
		kontonummer.brukerdefinert = brukerdefinert;
		kontonummer.brukerutfyltVerdi = "";
		kontonummer.harIkkeKonto = false;
		this.props.clearValideringsfeil(FAKTUM_KEY_KONTONUMMER);
		this.props.oppdaterSoknadsdataSti(SoknadsSti.BANKINFORMASJON, kontonummer);
		this.props.lagreSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BANKINFORMASJON, kontonummer);
	}

	onChangeInput(brukerutfyltVerdi: string) {
		this.props.clearValideringsfeil(FAKTUM_KEY_KONTONUMMER);
		const { soknadsdata } = this.props;
		const kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
		kontonummer.brukerutfyltVerdi = brukerutfyltVerdi;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.BANKINFORMASJON, kontonummer);
	}

	onChangeCheckboks(event: any): void {
		const { soknadsdata } = this.props;
		const kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
		kontonummer.harIkkeKonto = !kontonummer.harIkkeKonto;
		if (kontonummer.harIkkeKonto) {
			this.props.clearValideringsfeil(FAKTUM_KEY_KONTONUMMER);
			kontonummer.brukerutfyltVerdi = "";
		}
		this.props.oppdaterSoknadsdataSti(SoknadsSti.BANKINFORMASJON, kontonummer);
		this.props.lagreSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BANKINFORMASJON, kontonummer);
		event.preventDefault();
	}

	vaskKontonummerVerdi(kontonummer: Kontonummer) {
		const kontonummerClone = {...kontonummer};
		if (kontonummerClone.brukerutfyltVerdi !== null && kontonummerClone.brukerutfyltVerdi.length > 1) {
			kontonummerClone.brukerutfyltVerdi = kontonummerClone.brukerutfyltVerdi.replace(/\D/g, "");
		}
		return kontonummerClone;
	}

	render() {
		const { intl, soknadsdata } = this.props;
		const kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
		const endreLabel: string = intl.formatMessage({id: "kontakt.system.kontonummer.endreknapp.label"});
		const avbrytLabel: string = intl.formatMessage({id: "systeminfo.avbrytendringknapp.label"});
		const inputVerdi: string = kontonummer && kontonummer.brukerutfyltVerdi ? kontonummer.brukerutfyltVerdi : "";
		let infotekst: string = intl.formatMessage({ id: "kontakt.system.personalia.infotekst.tekst" });

		if (kontonummer.brukerdefinert) {
			infotekst = intl.formatMessage({ id: "kontakt.kontonummer.infotekst.tekst" });
		}
		const restStatus = soknadsdata.restStatus.personalia.kontonummer;
		let oppstartsModus = this.state.oppstartsModus;
		if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
			oppstartsModus = false;
		}
		if(oppstartsModus && this.props.disableLoadingAnimation !== true) {
			return (
				<Sporsmal tekster={{ sporsmal: "Kontonummer", infotekst: { tittel: null, tekst: null } }}>
					<TextPlaceholder lines={3}/>
				</Sporsmal>
			);
		}

		switch(kontonummer.systemverdi){
			case null: {
				return (
					<Sporsmal tekster={{ sporsmal: "Kontonummer", infotekst: { tittel: null, tekst: infotekst } }}>
						<div>
							<InputEnhanced
								faktumKey="kontakt.kontonummer"
								id="bankinfo_konto"
								className={"input--xxl faktumInput "}
								disabled={kontonummer.harIkkeKonto}
								verdi={inputVerdi}
								required={false}
								onChange={(input: string) => this.onChangeInput(input)}
								onBlur={() => this.onBlur()}
								maxLength={13}
								bredde={"S"}
							/>
							<div
								className={"inputPanel " + (kontonummer.harIkkeKonto ? " inputPanel__checked" : " ")}
								onClick={(event: any) => this.onChangeCheckboks(event)}
							>
								<Checkbox
									id="kontakt_kontonummer_har_ikke_checkbox"
									name="kontakt_kontonummer_har_ikke_checkbox"
									checked={kontonummer.harIkkeKonto}
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
			default: {
				return (
					<Sporsmal tekster={{ sporsmal: "Kontonummer", infotekst: { tittel: null, tekst: infotekst } }}>
						<SysteminfoMedSkjema
							skjemaErSynlig={kontonummer.brukerdefinert}
							onVisSkjema={() => this.endreKontoBrukerdefinert(true)}
							onSkjulSkjema={() => this.endreKontoBrukerdefinert(false)}
							endreLabel={endreLabel}
							avbrytLabel={avbrytLabel}
							focus={false}
							skjema={(
								<div>
									<InputEnhanced
										faktumKey="kontakt.kontonummer"
										id="bankinfo_konto"
										className={"input--xxl faktumInput "}
										disabled={kontonummer.harIkkeKonto}
										verdi={inputVerdi}
										required={false}
										onChange={(input: string) => this.onChangeInput(input)}
										onBlur={() => this.onBlur()}
										maxLength={13}
										bredde={"S"}
									/>
									<div
										className={"inputPanel " + (kontonummer.harIkkeKonto ? " inputPanel__checked" : " ")}
										onClick={(event: any) => this.onChangeCheckboks(event)}
									>
										<Checkbox
											id="kontakt_kontonummer_har_ikke_checkbox"
											name="kontakt_kontonummer_har_ikke_checkbox"
											checked={kontonummer.harIkkeKonto}
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
							{!kontonummer.brukerdefinert && (
								<Detaljeliste>
									<DetaljelisteElement
										tittel={
											intl.formatHTMLMessage({ id: "kontakt.system.kontonummer.label" })
										}
										verdi={kontonummer.systemverdi}
									/>
								</Detaljeliste>
							)}
						</SysteminfoMedSkjema>
					</Sporsmal>
				);
			}
		}
	}
}

export {Bankinformasjon as BankinformasjonView};

export default connectSoknadsdataContainer(injectIntl(Bankinformasjon));
