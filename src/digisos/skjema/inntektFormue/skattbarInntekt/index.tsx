import * as React from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {SkattbarInntektInfo, SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import {IntlProps} from "../../../../nav-soknad/utils";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {REST_STATUS} from "../../../../nav-soknad/types";
import {SkattbarInntekt} from "./inntektTypes";
import {Panel} from "nav-frontend-paneler";
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import SkattbarinntektForskuddstrekk from "./SkattbarinntektForskuddstrekk";

type Props = SoknadsdataContainerProps & IntlProps;

class Skatt extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.SKATTBARINNTEKT);
	}

	render() {
		const {soknadsdata} = this.props;
		const restStatus = soknadsdata.restStatus.inntekt.skattbarinntektogforskuddstrekk;
		const skattbarinntektogforskuddstrekk: SkattbarInntektInfo = soknadsdata.inntekt.skattbarinntektogforskuddstrekk;
		const visAnimerteStreker = restStatus !== REST_STATUS.OK;

		// TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt
		const inntektFraSkatteetaten: SkattbarInntekt[] = skattbarinntektogforskuddstrekk.inntektFraSkatteetaten;
		const inntektFraSkatteetatenFeilet: boolean = skattbarinntektogforskuddstrekk.inntektFraSkatteetatenFeilet;
		const tittel: JSX.Element = <h4><FormattedMessage id="utbetalinger.inntekt.skattbar.tittel"/></h4>;

		return (
			<div className={"skatt-wrapper"}>
				{inntektFraSkatteetatenFeilet && (
					<Panel
						border={true}
						className={"ytelser_panel"}
					>
						<div>
							{tittel}
							<FormattedMessage id="utbetalinger.skattbar.kontaktproblemer"/>
						</div>
					</Panel>
				)}
				{!visAnimerteStreker && inntektFraSkatteetaten && inntektFraSkatteetaten.length > 0 && (
					<Lesmerpanel
						apneTekst={"Se detaljer"}
						lukkTekst={"Lukk"}
						intro={
							<div>
								{tittel}
								<FormattedMessage id="utbetalinger.inntekt.skattbar.beskrivelse"/>
							</div>
						}
						border={true}
					>
						<div className="utbetalinger">
							<SkattbarinntektForskuddstrekk
								skattbarinntektogforskuddstrekk={inntektFraSkatteetaten}
							/>
						</div>
					</Lesmerpanel>)
				}
				{!visAnimerteStreker && !inntektFraSkatteetatenFeilet && inntektFraSkatteetaten && inntektFraSkatteetaten.length === 0 && (
					<Panel
						border={true}
						className={"ytelser_panel"}
					>
						<div>
							<h4>{tittel}</h4>
							<FormattedMessage id="utbetalinger.inntekt.skattbar.ingen"/>
						</div>
					</Panel>)
				}
				{ visAnimerteStreker &&
					<TextPlaceholder lines={3}/>
				}
			</div>
		);
	}
}

export {Skatt};

export default connectSoknadsdataContainer(injectIntl(Skatt));
