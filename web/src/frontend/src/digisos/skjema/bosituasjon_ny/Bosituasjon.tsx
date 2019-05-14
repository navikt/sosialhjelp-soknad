import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import Sporsmal, { LegendTittleStyle } from "../../../nav-soknad/components/sporsmal/Sporsmal";
import { getFaktumSporsmalTekst } from "../../../nav-soknad/utils";
import RadioEnhanced from "../../../nav-soknad/faktum/RadioEnhanced";
import Underskjema from "../../../nav-soknad/components/underskjema";
import { Bosituasjon } from "./bosituasjonTypes";
import { ValideringActionKey } from "../../../nav-soknad/validering/types";
import { SoknadsSti } from "../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import InputEnhanced from "../../../nav-soknad/faktum/InputEnhanced";
import { erTall } from "../../../nav-soknad/validering/valideringer";
import {
	connectSoknadsdataContainer, onEndretValideringsfeil,
	SoknadsdataContainerProps
} from "../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";

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

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class BosituasjonView extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BOSITUASJON);
	}

	handleRadioClick(verdi: string): void {
		const { soknadsdata, brukerBehandlingId } = this.props;
		const bosituasjon = soknadsdata.bosituasjon;
		if (verdi && verdi.indexOf("annet.botype.") !== -1){
			const botype = verdi.replace("annet.botype.","");
			bosituasjon.botype = botype;
			this.props.oppdaterSoknadsdataSti(SoknadsSti.BOSITUASJON, bosituasjon);
			this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.BOSITUASJON, bosituasjon);
		} else {
			const botype = verdi;
			bosituasjon.botype = botype;
			this.props.oppdaterSoknadsdataSti(SoknadsSti.BOSITUASJON, bosituasjon);
			this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.BOSITUASJON, bosituasjon);
		}
	}

	erValgt(verdi: string): boolean {
		verdi = verdi.replace("annet.botype.","");
		const { soknadsdata } = this.props;
		const { botype } = soknadsdata.bosituasjon;
		return botype === verdi;
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

	onBlurAntall() {
		const { brukerBehandlingId, soknadsdata } = this.props;
		const { botype, antallPersoner } = soknadsdata.bosituasjon;
		const valideringsfeil = this.validerAntallPersoner(antallPersoner);
		if (!valideringsfeil) {
			const oppdatertBosituasjon: Bosituasjon = {botype, antallPersoner};
			this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.BOSITUASJON, oppdatertBosituasjon);
			this.props.oppdaterSoknadsdataSti(SoknadsSti.BOSITUASJON, oppdatertBosituasjon);
		}
	}

	validerAntallPersoner(antallPersoner: string | null) {
		if (!antallPersoner || antallPersoner.length === 0) {
			return null;
		}
		const feilkode: ValideringActionKey = erTall(antallPersoner, true);
		onEndretValideringsfeil(feilkode, FAKTUM_KEY_ANTALL, this.props.feil, () => {
			this.props.setValideringsfeil(feilkode, FAKTUM_KEY_ANTALL);
		});
		return feilkode;
	}

	onChangeAntall(verdi: string) {
		const { soknadsdata } = this.props;
		const bosituasjon = soknadsdata.bosituasjon;
		bosituasjon.antallPersoner = verdi;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.BOSITUASJON, bosituasjon);
	}

	render() {
		const bosituasjon: Bosituasjon = this.props.soknadsdata.bosituasjon;
		let synligUnderskjema: boolean = false;
		if (this.erValgt(Bosituasjonsvalg.annet) || Annetvalg[bosituasjon.botype]) {
			synligUnderskjema = true;
		}

		const antallPersoner = bosituasjon.antallPersoner !== null && bosituasjon.antallPersoner !== undefined ? bosituasjon.antallPersoner : "";

		return (
			<div>
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
						verdi={antallPersoner}
						onChange={(verdi: string) => this.onChangeAntall(verdi)}
						onBlur={() => this.onBlurAntall()}
						getName={() => FAKTUM_KEY_ANTALL}
						faktumKey={FAKTUM_KEY_ANTALL}
						required={false}
					/>
				</Sporsmal>
			</div>
		);
	}

}

export default connectSoknadsdataContainer(injectIntl(BosituasjonView));
