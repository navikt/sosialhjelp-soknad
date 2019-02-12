import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { ValideringActionKey } from "../../../../nav-soknad/validering/types";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import Sporsmal  from "../../../../nav-soknad/components/sporsmal/Sporsmal";
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

type Props = SoknadsdataContainerProps & InjectedIntlProps;

const MAX_CHARS = 500;
const FAKTUM_KEY_KOMMENTARER = "opplysninger.arbeidsituasjon.kommentarer";

class ArbeidView extends React.Component<Props, {}> {

	componentDidMount() {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.ARBEID);
		this.props.setValideringsfeil(null, FAKTUM_KEY_KOMMENTARER);
	}

	onChange(verdi: string) {
		const { soknadsdata } = this.props;
		const arbeid = soknadsdata.arbeid;
		arbeid.kommentarTilArbeidsforhold = verdi;
		this.props.oppdaterSoknadsdataState(soknadsdata);
	}

	lagreHvisGyldig() {
		const { soknadsdata, brukerBehandlingId } = this.props;
		const arbeid = soknadsdata.arbeid;
		const kommentarTilArbeidsforhold = arbeid.kommentarTilArbeidsforhold;
		const feilkode = this.validerTekstfeltVerdi(kommentarTilArbeidsforhold, FAKTUM_KEY_KOMMENTARER);
		if (!feilkode) {
			this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.ARBEID, arbeid);
		}
	}

	validerTekstfeltVerdi(verdi: string, faktumKey: string): ValideringActionKey {
		const feilkode: ValideringActionKey = maksLengde(verdi, MAX_CHARS);
		onEndretValideringsfeil(feilkode, faktumKey, this.props.feil, () => {
			this.props.setValideringsfeil(feilkode, faktumKey);
		});
		return feilkode;
	}

	render() {
		const { soknadsdata, intl } = this.props;
		const arbeid = soknadsdata.arbeid;
		let alleArbeidsforhold: Arbeidsforhold[] = null;
		let kommentarTilArbeidsforhold = "";
		if (arbeid) {
			if (arbeid.kommentarTilArbeidsforhold) {
				kommentarTilArbeidsforhold = arbeid.kommentarTilArbeidsforhold;
			}
			if (arbeid.arbeidsforhold) {
				alleArbeidsforhold = arbeid.arbeidsforhold;
			}
		}
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
								{alleArbeidsforhold.map((arbeidsforhold: Arbeidsforhold, index: any) =>
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
							value={kommentarTilArbeidsforhold}
						/>
					</SysteminfoMedSkjema>
				</Sporsmal>
			</div>
		);
	}
}

export {ArbeidView};

export default connectSoknadsdataContainer(injectIntl(ArbeidView));
