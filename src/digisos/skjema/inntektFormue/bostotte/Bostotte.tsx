import * as React from "react";
import { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import {FormattedHTMLMessage, FormattedMessage, FormattedNumber, InjectedIntlProps, injectIntl} from "react-intl";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { Bostotte } from "./bostotteTypes";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import { REST_STATUS } from "../../../../nav-soknad/types";

const FAKTUM_BOSTOTTE = "inntekt.bostotte";

type Props = SoknadsdataContainerProps  & InjectedIntlProps;

interface State {
	oppstartsModus: boolean
}

class BostotteView extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			oppstartsModus: true
		}
	}

	componentDidMount() {
		const {hentSoknadsdata, brukerBehandlingId} = this.props;
		hentSoknadsdata(brukerBehandlingId, SoknadsSti.BOSTOTTE);
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
		if (this.state.oppstartsModus) {
			if (this.props.soknadsdata.restStatus.inntekt.bostotte === REST_STATUS.OK) {
				this.setState({oppstartsModus: false});
			}
		}
	}

	handleClickJaNeiSpsm(verdi: boolean) {
		const {brukerBehandlingId, soknadsdata} = this.props;
		const restStatus = soknadsdata.restStatus.inntekt.bostotte;
		if(restStatus === REST_STATUS.OK) {
			const bostotte: Bostotte | undefined = soknadsdata.inntekt.bostotte;
			if(bostotte){
				bostotte.bekreftelse = verdi;
				this.props.oppdaterSoknadsdataSti(SoknadsSti.BOSTOTTE, bostotte);
				this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.BOSTOTTE, bostotte);
			}
		}
	}

	private static renderUtbetaling(key: string, belop: number, dato: string, mottaker: string, index: number) {
		return (
			<div key={`${key}-${index}`} className="utbetaling">
				<span><FormattedMessage id={key}/>:</span>
				<span className="verdi detaljeliste__verdi">
					<FormattedNumber value={belop} minimumFractionDigits={2} maximumFractionDigits={2}/> kr
				</span>
				<span>{dato}</span>
				<span><FormattedMessage id={"inntekt.bostotte.husbanken.mottaker"} values={{"mottaker":mottaker}} /></span>
			</div>
		)
	}

	render() {
		const {soknadsdata} = this.props;
		const bostotte: Bostotte | undefined = soknadsdata.inntekt.bostotte;
		const restStatus = soknadsdata.restStatus.inntekt.bostotte;
		let oppstartsModus = this.state.oppstartsModus;
		if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
			oppstartsModus = false;
		}
		return (
			<div className="blokk-xs">
				<div className="blokk-xs">
					<span><FormattedMessage id="inntekt.bostotte.husbanken.tittel"/></span>
					<span><FormattedMessage id="inntekt.bostotte.husbanken.info"/></span>
					{
						bostotte.utbetalinger.map((utbetaling, index) => {
							return BostotteView.renderUtbetaling("Bostøtte", utbetaling.belop, utbetaling.utbetalingsdato, utbetaling.tittel, index);
						})
					}
				</div>
				<div className="skjema-sporsmal">
					<JaNeiSporsmal
						visPlaceholder={oppstartsModus}
						tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_BOSTOTTE)}
						faktumKey={FAKTUM_BOSTOTTE}
						verdi={bostotte ? bostotte.bekreftelse : null}
						onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
						legendTittelStyle={LegendTittleStyle.FET_NORMAL}
					/>
					<Informasjonspanel
						synlig={bostotte && bostotte.bekreftelse === false}
						ikon={InformasjonspanelIkon.ELLA}
						farge={DigisosFarge.VIKTIG}
					>
						<FormattedHTMLMessage id="informasjon.husbanken.bostotte"/>
					</Informasjonspanel>
				</div>
			</div>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(BostotteView));
