import * as React from "react";
import {FormattedMessage, FormattedNumber, InjectedIntlProps, injectIntl} from "react-intl";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {SoknadsSti} from "../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class SkattbarInntekt extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.SKATTBARINNTEKT);
	}

	render() {
		const {intl, soknadsdata} = this.props;
		const skattbarInntekt = soknadsdata.inntekt.skattbarinntektogforskuddstrekk;
		const organisasjoner = skattbarInntekt.organisasjoner.map(organisasjon => {
			const utbetalinger = organisasjon.utbetalinger.map( utbetaling => {
				return (<div key="FIXME" className="utbetaling blokk-s">
					<span><FormattedMessage id={utbetaling.tittel}/>:</span>
					<span className="verdi detaljeliste__verdi"><FormattedNumber value={utbetaling.belop}/> kr</span>
				</div>)
			});
			return (<div key={organisasjon.orgnr} className="utbetaling blokk-s">
				<h4>{organisasjon.organisasjonsnavn}</h4>
				<div> Fra {organisasjon.fom} til {organisasjon.tom}</div>
				{utbetalinger}
			</div>)
		});
		const title = getIntlTextOrKey(intl, "utbetalinger.inntekt.skattbar.undertittel");

		return (<Ekspanderbartpanel apen={true} tittel={title}>
			<FormattedMessage id="utbetalinger.inntekt.skattbar.oppsummering"/>

			<div className="utbetalinger">
				<div className="utbetaling blokk-s">
					<span><FormattedMessage id="utbetalinger.inntekt.skattbar.samlet.inntekt"/>:</span>
					<span className="verdi detaljeliste__verdi"><FormattedNumber value={skattbarInntekt.samletInntekt}/> kr</span>
				</div>
				<div className="utbetaling blokk-s">
					<span><FormattedMessage id="utbetalinger.inntekt.skattbar.samlet.trekk"/>:</span>
					<span className="verdi detaljeliste__verdi"><FormattedNumber value={skattbarInntekt.samletTrekk}/> kr</span>
				</div>
			</div>

			<div className="utbetalinger">{organisasjoner}</div>

			</Ekspanderbartpanel>);
	}
}

export {SkattbarInntekt};

export default connectSoknadsdataContainer(injectIntl(SkattbarInntekt));