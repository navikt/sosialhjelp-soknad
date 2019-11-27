import * as React from "react";
import {FormattedDate} from 'react-intl'
import { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {formaterIsoDato, getFaktumSporsmalTekst, IntlProps} from "../../../../nav-soknad/utils";
import { FormattedHTMLMessage, FormattedMessage, FormattedNumber, injectIntl } from "react-intl";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../redux/soknadsdata/soknadsdataReducer";
import { Bostotte } from "./bostotteTypes";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import Lesmerpanel from "nav-frontend-lesmerpanel";

const FAKTUM_BOSTOTTE = "inntekt.bostotte.sporsmal";

type Props = SoknadsdataContainerProps & IntlProps;

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
		const {hentSoknadsdata, behandlingsId} = this.props;
		if (behandlingsId){
			hentSoknadsdata(behandlingsId, SoknadsSti.BOSTOTTE);
		}
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
		if (this.state.oppstartsModus) {
			if (this.props.soknadsdata.restStatus.inntekt.bostotte === REST_STATUS.OK) {
				this.setState({oppstartsModus: false});
			}
		}
	}

	handleClickJaNeiSpsm(verdi: boolean) {
		const {behandlingsId, soknadsdata} = this.props;
		const restStatus = soknadsdata.restStatus.inntekt.bostotte;
		if(restStatus === REST_STATUS.OK && behandlingsId) {
			const bostotte: Bostotte | undefined = soknadsdata.inntekt.bostotte;
			if(bostotte){
				bostotte.bekreftelse = verdi;
				this.props.oppdaterSoknadsdataSti(SoknadsSti.BOSTOTTE, bostotte);
				this.props.lagreSoknadsdata(behandlingsId, SoknadsSti.BOSTOTTE, bostotte);
			}
		}
	}

	private static renderUtbetaling(netto: number, dato: string, mottaker: string, index: number) {
		let key = "bostotteUtbetaling_" + index;
		return (
			<div className="utbetalinger blokk-xs" key={key}>
				<div><FormattedMessage id={"inntekt.bostotte.husbanken.mottaker"} values={{"mottaker":mottaker}} /></div>
				<div className="utbetaling">
				<span><FormattedMessage id="utbetalinger.utbetaling.erutbetalt.label"/> {formaterIsoDato(dato)}</span>
				<span className="verdi detaljeliste__verdi">
					<FormattedNumber value={netto} minimumFractionDigits={2} maximumFractionDigits={2}/> kr
				</span>
				</div>
			</div>
		)
	}

	private static renderSak(key: string, dato: string, status: string, vedtaksstatus: string, vedtaksbeskrivelse: string, index: number) {
		const visningstatus = status === "VEDTATT" ?
			<FormattedMessage id={"inntekt.bostotte.husbanken.vedtaksstatus"} values={{"status":vedtaksstatus}} /> :
			<FormattedMessage id={"inntekt.bostotte.husbanken.status"} values={{"status":status}} />;
		let formatertDato = <FormattedDate value={dato} month="long" year="numeric" />;
		return (
			<div key={`${key}-${index}`} className="sak blokk-xs">
				<span className="bostotte-dato">{formatertDato}</span>
				{status !== "VEDTATT" && (
					<span>{visningstatus}</span>
				)}
				{status === "VEDTATT" && (
					<span className="bostotte-visningstatus">{visningstatus}</span>
				)}
				{status === "VEDTATT" && (
					<>
						<div className="bostotte-vedtaksbeskrivelse-innrykk">{vedtaksbeskrivelse}</div>
					</>
				)}
			</div>
		)
	}

	render() {
		const {soknadsdata} = this.props;
		const bostotte: Bostotte | undefined = soknadsdata.inntekt.bostotte;
		const restStatus = soknadsdata.restStatus.inntekt.bostotte;
		let oppstartsModus = this.state.oppstartsModus;
		if (oppstartsModus && restStatus === REST_STATUS.OK) {
			oppstartsModus = false;
		}
		const requestToHusbankenFeilet: boolean = bostotte.stotteFraHusbankenFeilet === true;
		const harBostotterUtbetalinger: boolean = bostotte.utbetalinger && bostotte.utbetalinger.length > 0;
		const harBostotterSaker: boolean = bostotte.saker && bostotte.saker.length > 0;
		return (
			<div className="blokk-xs">
				{requestToHusbankenFeilet && (
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
				)}
				{!requestToHusbankenFeilet && (<Lesmerpanel
					apneTekst={"Se detaljer"}
					lukkTekst={"Lukk"}
					intro={
						<div>
							<h4><FormattedMessage id="inntekt.bostotte.husbanken.tittel"/></h4>
							<FormattedMessage id="inntekt.bostotte.husbanken.info"/>
						</div>
					}
					border>
					<h4 className="blokk-null"><FormattedMessage id="inntekt.bostotte.husbanken.utbetalinger"/></h4>
					{!harBostotterUtbetalinger && (
						<div className="utbetalinger">
							<FormattedMessage id="inntekt.bostotte.husbanken.ingenutbetalingerfunnet"/>
						</div>
					)}
					{
						bostotte.utbetalinger.map((utbetaling, index) => {
							return BostotteView.renderUtbetaling(utbetaling.netto, utbetaling.utbetalingsdato, utbetaling.mottaker, index);
						})
					}
					<h4 className="blokk-null saksoverskrift"><FormattedMessage id="inntekt.bostotte.husbanken.saker"/></h4>
					{!harBostotterSaker && (
						<div className="sak blokk-xs">
							<FormattedMessage id="inntekt.bostotte.husbanken.ingensakerfunnet"/>
						</div>
					)}
					{
						bostotte.saker.map((sak, index) => {
							return BostotteView.renderSak("BostotteSak_" + index, sak.dato, sak.status, sak.vedtaksstatus, sak.beskrivelse, index);
						})
					}
					{(harBostotterUtbetalinger || harBostotterSaker) &&
						<a href="https://kundeforhold-bostotte.husbanken.no/esoknad-bostotte/">
							<FormattedMessage id={"inntekt.bostotte.husbanken.lenkeText"}/>
						</a>
					}
				</Lesmerpanel>)}
			</div>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(BostotteView));
