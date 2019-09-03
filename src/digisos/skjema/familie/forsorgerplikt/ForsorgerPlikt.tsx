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
import BrukerregistrerteBarn from "./BrukerregistrerteBarn";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

interface State {
	oppstartsModus: boolean
}

class ForsorgerPliktView extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			oppstartsModus: true
		}
	}

	componentDidMount() {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.FORSORGERPLIKT);
	}

	componentWillUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any) {
		const restStatus = this.props.soknadsdata.restStatus.familie.forsorgerplikt;
		if (this.state.oppstartsModus && restStatus === REST_STATUS.OK) {
			this.setState({oppstartsModus: false});
		}
	}

	render() {
		const { soknadsdata } = this.props;
		const ansvar = soknadsdata.familie.forsorgerplikt.ansvar;
		const brukerregistrertAnsvar = soknadsdata.familie.forsorgerplikt.brukerregistrertAnsvar;
		const antallBarn = ansvar.length;
		const antallBrukerregistrerteBarn = brukerregistrertAnsvar.length;
		const restStatus = soknadsdata.restStatus.familie.forsorgerplikt;
		let oppstartsModus = this.state.oppstartsModus;
		if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
			oppstartsModus = false;
		}
		if (oppstartsModus) {
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
					<BrukerregistrerteBarn/>
					{brukerregistrertAnsvar && antallBrukerregistrerteBarn > 0 && <Barnebidrag/>}
				</Sporsmal>
			);
		}
		if (ansvar && antallBarn > 0) {
			return (
				<Sporsmal
					sprakNokkel="familierelasjon.faktum"
					stil="system"
					legendTittelStyle={LegendTittleStyle.DEFAULT}
				>
					<FormattedHTMLMessage id="familierelasjon.ingress" values={{ antallBarn }}/>
					<SysteminfoMedSkjema>
						<RegistrerteBarn/>
						<BrukerregistrerteBarn/>
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
