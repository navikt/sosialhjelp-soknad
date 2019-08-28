import Sporsmal, { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import * as React from "react";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";

class Barnebidrag extends React.Component<SoknadsdataContainerProps, {}> {

	FAKTUM_KEY = "familie.barn.true.barnebidrag";

	handleClickRadio(verdi: string) {
		const {soknadsdata, oppdaterSoknadsdataSti, brukerBehandlingId, lagreSoknadsdata} = this.props;
		const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
		forsorgerplikt.barnebidrag = verdi;
		oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
		const payload  = {
			"barnebidrag": verdi
		};
		lagreSoknadsdata(brukerBehandlingId, SoknadsSti.FORSORGERPLIKT, payload);
	}

	renderRadio(verdi: string) {
		const {soknadsdata} = this.props;
		const barnebidrag = soknadsdata.familie.forsorgerplikt.barnebidrag;
		return <RadioEnhanced
			getName={() => "familie_barnebidrag_radio_" + verdi}
			id={"familie_barnebidrag_radio_" + verdi}
			faktumKey={this.FAKTUM_KEY}
			value={verdi}
			checked={verdi === barnebidrag}
			onChange={() => this.handleClickRadio(verdi)}
		/>;
	}

	render() {

		return (
			<div className="blokk barnebidrag">
				<Sporsmal
					sprakNokkel="familie.barn.true.barnebidrag"
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				>
					{this.renderRadio("betaler")}
					{this.renderRadio("mottar")}
					{this.renderRadio("begge")}
					{this.renderRadio("ingen")}
				</Sporsmal>
			</div>
		)
	}
}

export default connectSoknadsdataContainer(Barnebidrag);
