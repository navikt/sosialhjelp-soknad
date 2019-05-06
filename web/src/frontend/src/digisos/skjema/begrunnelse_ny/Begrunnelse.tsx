import * as React from "react";
import {
	Begrunnelse as BegrunnelseType,
} from "./begrunnelseTypes";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { ValideringActionKey } from "../../../nav-soknad/validering/types";
import { maksLengde } from "../../../nav-soknad/validering/valideringer";
import Sporsmal, { LegendTittleStyle } from "../../../nav-soknad/components/sporsmal/Sporsmal";
import TextareaEnhanced from "../../../nav-soknad/faktum/TextareaEnhanced";
import {
	connectSoknadsdataContainer, onEndretValideringsfeil,
	SoknadsdataContainerProps
} from "../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";

const MAX_CHARS_BEGRUNNELSE = 800;
const MAX_CHARS = 500;
const FAKTUM_KEY_HVA = "begrunnelse.hva";
const FAKTUM_KEY_HVORFOR = "begrunnelse.hvorfor";
const HVA_SOKES_OM = "hvaSokesOm";
const HVORFOR_SOKE = "hvorforSoke";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class BegrunnelseSkjema extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.setValideringsfeil(null, FAKTUM_KEY_HVA);
		this.props.setValideringsfeil(null, FAKTUM_KEY_HVORFOR);
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BEGRUNNELSE);
	}

	onChange(value: string, key: string) {
		const { soknadsdata } = this.props;
		soknadsdata.begrunnelse[key]  = value;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.BEGRUNNELSE, soknadsdata.begrunnelse);
	}

	lagreHvisGyldig() {
		const { soknadsdata, brukerBehandlingId } = this.props;
		const { hvaSokesOm, hvorforSoke } = soknadsdata.begrunnelse;
		const feilmeldingHva: ValideringActionKey = this.validerTekstfeltVerdi(hvaSokesOm, FAKTUM_KEY_HVA, MAX_CHARS);
		const feilmeldingHvorfor: ValideringActionKey = this.validerTekstfeltVerdi(hvorforSoke, FAKTUM_KEY_HVORFOR, MAX_CHARS_BEGRUNNELSE);

		if (!feilmeldingHva && !feilmeldingHvorfor) {
			const begrunnelse: BegrunnelseType = {hvaSokesOm, hvorforSoke};
			this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.BEGRUNNELSE, begrunnelse);
		}
	}

    validerTekstfeltVerdi(verdi: string, faktumKey: string, max: number): ValideringActionKey {
		const feilkode: ValideringActionKey = maksLengde(verdi, max);
		onEndretValideringsfeil(feilkode, faktumKey, this.props.feil, () => {
			this.props.setValideringsfeil(feilkode, faktumKey);
		});
		return feilkode;
	}

	render() {
		const { intl, soknadsdata } = this.props;
		const begrunnelse = soknadsdata.begrunnelse;
		return (
			<div>
				<Sporsmal
					sprakNokkel={FAKTUM_KEY_HVA}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				>
					<TextareaEnhanced
						id="hva_sokes_det_om_textarea"
						placeholder={intl.formatMessage({
							id: "begrunnelse.hva.placeholder"
						})}
						onChange={(evt: any) => this.onChange(evt.target.value, HVA_SOKES_OM)}
						onBlur={() => this.lagreHvisGyldig()}
						faktumKey="begrunnelse.hva"
						labelId="begrunnelse.hva.label"
						maxLength={MAX_CHARS}
						value={begrunnelse.hvaSokesOm}
					/>
				</Sporsmal>
				<Sporsmal
					sprakNokkel={FAKTUM_KEY_HVORFOR}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				>
					<TextareaEnhanced
						id="begrunnelse_soknad_textarea"
						placeholder={intl.formatMessage({
							id: "begrunnelse.hvorfor.placeholder"
						})}
						onChange={(evt: any) => this.onChange(evt.target.value, HVORFOR_SOKE)}
						onBlur={() => this.lagreHvisGyldig()}
						faktumKey="begrunnelse.hvorfor"
						labelId="begrunnelse.hvorfor.label"
						hideLabel={true}
						maxLength={MAX_CHARS_BEGRUNNELSE}
						value={begrunnelse.hvorforSoke}
					/>
				</Sporsmal>
			</div>
		);
	}
}

export { BegrunnelseSkjema };

export default connectSoknadsdataContainer(injectIntl(BegrunnelseSkjema));
