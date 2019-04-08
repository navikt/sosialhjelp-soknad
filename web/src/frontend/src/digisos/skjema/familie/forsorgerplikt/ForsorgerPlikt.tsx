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
import { REST_STATUS } from "../../../../nav-soknad/types";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class ForsorgerPliktView extends React.Component<Props, {}> {

	componentDidMount() {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.FORSORGERPLIKT);
	}

	render() {
		const { soknadsdata } = this.props;
		const ansvar = soknadsdata.familie.forsorgerplikt.ansvar;
		const antallBarn = ansvar.length;
		const restStatus = soknadsdata.restStatus.familie.forsorgerplikt;

		if (restStatus === REST_STATUS.INITIALISERT || restStatus === REST_STATUS.PENDING) {
			return (
				<Sporsmal sprakNokkel="familierelasjon.faktum">
					<TextPlaceholder style={{marginTop: "1rem"}}/>
				</Sporsmal>
			)
		}
		if (ansvar && antallBarn === 0 ) {
			return (
				<Sporsmal sprakNokkel="familierelasjon.faktum">
					<p><FormattedHTMLMessage id="familierelasjon.ingen_registrerte_barn"/></p>
				</Sporsmal>
			);
		}
		if (ansvar && antallBarn > 0) {
			return (
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
			);
		}
		return (
			<div/>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(ForsorgerPliktView));
