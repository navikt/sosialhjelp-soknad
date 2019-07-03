import * as React from "react";
import {FormattedMessage, FormattedNumber, FormattedDate, InjectedIntlProps, injectIntl} from "react-intl";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {SoknadsSti} from "../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import EkspanderbartpanelBase from "nav-frontend-ekspanderbartpanel/lib/ekspanderbartpanel-base";
import {Panel} from "nav-frontend-paneler";

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

		const tittel = getIntlTextOrKey(intl, "utbetalinger.inntekt.skattbar.tittel");

		if (skattbareInntekter.length < 1) {
			return (<Panel>
				<div>
					<h4>{tittel}</h4>
					<FormattedMessage id="utbetalinger.inntekt.skattbar.ingen"/>
				</div>
			</Panel>)
		}

		const skattbarInntekt = skattbareInntekter[0];
		const organisasjoner = skattbarInntekt.organisasjoner.map(organisasjon => {
			const fom = <FormattedDate value={organisasjon.fom!}/>;
			const tom = <FormattedDate value={organisasjon.tom!}/>;
			const lenkeSti = `https://skatt.skatteetaten.no/web/innsynamelding/inntekt/${organisasjon.orgnr}
								?year=${organisasjon.tom!.slice(0, 4)}&month=${organisasjon.tom!.slice(5, 7)}`;

			return (
				<div key={organisasjon.orgnr} className="utbetaling blokk">
					<div className="blokk-s">
						<h4 className="blokk-null">{organisasjon.organisasjonsnavn}</h4>
						<div>Fra {fom} til {tom}</div>
					</div>
					<div className="blokk-xs">
					{organisasjon.utbetalinger.map(utbetaling => {
						const utbetalinger = [];
						if (utbetaling.brutto) {
							utbetalinger.push(SkattbarInntekt.renderUtbetaling("Bruttoinntekt", utbetaling.brutto));
						}
						if (utbetaling.forskuddstrekk) {
							utbetalinger.push(SkattbarInntekt.renderUtbetaling("Forskuddstrekk", utbetaling.forskuddstrekk));
						}

						return utbetalinger;
					})}
					</div>
					<a className="blokk-s" href={lenkeSti} target={`skatteetaten_${organisasjon.orgnr}`}>Se detaljer hos Skatteetaten.</a>
				</div>
			)
		});

		return (
			<EkspanderbartpanelBase heading={
				<div>
					<h4>{tittel}</h4>
					<FormattedMessage id="utbetalinger.inntekt.skattbar.beskrivelse"/>
				</div>
			} border={true}>
				<div className="utbetalinger">{organisasjoner}</div>
			</EkspanderbartpanelBase>
		);
	}
}

export {SkattbarInntekt};

export default connectSoknadsdataContainer(injectIntl(SkattbarInntekt));