import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import Sporsmal, { LegendTittleStyle } from "../../../nav-soknad/components/sporsmal/Sporsmal";
import { getFaktumSporsmalTekst } from "../../../nav-soknad/utils";
import RadioEnhanced from "../../../nav-soknad/faktum/RadioEnhanced";
import Underskjema from "../../../nav-soknad/components/underskjema";
import { Bosituasjon, hentBosituasjonAction, oppdaterBosituasjonAction } from "./bosituasjonActions";
import { Valideringsfeil } from "../../../nav-soknad/validering/types";
import { State } from "../../redux/reducers";
import { setFaktumValideringsfeil } from "../../../nav-soknad/redux/valideringActions";
import { oppdaterSoknadsdataAction } from "../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { connect } from "react-redux";
import { Feil } from "nav-frontend-skjema";
import InputEnhanced from "../../../nav-soknad/faktum/InputEnhanced";
import { erTall } from "../../../nav-soknad/validering/valideringer";
import { lagValideringsfeil } from "../../../nav-soknad/validering/valideringFuncUtils";

const FAKTUM_KEY_ANTALL = "bosituasjon.antallpersoner";

enum Bosituasjonsvalg {
	eier = "eier",
	leier = "leier",
	kommunal = "kommunal",
	ingen = "ingen",
	annet = "annet"
}

enum Annetvalg {
	foreldre = "annet.botype.foreldre",
	familie = "annet.botype.familie",
	venner = "annet.botype.venner",
	institusjon = "annet.botype.institusjon",
	fengsel = "annet.botype.fengsel",
	krisesenter = "annet.botype.krisesenter"
}

interface OwnProps {
	brukerBehandlingId?: string;
	bosituasjon?: Bosituasjon;
	hentBosituasjon?: (brukerBehandlingId: string) => void;
	oppdaterBosituasjon?: (brukerBehandlingId: string, bosituasjon: Bosituasjon) => void;
	setFaktumValideringsfeil?: (valideringsfeil: Valideringsfeil, faktumKey: string) => void;
	feil?: any;
}

interface OwnState {
	valgtBosituasjon: null | string;
	annetValg: null | string;
	antallPersoner: null | string;
}

type Props = OwnProps & InjectedIntlProps;

class BosituasjonView extends React.Component<Props, OwnState> {

	constructor(props: Props) {
		super(props);
		this.state = {
			valgtBosituasjon: null,
			annetValg: null,
			antallPersoner: ""
		}
	}

	componentDidMount(): void {
		this.props.hentBosituasjon(this.props.brukerBehandlingId);
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<OwnState>, snapshot?: any): void {
		const { bosituasjon } = this.props;
		if (bosituasjon && bosituasjon.botype !== prevProps.bosituasjon.botype) {
			const botype = bosituasjon.botype;
			if (Bosituasjonsvalg[botype]) {
				this.setState({valgtBosituasjon: botype});
			}
			if (Annetvalg[botype]) {
				this.setState({
					valgtBosituasjon: Bosituasjonsvalg.annet,
					annetValg: "annet.botype." + botype});
			}
		}
		if (bosituasjon && bosituasjon.antallPersoner !== prevProps.bosituasjon.antallPersoner) {
			this.setState({antallPersoner: bosituasjon.antallPersoner});
		}
	}

	handleRadioClick(verdi: string): void {
		const botype = verdi.replace("annet.botype.","");
		const { brukerBehandlingId, bosituasjon } = this.props;
		const antallPersoner = bosituasjon ? bosituasjon.antallPersoner: null;
		const oppdatertBosituasjon: Bosituasjon = {botype, antallPersoner};
		this.props.oppdaterBosituasjon(brukerBehandlingId, oppdatertBosituasjon);
		if (Bosituasjonsvalg[verdi]) {
			this.setState({valgtBosituasjon: verdi});
		}
		if(Annetvalg[botype]) {
			this.setState({annetValg: verdi});
		}
	}

	erValgt(verdi: string): boolean {
		return this.state.valgtBosituasjon === verdi || this.state.annetValg === verdi;
	}

	renderRadioknapp(id: string) {
		if(Annetvalg[id] && !this.erValgt(Bosituasjonsvalg.annet)) {
			return null;
		}
		return (<RadioEnhanced
			id={"bosituasjon_radio_" + id}
			faktumKey="bosituasjon"
			value={id}
			checked={this.erValgt(id)}
			onChange={() => this.handleRadioClick(id)}
		/>);
	}

	getFeil(): Feil {
		const intl = this.props.intl;
		const faktumKey = FAKTUM_KEY_ANTALL;
		const feilkode = this.props.feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey);
		return !feilkode ? null : { feilmelding: intl.formatHTMLMessage({ id: feilkode.feilkode }) };
	}

	onBlurAntall() {
		const { antallPersoner } = this.state;
		const valideringsfeil = this.validerAntallPersoner(antallPersoner);

		if (!valideringsfeil) {
			const { brukerBehandlingId, bosituasjon } = this.props;
			const botype = bosituasjon.botype;
			const oppdatertBosituasjon: Bosituasjon = {botype, antallPersoner};
			this.props.oppdaterBosituasjon(brukerBehandlingId, oppdatertBosituasjon);
		}
	}

	validerAntallPersoner(antallPersoner: string | null) {
		const valideringActionKey = erTall(antallPersoner, true);
		const valideringsfeil: Valideringsfeil = lagValideringsfeil(valideringActionKey, FAKTUM_KEY_ANTALL);
		this.props.setFaktumValideringsfeil(valideringsfeil, FAKTUM_KEY_ANTALL);
		return valideringsfeil;
	}

	onChangeAntall(verdi: string) {
		this.setState({antallPersoner: verdi})
	}

	render() {
		const { bosituasjon } = this.props;
		const synligUnderskjema: boolean = (this.erValgt(Bosituasjonsvalg.annet) ||
			(bosituasjon && Annetvalg[bosituasjon.botype])) ? true : false;
		return (
			<div style={{ border: "3px dotted red", display: "block" }}>
				<Sporsmal
					tekster={getFaktumSporsmalTekst(this.props.intl, "bosituasjon")}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				>
					{this.renderRadioknapp(Bosituasjonsvalg.eier)}
					{this.renderRadioknapp(Bosituasjonsvalg.leier)}
					{this.renderRadioknapp(Bosituasjonsvalg.kommunal)}
					{this.renderRadioknapp(Bosituasjonsvalg.ingen)}
					{this.renderRadioknapp(Bosituasjonsvalg.annet)}
					<div className="skjema-sporsmal--jaNeiSporsmal">
						<Underskjema
							visible={synligUnderskjema}
							arrow={true}
						>
							<Sporsmal
								tekster={getFaktumSporsmalTekst(this.props.intl, "bosituasjon")}
								legendTittelStyle={LegendTittleStyle.FET_NORMAL}
								style="system"
							>
								{this.renderRadioknapp(Annetvalg.foreldre)}
								{this.renderRadioknapp(Annetvalg.familie)}
								{this.renderRadioknapp(Annetvalg.venner)}
								{this.renderRadioknapp(Annetvalg.institusjon)}
								{this.renderRadioknapp(Annetvalg.fengsel)}
								{this.renderRadioknapp(Annetvalg.krisesenter)}
							</Sporsmal>
						</Underskjema>
					</div>
				</Sporsmal>
				<Sporsmal
					tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_KEY_ANTALL)}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				>
					<InputEnhanced
						type="tel"
						maxLength={2}
						pattern="\\d*"
						bredde={"XS"}
						className="skjemaelement__enLinje185bredde"
						verdi={this.state.antallPersoner}
						onChange={(verdi: string) => this.onChangeAntall(verdi)}
						onBlur={() => this.onBlurAntall()}
						getName={() => FAKTUM_KEY_ANTALL}
						faktumKey={FAKTUM_KEY_ANTALL}
						required={false}
						getFeil={() => this.getFeil()}
					/>
				</Sporsmal>
			</div>
		);
	}

}

const mapStateToProps = (state: State) => ({
	brukerBehandlingId: state.soknad.data.brukerBehandlingId,
	feil: state.validering.feil,
	bosituasjon: state.soknadsdata.bosituasjon
});

const mapDispatchToProps = (dispatch: any) => ({
	hentBosituasjon: (brukerBehandlingId: string) => {
		dispatch(hentBosituasjonAction(brukerBehandlingId))
	},
	setFaktumValideringsfeil: (valideringsfeil: Valideringsfeil, faktumKey: string) => {
		dispatch(setFaktumValideringsfeil(valideringsfeil, faktumKey))
	},
	oppdaterBosituasjon: (brukerBehandlingId: string, bosituasjon: Bosituasjon) => {
		dispatch(oppdaterBosituasjonAction(brukerBehandlingId, bosituasjon));
	},
	oppdaterSoknadsdata: (data: any) => {
		dispatch(oppdaterSoknadsdataAction(data))
	},
	nullstillValideringsfeil: (faktumKey: string) => {
		dispatch(setFaktumValideringsfeil(null, faktumKey));
	}
});

export {BosituasjonView};

export default connect<{}, {}, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(injectIntl(BosituasjonView));
