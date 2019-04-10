import * as React from "react";
import {InjectedIntlProps, injectIntl} from "react-intl";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {SoknadsSti} from "../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class SkattbarInntekt extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.SKATTBARINNTEKT);
	}

	render() {
		const {soknadsdata} = this.props;
		const skattbarInntekt = soknadsdata.inntekt.skattbarinntektogforskuddstrekk;
		const lonn = skattbarInntekt.lonn.map(value => {
			return (<div key="FIXME" className="utbetaling blokk-s">
				<div> Fra {value.fom} til {value.tom}</div>
				<div>Lønn<span className="verdi detaljeliste__verdi">{value.trekkpliktig}</span></div>
				<div>Arbeidsgiver<span className="verdi detaljeliste__verdi">{value.organisasjon}</span></div>
			</div>)
		});

		return (<Ekspanderbartpanel apen={true} tittel={"Utbetalt skattbar inntekt siste måned"}>
			<div>Lønn</div>
			{lonn}
		</Ekspanderbartpanel>);
	}
}

export {SkattbarInntekt};

export default connectSoknadsdataContainer(injectIntl(SkattbarInntekt));