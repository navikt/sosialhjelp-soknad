import * as React from "react";
import { injectIntl } from "react-intl";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import {
	erTelefonnummer,
	inneholderBareGyldigeTegnForTelefonnummer
} from "../../../../nav-soknad/validering/valideringer";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../redux/soknadsdata/soknadsdataReducer";
import { Telefonnummer } from "./telefonTypes";
import {ValideringsFeilKode} from "../../../redux/validering/valideringActionTypes";
import {IntlProps, replaceDotWithUnderscore} from "../../../../nav-soknad/utils";

const FAKTUM_KEY_TELEFON = "kontakt.telefon";
const FAKTUM_KEY_SYSTEM_TELEFON = "kontakt.system.telefoninfo";
const LANDKODE = "+47";

type Props = SoknadsdataContainerProps & IntlProps;

class TelefonView extends React.Component<Props, {}> {

	componentDidMount() {
		const {behandlingsId} = this.props;
		if (behandlingsId){
			this.props.hentSoknadsdata(behandlingsId, SoknadsSti.TELEFONNUMMER);
		}
	}

	setBrukerdefinert(verdi: boolean) {
		const { soknadsdata, behandlingsId } = this.props;
		if (behandlingsId){
			const telefonnummer = soknadsdata.personalia.telefonnummer;
			telefonnummer.brukerdefinert = verdi;
			telefonnummer.brukerutfyltVerdi = null;
			this.forberedOgSendTelefonnummer(telefonnummer, behandlingsId);
			this.props.oppdaterSoknadsdataSti(SoknadsSti.TELEFONNUMMER, telefonnummer);
		}
	}

	onChange(verdi: any) {
		const { soknadsdata } = this.props;
		const telefonnummer = soknadsdata.personalia.telefonnummer;
		telefonnummer.brukerutfyltVerdi = verdi;

		this.props.oppdaterSoknadsdataSti(SoknadsSti.TELEFONNUMMER, telefonnummer);

		const valideringsfeil: ValideringsFeilKode | undefined = inneholderBareGyldigeTegnForTelefonnummer(verdi);
		if (valideringsfeil === undefined) {
			this.props.clearValideringsfeil(FAKTUM_KEY_TELEFON);
		} else {
			this.props.setValideringsfeil(valideringsfeil, FAKTUM_KEY_TELEFON);
		}
	}

	onBlur() {
		const { soknadsdata, behandlingsId } = this.props;
		if (behandlingsId){
			const telefonnummer = {...soknadsdata.personalia.telefonnummer};
			this.forberedOgSendTelefonnummer(telefonnummer, behandlingsId);
		}
	}

	forberedOgSendTelefonnummer(telefonnummer: Telefonnummer, brukerBehandlingId: string){
		let verdi = telefonnummer.brukerutfyltVerdi;
		let feilkode: ValideringsFeilKode | undefined = undefined;

		if(verdi === "" || verdi === null) {
			this.props.clearValideringsfeil(FAKTUM_KEY_TELEFON);
		} else {
			verdi = this.fjernLandkodeSpacesOgPunktum(verdi);
			telefonnummer.brukerutfyltVerdi = verdi;
			feilkode = this.validerTelefonnummer(verdi);
		}

		if (!feilkode) {
			if (telefonnummer.brukerutfyltVerdi !== null && telefonnummer.brukerutfyltVerdi !== "") {
				telefonnummer.brukerutfyltVerdi = LANDKODE + this.fjernLandkodeSpacesOgPunktum(telefonnummer.brukerutfyltVerdi);
			}
			if (telefonnummer.brukerdefinert != null && !telefonnummer.brukerdefinert) {
				this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.TELEFONNUMMER, telefonnummer,
					() => this.props.hentSoknadsdata(brukerBehandlingId, SoknadsSti.TELEFONNUMMER));
			} else {
				this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.TELEFONNUMMER, telefonnummer);
			}
		}
	}

	validerTelefonnummer(verdi: string): ValideringsFeilKode | undefined {
		const feilkode: ValideringsFeilKode | undefined = erTelefonnummer(verdi);
		if (verdi !== "" && feilkode){
			// onEndretValideringsfeil(feilkode, FAKTUM_KEY_TELEFON, this.props.feil, () => {
				this.props.setValideringsfeil(feilkode, FAKTUM_KEY_TELEFON);
			// });
		} else {
			this.props.clearValideringsfeil(FAKTUM_KEY_TELEFON);
		}
		return feilkode;
	}

	fjernLandkodeSpacesOgPunktum(telefonnummer: string) {
		telefonnummer = telefonnummer.replace( /^\+47/, "");
		telefonnummer = telefonnummer.replace( /^0047/, "");
		telefonnummer = telefonnummer.replace( / /g, "");
		telefonnummer = telefonnummer.replace(/\./g,"");

		return telefonnummer;
	}

	intl(id: string): string {
		const { intl } = this.props;
		return intl.formatMessage({ id });
	}

	render() {
		const {intl, soknadsdata } = this.props;
		const telefonnummer = soknadsdata.personalia.telefonnummer;

		const brukerdefinert = telefonnummer ? telefonnummer.brukerdefinert : false;
		const verdi = telefonnummer && telefonnummer.brukerutfyltVerdi ? telefonnummer.brukerutfyltVerdi : "";
		const systemverdi = telefonnummer ? telefonnummer.systemverdi : "";


		const faktumKey = telefonnummer.brukerdefinert ? FAKTUM_KEY_TELEFON : FAKTUM_KEY_SYSTEM_TELEFON;
		const endreLabel = this.intl("kontakt.system.telefon.endreknapp.label");
		const avbrytLabel = this.intl("systeminfo.avbrytendringknapp.label");
		const infotekst = this.intl(faktumKey + ".infotekst.tekst");
		const sporsmal = this.intl(faktumKey + ".sporsmal");
		const faktumKeyTelefonId = replaceDotWithUnderscore(FAKTUM_KEY_TELEFON);

		switch (systemverdi) {
			case null: {
				return (
					<Sporsmal
						tekster={{sporsmal, infotekst: { tittel: undefined, tekst: infotekst }}}
					>
							<InputEnhanced
								id={faktumKeyTelefonId}
								type="tel"
								maxLength={14}
								bredde={"S"}
								className="skjemaelement__enLinje185bredde"
								verdi={verdi}
								onChange={(input: string) => this.onChange(input)}
								onBlur={() => this.onBlur()}
								getName={() => FAKTUM_KEY_TELEFON}
								faktumKey={FAKTUM_KEY_TELEFON}
								required={false}
							/>
					</Sporsmal>
					)
			}
			default: {
				return (

					<Sporsmal
						tekster={{sporsmal, infotekst: { tittel: undefined, tekst: infotekst }}}
					>
						<SysteminfoMedSkjema
							skjemaErSynlig={brukerdefinert ? brukerdefinert : false}
							onVisSkjema={() => this.setBrukerdefinert(true)}
							onSkjulSkjema={() => this.setBrukerdefinert(false)}
							endreLabel={endreLabel}
							avbrytLabel={avbrytLabel}
							skjema={(
								<InputEnhanced
									id={faktumKeyTelefonId}
									type="tel"
									maxLength={15}
									bredde={"S"}
									className="skjemaelement__enLinje185bredde"
									verdi={verdi}
									onChange={(input: string) => this.onChange(input)}
									onBlur={() => this.onBlur()}
									getName={() => FAKTUM_KEY_TELEFON}
									faktumKey={FAKTUM_KEY_TELEFON}
									required={false}
								/>
							)}
						>
							{!brukerdefinert && (<Detaljeliste>
								<DetaljelisteElement
									tittel={
										intl.formatHTMLMessage({id: "kontakt.system.telefon.label"})
									}
									verdi={systemverdi}
								/>
							</Detaljeliste>)}
						</SysteminfoMedSkjema>
					</Sporsmal>

				);
			}
		}

	}
}

export {TelefonView};

export default connectSoknadsdataContainer(injectIntl(TelefonView));
