import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { FormattedHTMLMessage, InjectedIntlProps, injectIntl } from "react-intl";
import * as React from "react";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema";
import Barnebidrag from "./Barnebidrag";
import RegistrerteBarn from "./RegistrerteBarn";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class ForsorgerPliktView extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.FORSORGERPLIKT);
	}

	render() {
		const { soknadsdata } = this.props;
		const ansvar = soknadsdata.familie.forsorgerplikt.ansvar;
		const antallBarn = ansvar.length;
		return (
			<div style={{ border: "3px dotted red" }}>
				{ansvar && antallBarn === 0 && (
					<Sporsmal sprakNokkel="familierelasjon">
						<p><FormattedHTMLMessage id="familierelasjon.ingen_registrerte_barn"/></p>
					</Sporsmal>
				)}
				{ansvar && antallBarn > 0 && (
					<Sporsmal
						sprakNokkel="familierelasjon.faktum"
						style="system"
					    legendTittelStyle={LegendTittleStyle.DEFAULT}
					>
						<FormattedHTMLMessage id="familierelasjon.ingress" values={{ antallBarn }}/>
						<SysteminfoMedSkjema>
							<RegistrerteBarn/>
							<Barnebidrag/>
						</SysteminfoMedSkjema>
					</Sporsmal>
				)}
			</div>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(ForsorgerPliktView));
