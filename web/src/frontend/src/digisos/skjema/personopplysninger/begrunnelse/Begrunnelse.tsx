import {
	Begrunnelse as BegrunnelseType,
	hentBegrunnelsenAction,
	oppdaterBegrunnelseAction
} from "./begrunnelseActions";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import Sporsmal, { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import { maksLengde } from "../../../../nav-soknad/validering/valideringer";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import { State } from "../../../redux/reducers";
import { setFaktumValideringsfeil } from "../../../../nav-soknad/redux/valideringActions";
import { ValideringActionKey, Valideringsfeil } from "../../../../nav-soknad/validering/types";
import { oppdaterSoknadsdataAction } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { connect } from "react-redux";
import { Feil } from "nav-frontend-skjema";

interface OwnProps {
	brukerBehandlingId?: string;
	begrunnelse?: null | BegrunnelseType;
	hentBegrunnelse?: (brukerBehandlingId: string) => void;
	oppdaterBegrunnelse?: (brukerBehandlingId: string, begrunnelse: BegrunnelseType) => void;
	nullstillValideringsfeil?: (faktumKey: string) => void;
	setFaktumValideringsfeil?: (valideringsfeil: Valideringsfeil, faktumKey: string) => void;
	oppdaterSoknadsdata?: (verdi: any) => void;
	feil?: any;
}

type Props = OwnProps & InjectedIntlProps;

const MAX_CHARS = 500;
const FAKTUM_KEY_HVA = "begrunnelse.hva";
const FAKTUM_KEY_HVORFOR = "begrunnelse.hvorfor";
const HVA_SOKES_OM = "hvaSokesOm";
const HVORFOR_SOKE = "hvorforSoke";

class BegrunnelseSkjema extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.nullstillValideringsfeil(FAKTUM_KEY_HVA);
		this.props.nullstillValideringsfeil(FAKTUM_KEY_HVORFOR);
		this.props.hentBegrunnelse(this.props.brukerBehandlingId);
	}

	onChange(value: string, key: string) {
		const begrunnelse = {};
		begrunnelse[key] = value;
		this.props.oppdaterSoknadsdata({
			begrunnelse: { ...this.props.begrunnelse, ...begrunnelse }
		});
	}

	lagreHvisGyldig() {
		const { hvaSokesOm, hvorforSoke } = this.props.begrunnelse;
		const feilmeldingHva: ValideringActionKey = this.validerTekstfeltVerdi(hvaSokesOm, FAKTUM_KEY_HVA);
		const feilmeldingHvorfor: ValideringActionKey = this.validerTekstfeltVerdi(hvaSokesOm, FAKTUM_KEY_HVORFOR);

		if (!feilmeldingHva && !feilmeldingHvorfor) {
			const begrunnelse: BegrunnelseType = {hvaSokesOm, hvorforSoke};
			this.props.oppdaterBegrunnelse(this.props.brukerBehandlingId, begrunnelse);
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

	getFeil(faktumKey: string): Feil {
		const feilkode = this.props.feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey);
		return !feilkode ? null : { feilmelding: this.props.intl.formatHTMLMessage({ id: feilkode.feilkode }) };
	}

	render() {
		return (
			<div style={{ border: "3px dotted red" }}>
				<Sporsmal
					tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_KEY_HVA)}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				>
					<TextareaEnhanced
						id="hva_sokes_det_om_textarea"
						placeholder={this.props.intl.formatMessage({
							id: "begrunnelse.hva.placeholder"
						})}
						onChange={(evt: any) => this.onChange(evt.target.value, HVA_SOKES_OM)}
						onBlur={() => this.lagreHvisGyldig()}
						faktumKey="begrunnelse.hva"
						labelId="begrunnelse.hva.label"
						maxLength={MAX_CHARS}
						value={this.props.begrunnelse[HVA_SOKES_OM]}
						getFeil={() => this.getFeil(FAKTUM_KEY_HVA)}
						getName={() => HVA_SOKES_OM}
					/>
				</Sporsmal>
				<Sporsmal
					tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_KEY_HVORFOR)}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				>
					<TextareaEnhanced
						id="begrunnelse_soknad_textarea"
						placeholder={this.props.intl.formatMessage({
							id: "begrunnelse.hvorfor.placeholder"
						})}
						onChange={(evt: any) => this.onChange(evt.target.value, HVORFOR_SOKE)}
						onBlur={() => this.lagreHvisGyldig()}
						faktumKey="begrunnelse.hvorfor"
						labelId="begrunnelse.hvorfor.label"
						hideLabel={true}
						maxLength={MAX_CHARS}
						value={this.props.begrunnelse[HVORFOR_SOKE]}
						getFeil={() => this.getFeil(FAKTUM_KEY_HVORFOR)}
						getName={() => HVORFOR_SOKE}
					/>
				</Sporsmal>
			</div>
		);
	}
}

const mapStateToProps = (state: State) => ({
	brukerBehandlingId: state.soknad.data.brukerBehandlingId,
	feil: state.validering.feil,
	begrunnelse: state.soknadsdata.begrunnelse
});

const mapDispatchToProps = (dispatch: any) => ({
	hentBegrunnelse: (brukerBehandlingId: string) => {
		dispatch(hentBegrunnelsenAction(brukerBehandlingId))
	},
	setFaktumValideringsfeil: (valideringsfeil: Valideringsfeil, faktumKey: string) => {
		dispatch(setFaktumValideringsfeil(valideringsfeil, faktumKey))
	},
	oppdaterBegrunnelse: (brukerBehandlingId: string, begrunnelse: BegrunnelseType) => {
		dispatch(oppdaterBegrunnelseAction(brukerBehandlingId, begrunnelse));
	},
	oppdaterSoknadsdata: (data: any) => {
		dispatch(oppdaterSoknadsdataAction(data))
	},
	nullstillValideringsfeil: (faktumKey: string) => {
		dispatch(setFaktumValideringsfeil(null, faktumKey));
	}
});

export {BegrunnelseSkjema as BegrunnelseView};

export default connect<{}, {}, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(injectIntl(BegrunnelseSkjema));
