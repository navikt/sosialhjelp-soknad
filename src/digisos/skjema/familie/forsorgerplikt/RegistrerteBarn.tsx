import * as React from "react";
import { Barn } from "./ForsorgerPliktTypes";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";

type Props = SoknadsdataContainerProps  & InjectedIntlProps;

class RegistrerteBarn extends React.Component<Props, {}> {


	handleClickJaNeiSpsm(verdi: boolean, barnIndex: number) {
		const {soknadsdata, oppdaterSoknadsdataSti, lagreSoknadsdata, brukerBehandlingId} = this.props;
		const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
		const barnet = forsorgerplikt.ansvar[barnIndex];
		barnet.harDeltBosted = verdi;
		oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
		lagreSoknadsdata(brukerBehandlingId, SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
	}

	onChangeSamvaersgrad(verdi: string, barnIndex: number) {
		const {soknadsdata, oppdaterSoknadsdataSti } = this.props;
		const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
		const barnet = forsorgerplikt.ansvar[barnIndex];
		barnet.samvarsgrad = parseInt(verdi,10);
		oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
	}

	onBlur() {
		const {soknadsdata, lagreSoknadsdata, brukerBehandlingId} = this.props;
		const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
		lagreSoknadsdata(brukerBehandlingId, SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
	}

	render() {
		const {soknadsdata} = this.props;
		const barn = soknadsdata.familie.forsorgerplikt.ansvar;

		return (
			<div>
				{barn.map((barnet: Barn, index: number) =>
					<div key={index} className={(index + 1 === barn.length) ? "barn barn_siste_liste_element" : "barn"}>
							<Detaljeliste>
								<DetaljelisteElement
									tittel={<span><FormattedMessage id="kontakt.system.personalia.navn"/></span>}
									verdi={barnet.barn.navn.fulltNavn}
								/>
								<DetaljelisteElement
									tittel={<span><FormattedMessage id="familierelasjon.fodselsdato"/></span>}
									verdi={barnet.barn.fodselsdato}
								/>
								<DetaljelisteElement
									tittel={(
										<span><FormattedMessage id="familierelasjon.samme_folkeregistrerte_adresse"/></span>
									)}
									verdi={barnet.erFolkeregistrertSammen ? "Ja" : "Nei"}
								/>
								{barnet.erFolkeregistrertSammen && (
									<div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
										<JaNeiSporsmal
											id={"barn_radio_" + index}
											tekster={getFaktumSporsmalTekst(this.props.intl, "system.familie.barn.true.barn.deltbosted")}
											faktumKey={"system.familie.barn.true.barn.deltbosted"}
											verdi={barnet.harDeltBosted}
											onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi, index)}
											legendTittelStyle={LegendTittleStyle.FET_NORMAL}
										/>
									</div>
								)}
								{!barnet.erFolkeregistrertSammen && (
									<div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
										<InputEnhanced
											getName={() => "barn" + index + "_samvaersgrad"}
											id={"barn" + index + "_samvaersgrad"}
											maxLength={3}
											verdi={barnet.samvarsgrad !== null ? barnet.samvarsgrad.toString() : ""}
											onChange={(verdi: string) => this.onChangeSamvaersgrad(verdi, index)}
											onBlur={() => this.onBlur()}
											faktumKey="system.familie.barn.true.barn.grad"
											required={false}
										/>
									</div>
								)}
						</Detaljeliste>
					</div>
				)}
			</div>
		);
	}

}

export default connectSoknadsdataContainer(injectIntl(RegistrerteBarn));

