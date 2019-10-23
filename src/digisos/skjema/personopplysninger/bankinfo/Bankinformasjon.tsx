import * as React from "react";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { Checkbox } from "nav-frontend-skjema";
import { erKontonummer } from "../../../../nav-soknad/validering/valideringer";
import { injectIntl } from "react-intl";
import { SoknadsSti } from "../../../redux/soknadsdata/soknadsdataReducer";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema";
import { Kontonummer } from "./KontonummerType";
import {
	connectSoknadsdataContainer,
	onEndretValideringsfeil,
	SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import {ValideringsFeilKode} from "../../../redux/validering/valideringActionTypes";
import {IntlProps, replaceDotWithUnderscore} from "../../../../nav-soknad/utils";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";

interface OwnProps {
	disableLoadingAnimation?: boolean;
}

interface State {
	oppstartsModus: boolean
}

type Props = SoknadsdataContainerProps & OwnProps & IntlProps;

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
		if (this.state.oppstartsModus && restStatus === REST_STATUS.OK) {
			this.setState({oppstartsModus: false});
		}
	}

	componentDidMount() {
		const {behandlingsId} = this.props;
		if (behandlingsId){
			this.props.clearValideringsfeil(FAKTUM_KEY_KONTONUMMER);
			this.props.hentSoknadsdata(behandlingsId, SoknadsSti.BANKINFORMASJON)
		}
	}

	onBlur() {
		const { soknadsdata, behandlingsId } = this.props;
		if (behandlingsId){
			let kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
			if (kontonummer.brukerutfyltVerdi !== null && kontonummer.brukerutfyltVerdi !== "") {
				const feilkode: ValideringsFeilKode | undefined = this.validerKontonummer(kontonummer.brukerutfyltVerdi);
				if (!feilkode) {
					kontonummer = this.vaskKontonummerVerdi(kontonummer);
					this.props.lagreSoknadsdata(behandlingsId, SoknadsSti.BANKINFORMASJON, kontonummer);
					this.props.clearValideringsfeil(FAKTUM_KEY_KONTONUMMER);
				}
			} else {
				this.props.clearValideringsfeil(FAKTUM_KEY_KONTONUMMER);
				this.props.lagreSoknadsdata(behandlingsId, SoknadsSti.BANKINFORMASJON, kontonummer);
			}
		}
	}

	validerKontonummer(brukerutfyltVerdi: string): ValideringsFeilKode | undefined {
		brukerutfyltVerdi = brukerutfyltVerdi.replace(/[.]/g,"");
		const feilkode: ValideringsFeilKode | undefined = erKontonummer(brukerutfyltVerdi);
		if(feilkode !== undefined){
			onEndretValideringsfeil(feilkode, FAKTUM_KEY_KONTONUMMER, this.props.feil, () => {
				this.props.setValideringsfeil(feilkode, FAKTUM_KEY_KONTONUMMER);
			});
		} else {
			this.props.clearValideringsfeil(FAKTUM_KEY_KONTONUMMER);
		}
		return feilkode;
	}

	endreKontoBrukerdefinert(brukerdefinert: boolean) {
		const { soknadsdata, behandlingsId } = this.props;
		if (behandlingsId){
			const kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
			kontonummer.brukerdefinert = brukerdefinert;
			kontonummer.brukerutfyltVerdi = "";
			kontonummer.harIkkeKonto = false;
			this.props.oppdaterSoknadsdataSti(SoknadsSti.BANKINFORMASJON, kontonummer);
			this.props.lagreSoknadsdata(behandlingsId, SoknadsSti.BANKINFORMASJON, kontonummer);
			this.props.clearValideringsfeil(FAKTUM_KEY_KONTONUMMER);
		}
	}

	onChangeInput(brukerutfyltVerdi: string) {
		this.props.clearValideringsfeil(FAKTUM_KEY_KONTONUMMER);
		const { soknadsdata } = this.props;
		const kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
		kontonummer.brukerutfyltVerdi = brukerutfyltVerdi;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.BANKINFORMASJON, kontonummer);
	}

	onChangeCheckboks(event: any): void {
		const { soknadsdata, behandlingsId } = this.props;
		if (behandlingsId){
			const kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
			kontonummer.harIkkeKonto = !kontonummer.harIkkeKonto;
			if (kontonummer.harIkkeKonto) {
				this.props.clearValideringsfeil(FAKTUM_KEY_KONTONUMMER);
				kontonummer.brukerutfyltVerdi = "";
			}
			this.props.oppdaterSoknadsdataSti(SoknadsSti.BANKINFORMASJON, kontonummer);
			this.props.lagreSoknadsdata(behandlingsId, SoknadsSti.BANKINFORMASJON, kontonummer);
			event.preventDefault();
		}
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
		const faktumKeyKontonummerId: string = replaceDotWithUnderscore(FAKTUM_KEY_KONTONUMMER);
		let infotekst: string = intl.formatMessage({ id: "kontakt.system.personalia.infotekst.tekst" });

		if (kontonummer.brukerdefinert) {
			infotekst = intl.formatMessage({ id: FAKTUM_KEY_KONTONUMMER + ".infotekst.tekst" });
		}
		const restStatus = soknadsdata.restStatus.personalia.kontonummer;
		let oppstartsModus = this.state.oppstartsModus;
		if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
			oppstartsModus = false;
		}
		if(oppstartsModus && this.props.disableLoadingAnimation !== true) {
			return (
				<Sporsmal tekster={{ sporsmal: "Kontonummer", infotekst: { tittel: undefined, tekst: undefined } }}>
					<TextPlaceholder lines={3}/>
				</Sporsmal>
			);
		}

		switch(kontonummer.systemverdi){
			case null: {
				return (
					<Sporsmal tekster={{ sporsmal: "Kontonummer", infotekst: { tittel: undefined, tekst: infotekst } }}>
						<div>
							<InputEnhanced
								faktumKey={FAKTUM_KEY_KONTONUMMER}
								id={faktumKeyKontonummerId}
								className={"input--xxl faktumInput "}
								disabled={kontonummer.harIkkeKonto ? kontonummer.harIkkeKonto : undefined}
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
									checked={kontonummer.harIkkeKonto ? kontonummer.harIkkeKonto : undefined}
									onChange={(event: any) => this.onChangeCheckboks(event)}
									label={
										<div>
											{intl.formatHTMLMessage({ id: FAKTUM_KEY_KONTONUMMER + ".harikke" })}
										</div>
									}
								/>
							</div>
						</div>
					</Sporsmal>
				);
			}
			default: {
				const faktumKeyFormatted = FAKTUM_KEY_KONTONUMMER.replace(/\./g, "_");
				return (
					<Sporsmal
						faktumKey={ FAKTUM_KEY_KONTONUMMER }
						tekster={{ sporsmal: "Kontonummer", infotekst: { tittel: undefined, tekst: infotekst } }}
					>
						<SysteminfoMedSkjema
							skjemaErSynlig={kontonummer.brukerdefinert}
							onVisSkjema={() => this.endreKontoBrukerdefinert(true)}
							onSkjulSkjema={() => this.endreKontoBrukerdefinert(false)}
							endreLabel={endreLabel}
							avbrytLabel={avbrytLabel}
							focus={false}
							skjema={(
								<div id={faktumKeyFormatted}>
									<InputEnhanced
										faktumKey={FAKTUM_KEY_KONTONUMMER}
										id={faktumKeyKontonummerId}
										className={"input--xxl faktumInput "}
										disabled={kontonummer.harIkkeKonto ? kontonummer.harIkkeKonto : undefined}
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
											checked={kontonummer.harIkkeKonto ? kontonummer.harIkkeKonto : undefined}
											onChange={(event: any) => this.onChangeCheckboks(event)}
											label={
												<div>
													{intl.formatHTMLMessage({ id: FAKTUM_KEY_KONTONUMMER + ".harikke" })}
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
											intl.formatHTMLMessage({ id: FAKTUM_KEY_KONTONUMMER + ".label" })
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
