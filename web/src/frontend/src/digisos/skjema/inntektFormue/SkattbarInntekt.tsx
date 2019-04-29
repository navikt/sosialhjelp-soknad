import * as React from "react";
import {FormattedMessage, FormattedNumber, FormattedDate, InjectedIntlProps, injectIntl} from "react-intl";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {SoknadsSti} from "../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class SkattbarInntekt extends React.Component<Props, {}> {

	private static renderUtbetaling(key: string, value: number) {
		return (<div className="utbetaling">
			<span><FormattedMessage id={key}/>:</span>
			<span className="verdi detaljeliste__verdi">
				<FormattedNumber value={value} minimumFractionDigits={2} maximumFractionDigits={2}/> kr
			</span>
		</div>)
	}

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.SKATTBARINNTEKT);
	}

	render() {
		const {intl, soknadsdata} = this.props;
		// TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt
		const skattbareInntekter = soknadsdata.inntekt.skattbarinntektogforskuddstrekk;
		if (skattbareInntekter.length < 1) {
			return (<div/>);
		}
		const skattbarInntekt = skattbareInntekter[0];
		const undertittel = getIntlTextOrKey(intl, "utbetalinger.inntekt.skattbar.undertittel");

		const organisasjoner = skattbarInntekt.organisasjoner.map(organisasjon => {
			const fom = <FormattedDate value={organisasjon.fom}/>;
			const tom = <FormattedDate value={organisasjon.tom}/>;
			const lenkeSti = `https://skatt.skatteetaten.no/web/innsynamelding/inntekt/${organisasjon.orgnr}
								?year=${organisasjon.tom.slice(0, 4)}&month=${organisasjon.tom.slice(5, 7)}`;

			return (
				<div key={organisasjon.orgnr} className="utbetaling blokk">
					<div className="blokk-s">
						<h4 className="blokk-null">{organisasjon.organisasjonsnavn}</h4>
						<div>Fra {fom} til {tom}</div>
					</div>
					<div className="blokk-xs">
					{organisasjon.utbetalinger.map(utbetaling => {
						return SkattbarInntekt.renderUtbetaling(utbetaling.tittel, utbetaling.belop)
					})}
					</div>
					<a className="blokk-s" href={lenkeSti} target={`skatteetaten_${organisasjon.orgnr}`}>Se detaljer hos Skatteetaten.</a>
				</div>
			)
		});

		return (
			<Ekspanderbartpanel className="ekspanderbartPanel--skattbarInntekt ekspanderbartPanel--border" apen={true} tittel={undertittel}>

				<div className="blokk-s">
					<FormattedMessage id="utbetalinger.inntekt.skattbar.oppsummering" values={{antall:organisasjoner.length}} />
				</div>

				<div className="utbetalinger blokk-s">
					{SkattbarInntekt.renderUtbetaling("utbetalinger.inntekt.skattbar.samlet.inntekt", skattbarInntekt.samletInntekt)}
					{SkattbarInntekt.renderUtbetaling("utbetalinger.inntekt.skattbar.samlet.trekk", skattbarInntekt.samletTrekk)}
				</div>

				<div className="utbetalinger">{organisasjoner}</div>

			</Ekspanderbartpanel>
		);
	}
}

export {SkattbarInntekt};

export default connectSoknadsdataContainer(injectIntl(SkattbarInntekt));