import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { hentTelefonnummerAction, oppdaterTelefonnummerAction, Telefonnummer } from "./telefonActions";
import { State } from "../../../redux/reducers";
import { ValideringActionKey, Valideringsfeil } from "../../../../nav-soknad/validering/types";
import { setFaktumValideringsfeil } from "../../../../nav-soknad/redux/valideringActions";
import { oppdaterSoknadsdataState } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { connect } from "react-redux";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import { erTelefonnummer } from "../../../../nav-soknad/validering/valideringer";
import { Feil } from "nav-frontend-skjema";

const FAKTUM_KEY_TELEFON = "kontakt.telefon";
const FAKTUM_KEY_TELEFONINFO = "kontakt.system.telefoninfo";
const LANDKODE = "+47";

interface OwnProps {
	brukerBehandlingId?: string;
	telefonnummer?: null | Telefonnummer;
	hentTelefonnummer?: (brukerBehandlingId: string) => void;
	oppdaterTelefonnummer?: (brukerBehandlingId: string, telefonnummer: Telefonnummer) => void;
	setFaktumValideringsfeil?: (valideringsfeil: Valideringsfeil, faktumKey: string) => void;
	feil?: any;
}

interface OwnState {
	synligSkjema: boolean;
	verdi: string;
	dirtyFlag: boolean;
}

type Props = OwnProps & InjectedIntlProps;

class TelefonView extends React.Component<Props, OwnState> {

	constructor(props: Props) {
		super(props);
		this.state = {
			synligSkjema: false,
			verdi: "",
			dirtyFlag: false
		}
	}

	componentDidMount(): void {
		this.props.hentTelefonnummer(this.props.brukerBehandlingId);
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<OwnState>, snapshot?: any): void {
		if(this.props.telefonnummer.verdi !== prevProps.telefonnummer.verdi) {
			this.setState({verdi: this.props.telefonnummer.verdi.replace("+47","")});
		}
		if(this.props.telefonnummer.brukerdefinert !== prevProps.telefonnummer.brukerdefinert &&
			this.props.telefonnummer.brukerdefinert === true ) {
			this.setState({synligSkjema: true});
		}
	}

	visSkjema(verdi: boolean) {
		this.setState({synligSkjema: verdi});
		const telefonnummer: Telefonnummer = {
			brukerdefinert: verdi,
			systemverdi: this.props.telefonnummer.systemverdi,
			verdi: LANDKODE + this.state.verdi
		};
		this.props.oppdaterTelefonnummer(this.props.brukerBehandlingId, telefonnummer);
	}

	onChange(verdi: any) {
		this.setState({verdi, dirtyFlag: true});
	}

	onBlur() {
		if(this.state.verdi === "") {
			this.props.setFaktumValideringsfeil(null, FAKTUM_KEY_TELEFON);
		} else {
			let verdi = this.state.verdi;
			verdi = verdi.replace(/ +/, "");
			const valideringActionKey: ValideringActionKey = erTelefonnummer(verdi);
			if(valideringActionKey) {
				const valideringsfeil: Valideringsfeil = {
					faktumKey: FAKTUM_KEY_TELEFON,
					feilkode: valideringActionKey
				};
				this.props.setFaktumValideringsfeil(valideringsfeil, FAKTUM_KEY_TELEFON);
			} else if (this.state.dirtyFlag === true) {
				const telefonnummer: Telefonnummer = {
					brukerdefinert: true,
					systemverdi: this.props.telefonnummer.systemverdi,
					verdi: LANDKODE + verdi
				};
				this.props.oppdaterTelefonnummer(this.props.brukerBehandlingId, telefonnummer);
				this.setState({dirtyFlag: false});
				this.props.setFaktumValideringsfeil(null, FAKTUM_KEY_TELEFON);
			}
		}
	}

	getFeil(): Feil {
		const intl = this.props.intl;
		const faktumKey = FAKTUM_KEY_TELEFON;
		const feilkode = this.props.feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey);
		return !feilkode ? null : { feilmelding: intl.formatHTMLMessage({ id: feilkode.feilkode }) };
	}

	render() {
		const {intl, telefonnummer} = this.props;
		const endreLabel = intl.formatMessage({ id: "kontakt.system.telefon.endreknapp.label"});
		const avbrytLabel: string = intl.formatMessage({id: "systeminfo.avbrytendringknapp.label"});
		return (
			<div style={{ border: "3px dotted red", display: "block" }}>
				<Sporsmal
					tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_KEY_TELEFONINFO)}
				>
					<SysteminfoMedSkjema
						skjemaErSynlig={this.state.synligSkjema}
						onVisSkjema={() => this.visSkjema(true)}
						onSkjulSkjema={() => this.visSkjema(false)}
						endreLabel={endreLabel}
						avbrytLabel={avbrytLabel}
						skjema={(
							<InputEnhanced
								type="tel"
								maxLength={14}
								bredde={"S"}
								className="skjemaelement__enLinje185bredde"
								verdi={this.state.verdi}
								onChange={(verdi: string) => this.onChange(verdi)}
								onBlur={() => this.onBlur()}
								getName={() => FAKTUM_KEY_TELEFON}
								faktumKey={FAKTUM_KEY_TELEFON}
								required={false}
								getFeil={() => this.getFeil()}
							/>
						)}
					>
						<Detaljeliste>
							<DetaljelisteElement
								tittel={
									intl.formatHTMLMessage({ id: "kontakt.system.telefon.label" })
								}
								verdi={telefonnummer.systemverdi}
							/>
						</Detaljeliste>
					</SysteminfoMedSkjema>
				</Sporsmal>
			</div>
		);
	}

}

const mapStateToProps = (state: State) => ({
	brukerBehandlingId: state.soknad.data.brukerBehandlingId,
	feil: state.validering.feil,
	telefonnummer: state.soknadsdata.telefonnummer
});

const mapDispatchToProps = (dispatch: any) => ({
	hentTelefonnummer: (brukerBehandlingId: string) => {
		dispatch(hentTelefonnummerAction(brukerBehandlingId))
	},
	setFaktumValideringsfeil: (valideringsfeil: Valideringsfeil, faktumKey: string) => {
		dispatch(setFaktumValideringsfeil(valideringsfeil, faktumKey))
	},
	oppdaterTelefonnummer: (brukerBehandlingId: string, telefonnummer: Telefonnummer) => {
		dispatch(oppdaterTelefonnummerAction(brukerBehandlingId, telefonnummer));
	},
	oppdaterSoknadsdata: (data: any) => {
		dispatch(oppdaterSoknadsdataState(data))
	},
	nullstillValideringsfeil: (faktumKey: string) => {
		dispatch(setFaktumValideringsfeil(null, faktumKey));
	}
});

export default connect<{}, {}, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(injectIntl(TelefonView));
