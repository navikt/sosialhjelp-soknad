import * as React from "react";
import { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import {FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl} from "react-intl";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { Studielan } from "./StudielanTypes";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import { REST_STATUS } from "../../../../nav-soknad/types";

const FAKTUM_STUDIELAN = "inntekt.studielan";

const STUDERER_INFO_TITTEL = "informasjon.student.studielan.tittel";
const STUDERER_INFO_DEL1 = "informasjon.student.studielan.1";
const STUDERER_INFO_DEL2 = "informasjon.student.studielan.2";

type Props = SoknadsdataContainerProps  & InjectedIntlProps;

interface State {
	oppstartsModus: boolean
}

class StudielanView extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			oppstartsModus: true
		}
	}

	componentDidMount() {
		const {hentSoknadsdata, brukerBehandlingId} = this.props;
		hentSoknadsdata(brukerBehandlingId, SoknadsSti.STUDIELAN);
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
		if (this.state.oppstartsModus) {
			if (this.props.soknadsdata.restStatus.inntekt.studielan === REST_STATUS.OK) {
				this.setState({oppstartsModus: false});
			}
		}
	}

	handleClickJaNeiSpsm(verdi: boolean) {
		const {brukerBehandlingId, soknadsdata} = this.props;
		const restStatus = soknadsdata.restStatus.inntekt.studielan;
		if(restStatus === REST_STATUS.OK) {
			const studielan: Studielan | undefined = soknadsdata.inntekt.studielan;
			if(studielan){
				studielan.bekreftelse = verdi;
				this.props.oppdaterSoknadsdataSti(SoknadsSti.STUDIELAN, studielan);
				this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.STUDIELAN, studielan);
			}
		}
	}

	render() {
		const {soknadsdata} = this.props;
		const studielan: Studielan | undefined = soknadsdata.inntekt.studielan;
		const skalVises: boolean = studielan.skalVises;
		const restStatus = soknadsdata.restStatus.inntekt.studielan;
		let oppstartsModus = this.state.oppstartsModus;
		if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
			oppstartsModus = false;
		}

		const studielanSporsmal = (<div className="skjema-sporsmal">
			<JaNeiSporsmal
				visPlaceholder={oppstartsModus}
				tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_STUDIELAN)}
				faktumKey={FAKTUM_STUDIELAN}
				verdi={studielan ? studielan.bekreftelse : null}
				onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
				legendTittelStyle={LegendTittleStyle.FET_NORMAL}
			/>
			<Informasjonspanel
				synlig={studielan && studielan.bekreftelse === false}
				ikon={InformasjonspanelIkon.ELLA}
				farge={DigisosFarge.VIKTIG}
			>
				<h4 className="skjema-sporsmal__infotekst__tittel">
					<FormattedMessage id={STUDERER_INFO_TITTEL}/>
				</h4>
				<FormattedHTMLMessage id={STUDERER_INFO_DEL1}/>
				<p/>
				<FormattedHTMLMessage id={STUDERER_INFO_DEL2}/>
			</Informasjonspanel>
		</div>);
		return (
			<div>
				{skalVises && studielanSporsmal}
			</div>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(StudielanView));
