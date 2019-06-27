import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import Sporsmal, {SporsmalStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema";
import ArbeidDetaljer from "./ArbeidDetaljer";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import { maksLengde } from "../../../../nav-soknad/validering/valideringer";
import {
	connectSoknadsdataContainer, onEndretValideringsfeil,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { Arbeidsforhold } from "./arbeidTypes";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {REST_STATUS} from "../../../../nav-soknad/types";
import {ValideringsFeilKode} from "../../../../nav-soknad/redux/valideringActionTypes";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

const MAX_CHARS = 500;
const FAKTUM_KEY_KOMMENTARER = "opplysninger.arbeidsituasjon.kommentarer";

interface State {
	oppstartsModus: boolean;
}

class ArbeidView extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			oppstartsModus: true
		};
	}

	componentDidMount() {
		if (this.props.brukerBehandlingId){
			this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.ARBEID);
			this.props.clearValideringsfeil(FAKTUM_KEY_KOMMENTARER);
		}
	}

	componentWillUpdate() {
		const { soknadsdata } = this.props;
		const restStatus = soknadsdata.restStatus.arbeid;
		if (this.state.oppstartsModus && restStatus === REST_STATUS.OK) {
			this.setState({ oppstartsModus: false });
		}
	}

	onChange(verdi: string) {
		const { soknadsdata } = this.props;
		const arbeid = soknadsdata.arbeid;
		arbeid.kommentarTilArbeidsforhold = verdi;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.ARBEID, arbeid);
		this.validerTekstfeltVerdi(verdi, FAKTUM_KEY_KOMMENTARER);
	}

	lagreHvisGyldig() {
		const { soknadsdata, brukerBehandlingId } = this.props;
		const arbeid = soknadsdata.arbeid;
		const kommentarTilArbeidsforhold = arbeid.kommentarTilArbeidsforhold;
		const feilkode: ValideringsFeilKode | undefined =
			this.validerTekstfeltVerdi(
				kommentarTilArbeidsforhold ? kommentarTilArbeidsforhold : "",
				FAKTUM_KEY_KOMMENTARER
			);
		if (!feilkode) {
			this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.ARBEID, arbeid);
		}
	}

	validerTekstfeltVerdi(verdi: string, faktumKey: string): ValideringsFeilKode | undefined {
		const feilkode: ValideringsFeilKode | undefined = maksLengde(verdi, MAX_CHARS);
		onEndretValideringsfeil(feilkode, faktumKey, this.props.feil, () => {
			if (feilkode){
				this.props.setValideringsfeil(feilkode, faktumKey);
			} else {
				this.props.clearValideringsfeil(faktumKey);
			}
		});
		return feilkode;
	}

	render() {
		const { soknadsdata, intl } = this.props;
		const arbeid = soknadsdata.arbeid;
		let alleArbeidsforhold: Arbeidsforhold[] | null = null;
		let kommentarTilArbeidsforhold = "";
		const faktumKommentarerId = FAKTUM_KEY_KOMMENTARER.replace(/\./g, "_");
		if (arbeid) {
			if (arbeid.kommentarTilArbeidsforhold) {
				kommentarTilArbeidsforhold = arbeid.kommentarTilArbeidsforhold;
			}
			if (arbeid.arbeidsforhold) {
				alleArbeidsforhold = arbeid.arbeidsforhold;
			}
		}
		let oppstartsModus = this.state.oppstartsModus;
		const restStatus = soknadsdata.restStatus.arbeid;
		if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
			oppstartsModus = false;
		}
		const style: SporsmalStyle = "system";
		if (oppstartsModus) {
			return (
				<div className="skjema-sporsmal">
					<Sporsmal sprakNokkel="arbeidsforhold" style={style}>
						<TextPlaceholder lines={6}/>
					</Sporsmal>
				</div>
			)
		}
		return (
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
							{alleArbeidsforhold.map((arbeidsforhold: Arbeidsforhold, index: any) =>
								<li key={index} className="arbeidsgiverliste__arbeidsgiver">
									<ArbeidDetaljer arbeidsforhold={arbeidsforhold} />
								</li>
							)}
						</ul>
					)}
					<TextareaEnhanced
						id={faktumKommentarerId}
						placeholder={intl.formatMessage({
							id: "begrunnelse.hvorfor.placeholder"
						})}
						onChange={(evt: any) => this.onChange(evt.target.value)}
						onBlur={() => this.lagreHvisGyldig()}
						faktumKey={FAKTUM_KEY_KOMMENTARER}
						maxLength={MAX_CHARS}
						value={kommentarTilArbeidsforhold ? kommentarTilArbeidsforhold : ""}
					/>
				</SysteminfoMedSkjema>
			</Sporsmal>
		);
	}
}

export {ArbeidView};

export default connectSoknadsdataContainer(injectIntl(ArbeidView));
