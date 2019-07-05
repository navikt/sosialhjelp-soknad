import * as React from "react";
import {FormattedMessage, FormattedNumber, FormattedDate, InjectedIntlProps, injectIntl} from "react-intl";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import {getIntlTextOrKey} from "../../../../nav-soknad/utils";
import EkspanderbartpanelBase from "nav-frontend-ekspanderbartpanel/lib/ekspanderbartpanel-base";
import {Panel} from "nav-frontend-paneler";
import {SkjemaGruppe} from "nav-frontend-skjema";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {REST_STATUS} from "../../../../nav-soknad/types";
import {Organisasjon, SkattbarInntekt} from "./inntektTypes";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class Skatt extends React.Component<Props, {}> {

	private static renderUtbetaling(key: string, value: number, index: number) {
		return (
			<div key={`${key}-${index}`} className="utbetaling">
				<span><FormattedMessage id={key}/>:</span>
				<span className="verdi detaljeliste__verdi">
					<FormattedNumber value={value} minimumFractionDigits={2} maximumFractionDigits={2}/> kr
				</span>
			</div>
		)
	}

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.SKATTBARINNTEKT);
	}

	render() {
		const {intl, soknadsdata} = this.props;
		const restStatus = soknadsdata.restStatus.inntekt.skattbarinntektogforskuddstrekk;
		const visAnimerteStreker = restStatus !== REST_STATUS.OK;

		// TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt
		const skattbareInntekter: SkattbarInntekt[] = soknadsdata.inntekt.skattbarinntektogforskuddstrekk;

		const tittel = getIntlTextOrKey(intl, "utbetalinger.inntekt.skattbar.tittel");

		const harSkattbareInntekter: boolean = skattbareInntekter.length > 0;

		const skattbarInntekt = skattbareInntekter[0];

		let organisasjoner: JSX.Element[] = [];
		if (skattbarInntekt && skattbarInntekt.organisasjoner){
			organisasjoner = skattbarInntekt.organisasjoner.map((organisasjon: Organisasjon) => {
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
						{organisasjon.utbetalinger.map((utbetaling, index) => {
							const utbetalinger = [];
							if (utbetaling.brutto) {
								utbetalinger.push(Skatt.renderUtbetaling("Bruttoinntekt", utbetaling.brutto, index));
							}
							if (utbetaling.forskuddstrekk) {
								utbetalinger.push(Skatt.renderUtbetaling("Forskuddstrekk", utbetaling.forskuddstrekk, index));
							}
							return utbetalinger;
						})}
						</div>
						<a className="blokk-s" href={lenkeSti} target={`skatteetaten_${organisasjon.orgnr}`}>Se detaljer hos Skatteetaten.</a>
					</div>
				)
			});
		}

		return (
			<SkjemaGruppe className={"skjema-sporsmal"}>
				{!visAnimerteStreker && harSkattbareInntekter && (
								<EkspanderbartpanelBase
									heading={
										<div>
											<h4>{tittel}</h4>
											<FormattedMessage id="utbetalinger.inntekt.skattbar.beskrivelse"/>
										</div>
									}
									border={true}
									ariaTittel={intl.formatMessage({id: "utbetalinger.inntekt.skattbar.beskrivelse"})}
								>
									<div className="utbetalinger">{organisasjoner}</div>
								</EkspanderbartpanelBase>
					)
				}
				{!visAnimerteStreker && !harSkattbareInntekter && (
						<Panel>
							<div>
								<h4>{tittel}</h4>
								<FormattedMessage id="utbetalinger.inntekt.skattbar.ingen"/>
							</div>
						</Panel>
					)
				}

				{ visAnimerteStreker &&
					<TextPlaceholder lines={3}/>
				}
			</SkjemaGruppe>
		);
	}
}

export {Skatt};

export default connectSoknadsdataContainer(injectIntl(Skatt));