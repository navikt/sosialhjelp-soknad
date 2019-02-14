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
import { setPath } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataActions";

const FAKTUM_KEY_TELEFON = "kontakt.telefon";
const FAKTUM_KEY_TELEFONINFO = "kontakt.system.telefoninfo";
const LANDKODE = "+47";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class TelefonView extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.TELEFONNUMMER);
	}

	setBrukerdefinert(verdi: boolean) {
		const { soknadsdata } = this.props;
		const reduxSti: string = `${SoknadsSti.TELEFONNUMMER}/brukerdefinert`;
		this.props.oppdaterSoknadsdataState(setPath(soknadsdata, reduxSti, verdi));
	}

	onChange(verdi: any) {
		const { soknadsdata } = this.props;
		const reduxSti: string = `${SoknadsSti.TELEFONNUMMER}/verdi`;
		this.props.oppdaterSoknadsdataState(setPath(soknadsdata, reduxSti, verdi));
	}

	onBlur() {
		const { soknadsdata, brukerBehandlingId } = this.props;
		const { verdi } = soknadsdata.personalia.telefonnummer;
		if(verdi === "") {
			onEndretValideringsfeil(null, FAKTUM_KEY_TELEFON, this.props.feil, () => {
				this.props.setValideringsfeil(null, FAKTUM_KEY_TELEFON);
			});
		} else {
			const feilkode: ValideringActionKey = this.validerTelefonnummer(this.fjernLandkode(verdi));
			if (!feilkode) {
				soknadsdata.personalia.telefonnummer.verdi = LANDKODE + this.fjernLandkode(soknadsdata.personalia.telefonnummer.verdi);
				this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.TELEFONNUMMER, soknadsdata.personalia.telefonnummer);
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
		return telefonnummer.replace( /^\+47/, "");
	}

	render() {
		const {intl, soknadsdata } = this.props;
		const telefonnummer = soknadsdata.personalia.telefonnummer;
		console.warn(JSON.stringify(telefonnummer, null, 4));

		const endreLabel = intl.formatMessage({ id: "kontakt.system.telefon.endreknapp.label"});
		const avbrytLabel: string = intl.formatMessage({id: "systeminfo.avbrytendringknapp.label"});

		const verdi = (telefonnummer && telefonnummer.verdi) ? this.fjernLandkode(telefonnummer.verdi) : "";
		const brukerdefinert = telefonnummer ? telefonnummer.brukerdefinert : false;
		const systemverdi = telefonnummer ? telefonnummer.systemverdi : "";

		return (
			<div style={{ border: "3px dotted red", display: "block" }}>
				<Sporsmal
					tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_KEY_TELEFONINFO)}
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
			</div>
		);
	}

}

export default connectSoknadsdataContainer(injectIntl(TelefonView));
