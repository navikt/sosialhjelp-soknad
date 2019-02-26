import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { ValideringActionKey } from "../../../../nav-soknad/validering/types";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import { erTelefonnummer } from "../../../../nav-soknad/validering/valideringer";
import {
	connectSoknadsdataContainer, onEndretValideringsfeil,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";

const FAKTUM_KEY_TELEFON = "kontakt.telefon";
const FAKTUM_KEY_SYSTEM_TELEFON = "kontakt.system.telefoninfo";
const LANDKODE = "+47";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class TelefonView extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.TELEFONNUMMER);
	}

	setBrukerdefinert(verdi: boolean) {
		const { soknadsdata } = this.props;
		const telefonnummer = soknadsdata.personalia.telefonnummer;
		telefonnummer.brukerdefinert = verdi;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.TELEFONNUMMER, telefonnummer);
	}

	onChange(verdi: any) {
		const { soknadsdata } = this.props;
		const telefonnummer = soknadsdata.personalia.telefonnummer;
		telefonnummer.verdi = verdi;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.TELEFONNUMMER, telefonnummer);

		// verdi = this.fjernLandkode(verdi);
		// verdi = verdi.replace(/[ \.]/g,"");
		/* this.validerTelefonnummer(verdi); */
	}

	onBlur() {
		const { soknadsdata, brukerBehandlingId } = this.props;
		const telefonnummer = {...soknadsdata.personalia.telefonnummer};
		let verdi = telefonnummer.verdi;
		if(verdi === "" || verdi === null) {
			onEndretValideringsfeil(null, FAKTUM_KEY_TELEFON, this.props.feil, () => {
				this.props.setValideringsfeil(null, FAKTUM_KEY_TELEFON);
			});
		} else {
			verdi = this.fjernLandkode(verdi);
			verdi = verdi.replace(/[ \.]/g,"");
			telefonnummer.verdi = verdi;
			const feilkode: ValideringActionKey = this.validerTelefonnummer(verdi);
			if (!feilkode) {
				telefonnummer.verdi = LANDKODE + this.fjernLandkode(telefonnummer.verdi);
				this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.TELEFONNUMMER, telefonnummer);
			}
		}
	}

	validerTelefonnummer(verdi: string): ValideringActionKey {
		const feilkode: ValideringActionKey = erTelefonnummer(verdi);
		onEndretValideringsfeil(feilkode, FAKTUM_KEY_TELEFON, this.props.feil, () => {
			this.props.setValideringsfeil(feilkode, FAKTUM_KEY_TELEFON);
		});
		return feilkode;
	}

	fjernLandkode(telefonnummer: string) {
		return telefonnummer && telefonnummer.replace( /^\+47/, "");
	}

	render() {
		const {intl, soknadsdata } = this.props;
		const telefonnummer = soknadsdata.personalia.telefonnummer;
		const endreLabel = intl.formatMessage({ id: "kontakt.system.telefon.endreknapp.label"});
		const avbrytLabel: string = intl.formatMessage({id: "systeminfo.avbrytendringknapp.label"});
		// const verdi = (telefonnummer && telefonnummer.verdi) ? this.fjernLandkode(telefonnummer.verdi) : "";
		const verdi = (telefonnummer && telefonnummer.verdi) ? telefonnummer.verdi : "";
		const brukerdefinert = telefonnummer ? telefonnummer.brukerdefinert : false;
		const systemverdi = telefonnummer ? telefonnummer.systemverdi : "";
		const faktumKey = telefonnummer.systemverdi === null ? FAKTUM_KEY_TELEFON : FAKTUM_KEY_SYSTEM_TELEFON;

		return (
			<Sporsmal
				tekster={getFaktumSporsmalTekst(this.props.intl, faktumKey)}
			>
				<SysteminfoMedSkjema
					skjemaErSynlig={brukerdefinert}
					onVisSkjema={() => this.setBrukerdefinert(true)}
					onSkjulSkjema={() => this.setBrukerdefinert(false)}
					endreLabel={endreLabel}
					avbrytLabel={avbrytLabel}
					skjema={(
						<InputEnhanced
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
					)}
				>
					<Detaljeliste>
						<DetaljelisteElement
							tittel={
								intl.formatHTMLMessage({ id: "kontakt.system.telefon.label" })
							}
							verdi={systemverdi}
						/>
					</Detaljeliste>
				</SysteminfoMedSkjema>
			</Sporsmal>
		);
	}

}

export {TelefonView};

export default connectSoknadsdataContainer(injectIntl(TelefonView));
