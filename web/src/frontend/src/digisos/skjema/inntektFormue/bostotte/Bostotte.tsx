import * as React from "react";
import { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import { FormattedHTMLMessage, InjectedIntlProps, injectIntl } from "react-intl";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { Bostotte } from "./bostotteTypes";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import { fetchToJson } from "../../../../nav-soknad/utils/rest-utils";
import { REST_STATUS } from "../../../../nav-soknad/types";

const FAKTUM_BOSTOTTE = "inntekt.bostotte";

type Props = SoknadsdataContainerProps  & InjectedIntlProps;

interface State {
	vedleggPending: boolean,
	bostottePending: boolean
}

class BostotteView extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			vedleggPending: true,
			bostottePending: true
		}
	}

	componentDidMount(): void {
		const {brukerBehandlingId} = this.props;
		fetchToJson("sosialhjelpvedlegg/oppdaterVedlegg/" + brukerBehandlingId)
			.then((response: any) => {
				this.props.settRestStatus(SoknadsSti.OPPDATER_VEDLEGG, REST_STATUS.OK)
			});
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
		const {soknadsdata, brukerBehandlingId} = prevProps;
		const restStatusOppdaterVedlegg = soknadsdata.restStatus.oppdaterVedlegg;
		const restStatusInntektBostotte = soknadsdata.restStatus.inntekt.bostotte;
		if (this.state.vedleggPending === true) {
			if (restStatusOppdaterVedlegg === REST_STATUS.OK) {
				this.props.hentSoknadsdata(brukerBehandlingId, SoknadsSti.BOSTOTTE);
				this.setState({vedleggPending: false});
			}
		} else {
			if (prevState.bostottePending === true && restStatusInntektBostotte === REST_STATUS.OK ) {
				this.setState({bostottePending: false});
			}
		}
	}

	handleClickJaNeiSpsm(verdi: boolean) {
		if(!this.state.bostottePending) {
			const {brukerBehandlingId, soknadsdata} = this.props;
			const bostotte: Bostotte = soknadsdata.inntekt.bostotte;
			bostotte.bekreftelse = verdi;
			this.props.oppdaterSoknadsdataSti(SoknadsSti.BOSTOTTE, bostotte);
			this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.BOSTOTTE, bostotte);
		}
	}

	render() {
		const {soknadsdata} = this.props;
		const bostotte : Bostotte = soknadsdata.inntekt.bostotte;
		return (
			<div className="skjema-sporsmal">
				<JaNeiSporsmal
					visPlaceholder={this.state.bostottePending}
					tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_BOSTOTTE)}
					faktumKey={FAKTUM_BOSTOTTE}
					verdi={bostotte.bekreftelse}
					onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				/>
				<Informasjonspanel
					synlig={bostotte.bekreftelse === false}
					ikon={InformasjonspanelIkon.ELLA}
					farge={DigisosFarge.VIKTIG}
				>
					<FormattedHTMLMessage id="informasjon.husbanken.bostotte"/>
				</Informasjonspanel>
			</div>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(BostotteView));
