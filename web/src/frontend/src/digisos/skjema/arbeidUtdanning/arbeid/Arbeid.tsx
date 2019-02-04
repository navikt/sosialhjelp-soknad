import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { ValideringActionKey, Valideringsfeil } from "../../../../nav-soknad/validering/types";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import Sporsmal  from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { State } from "../../../redux/reducers";
import { setFaktumValideringsfeil } from "../../../../nav-soknad/redux/valideringActions";
import { oppdaterSoknadsdataAction } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema";
import { Arbeid, Arbeidsforhold, hentArbeidAction, oppdaterArbeidAction } from "./arbeidActions";
import ArbeidDetaljer from "./ArbeidDetaljer";
import { Feil } from "nav-frontend-skjema";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import { maksLengde } from "../../../../nav-soknad/validering/valideringer";

interface OwnProps {
	brukerBehandlingId?: string;
	arbeid?: Arbeid;
	hentArbeid?: (brukerBehandlingId: string) => void;
	oppdaterArbeid?: (brukerBehandlingId: string, Arbeid: Arbeid) => void;
	setFaktumValideringsfeil?: (valideringsfeil: Valideringsfeil, faktumKey: string) => void;
	nullstillValideringsfeil?: (faktumKey: string) => void;
	feil?: any;
}

interface OwnState {
	kommentarTilArbeidsforhold: null | string;
}

type Props = OwnProps & InjectedIntlProps;

const MAX_CHARS = 500;

const FAKTUM_KEY_KOMMENTARER = "opplysninger.arbeidsituasjon.kommentarer";

class ArbeidView extends React.Component<Props, OwnState> {

	constructor(props: Props) {
		super(props);
		this.state = {
			kommentarTilArbeidsforhold: ""
		}
	}

	componentDidMount() {
		this.props.hentArbeid(this.props.brukerBehandlingId);
		this.props.nullstillValideringsfeil(FAKTUM_KEY_KOMMENTARER);
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<OwnState>, snapshot?: any): void {
		if (this.props.arbeid.kommentarTilArbeidsforhold !== prevProps.arbeid.kommentarTilArbeidsforhold) {
			this.setState({kommentarTilArbeidsforhold: this.props.arbeid.kommentarTilArbeidsforhold});
		}
	}

	getFeil(faktumKey: string): Feil {
		const feilkode = this.props.feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey);
		return !feilkode ? null : { feilmelding: this.props.intl.formatHTMLMessage({ id: feilkode.feilkode }) };
	}

	onChange(verdi: string) {
		this.setState({kommentarTilArbeidsforhold: verdi});
	}

	lagreHvisGyldig() {
		const { kommentarTilArbeidsforhold } = this.state;
		const feilmeldingKommentar: ValideringActionKey = this.validerTekstfeltVerdi(kommentarTilArbeidsforhold, FAKTUM_KEY_KOMMENTARER);
		if (!feilmeldingKommentar) {
			this.props.oppdaterArbeid(this.props.brukerBehandlingId, {kommentarTilArbeidsforhold});
		}
	}

	validerTekstfeltVerdi(verdi: string, faktumKey: string): ValideringActionKey {
		const feilkode: ValideringActionKey = maksLengde(verdi, MAX_CHARS);
		if (feilkode) {
			const valideringsfeil: Valideringsfeil = {faktumKey,feilkode};
			this.props.setFaktumValideringsfeil(valideringsfeil, faktumKey);
		} else {
			this.props.nullstillValideringsfeil(faktumKey);
		}
		return feilkode;
	}

	render() {
		const { arbeid, intl } = this.props;
		const alleArbeidsforhold = arbeid ? arbeid.arbeidsforhold : null;

		return (
			<div style={{ border: "3px dotted red", display: "block" }}>
				<Sporsmal
					tekster={getFaktumSporsmalTekst(intl, "arbeidsforhold")}
					style="system"
				>
					<SysteminfoMedSkjema>
						<div className="skjema-sporsmal__tittel">
							<FormattedMessage id="arbeidsforhold.infotekst"/>
						</div>
						{(alleArbeidsforhold == null || alleArbeidsforhold.length === 0) && (
							<p>
								<FormattedMessage id="arbeidsforhold.ingen"/>
							</p>
						)}
						{alleArbeidsforhold && alleArbeidsforhold.length > 0 && (
							<ul className={"arbeidsgiverliste"}>
								{alleArbeidsforhold.map((arbeidsforhold: Arbeidsforhold, index) =>
									<li key={index} className="arbeidsgiverliste__arbeidsgiver">
										<ArbeidDetaljer arbeidsforhold={arbeidsforhold} />
									</li>
								)}
							</ul>
						)}
						<TextareaEnhanced
							id="begrunnelse_soknad_textarea"
							placeholder={intl.formatMessage({
								id: "begrunnelse.hvorfor.placeholder"
							})}
							onChange={(evt: any) => this.onChange(evt.target.value)}
							onBlur={() => this.lagreHvisGyldig()}
							faktumKey={FAKTUM_KEY_KOMMENTARER}
							labelId={FAKTUM_KEY_KOMMENTARER + ".label"}
							maxLength={MAX_CHARS}
							value={this.state.kommentarTilArbeidsforhold}
							getFeil={() => this.getFeil(FAKTUM_KEY_KOMMENTARER)}
							getName={() => FAKTUM_KEY_KOMMENTARER}
						/>
					</SysteminfoMedSkjema>
				</Sporsmal>
			</div>
		);
	}
}

const mapStateToProps = (state: State) => ({
	brukerBehandlingId: state.soknad.data.brukerBehandlingId,
	feil: state.validering.feil,
	arbeid: state.soknadsdata.arbeid
});

const mapDispatchToProps = (dispatch: any) => ({
	hentArbeid: (brukerBehandlingId: string) => {
		dispatch(hentArbeidAction(brukerBehandlingId))
	},
	setFaktumValideringsfeil: (valideringsfeil: Valideringsfeil, faktumKey: string) => {
		dispatch(setFaktumValideringsfeil(valideringsfeil, faktumKey))
	},
	oppdaterArbeid: (brukerBehandlingId: string, arbeid: Arbeid) => {
		dispatch(oppdaterArbeidAction(brukerBehandlingId, arbeid));
	},
	oppdaterSoknadsdata: (data: any) => {
		dispatch(oppdaterSoknadsdataAction(data))
	},
	nullstillValideringsfeil: (faktumKey: string) => {
		dispatch(setFaktumValideringsfeil(null, faktumKey));
	}
});

export {ArbeidView};

export default connect<{}, {}, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(injectIntl(ArbeidView));
