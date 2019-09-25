import * as React from "react";
import {
	Begrunnelse as BegrunnelseType,
} from "./begrunnelseTypes";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { maksLengde } from "../../../nav-soknad/validering/valideringer";
import Sporsmal, { LegendTittleStyle } from "../../../nav-soknad/components/sporsmal/Sporsmal";
import TextareaEnhanced from "../../../nav-soknad/faktum/TextareaEnhanced";
import {
	connectSoknadsdataContainer, onEndretValideringsfeil,
	SoknadsdataContainerProps
} from "../../redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../redux/soknadsdata/soknadsdataReducer";
import {ValideringsFeilKode} from "../../redux/validering/valideringActionTypes";
import {replaceDotWithUnderscore} from "../../../nav-soknad/utils";

const MAX_CHARS_BEGRUNNELSE = 600;
const MAX_CHARS = 500;
const FAKTUM_KEY_HVA = "begrunnelse.hva";
const FAKTUM_KEY_HVORFOR = "begrunnelse.hvorfor";
const HVA_SOKES_OM = "hvaSokesOm";
const HVORFOR_SOKE = "hvorforSoke";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class BegrunnelseSkjema extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.clearValideringsfeil(FAKTUM_KEY_HVA);
		this.props.clearValideringsfeil(FAKTUM_KEY_HVORFOR);
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BEGRUNNELSE);
	}

	onChange(value: string, key: string) {
		const { soknadsdata } = this.props;
		if (key === HVA_SOKES_OM){
			soknadsdata.begrunnelse.hvaSokesOm = value;
		}
		if (key === HVORFOR_SOKE){
			soknadsdata.begrunnelse.hvorforSoke = value;
		}
		this.props.oppdaterSoknadsdataSti(SoknadsSti.BEGRUNNELSE, soknadsdata.begrunnelse);

		if (key === HVA_SOKES_OM){
			this.validerTekstfeltVerdi(value, FAKTUM_KEY_HVA, MAX_CHARS);
		}
		if (key === HVORFOR_SOKE) {
			this.validerTekstfeltVerdi(value, FAKTUM_KEY_HVORFOR, MAX_CHARS_BEGRUNNELSE);
		}
	}

	lagreHvisGyldig() {
		const { soknadsdata, brukerBehandlingId } = this.props;
		const { hvaSokesOm, hvorforSoke } = soknadsdata.begrunnelse;
		const feilmeldingHva: ValideringsFeilKode | undefined = this.validerTekstfeltVerdi(hvaSokesOm, FAKTUM_KEY_HVA, MAX_CHARS);
		const feilmeldingHvorfor: ValideringsFeilKode | undefined = this.validerTekstfeltVerdi(hvorforSoke, FAKTUM_KEY_HVORFOR, MAX_CHARS_BEGRUNNELSE);

		if (!feilmeldingHva && !feilmeldingHvorfor) {
			const begrunnelse: BegrunnelseType = {hvaSokesOm, hvorforSoke};
			this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.BEGRUNNELSE, begrunnelse);
		}
	}

    validerTekstfeltVerdi(verdi: string, faktumKey: string, max: number): ValideringsFeilKode | undefined {
		const feilkode: ValideringsFeilKode | undefined = maksLengde(verdi, max);
		onEndretValideringsfeil(feilkode, faktumKey, this.props.feil, () => {
			( feilkode ) ?
				this.props.setValideringsfeil(feilkode, faktumKey) :
				this.props.clearValideringsfeil(faktumKey);
		});
		return feilkode;
	}

	render() {
		const { intl, soknadsdata } = this.props;
		const begrunnelse = soknadsdata.begrunnelse;
		const faktumKeyHvaId = replaceDotWithUnderscore(FAKTUM_KEY_HVA);
		const faktumKeyHvorforId = replaceDotWithUnderscore(FAKTUM_KEY_HVORFOR)
		return (
			<div>
				<Sporsmal
					sprakNokkel={FAKTUM_KEY_HVA}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				>
					<TextareaEnhanced
						id={faktumKeyHvaId}
						placeholder={intl.formatMessage({
							id: "begrunnelse.hva.placeholder"
						})}
						onChange={(evt: any) => this.onChange(evt.target.value, HVA_SOKES_OM)}
						onBlur={() => this.lagreHvisGyldig()}
						faktumKey="begrunnelse.hva"
						labelId="begrunnelse.hva.label"
						maxLength={MAX_CHARS}
						value={begrunnelse.hvaSokesOm ? begrunnelse.hvaSokesOm : ""}
					/>
				</Sporsmal>
				<Sporsmal
					sprakNokkel={FAKTUM_KEY_HVORFOR}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				>
					<TextareaEnhanced
						id={faktumKeyHvorforId}
						placeholder={intl.formatMessage({
							id: "begrunnelse.hvorfor.placeholder"
						})}
						onChange={(evt: any) => this.onChange(evt.target.value, HVORFOR_SOKE)}
						onBlur={() => this.lagreHvisGyldig()}
						faktumKey="begrunnelse.hvorfor"
						labelId="begrunnelse.hvorfor.label"
						hideLabel={true}
						maxLength={MAX_CHARS_BEGRUNNELSE}
						value={begrunnelse.hvorforSoke ? begrunnelse.hvorforSoke : ""}
					/>
				</Sporsmal>
			</div>
		);
	}
}

export { BegrunnelseSkjema };

export default connectSoknadsdataContainer(injectIntl(BegrunnelseSkjema));
