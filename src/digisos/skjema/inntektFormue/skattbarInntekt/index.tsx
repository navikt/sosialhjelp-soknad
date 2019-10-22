import * as React from "react";
import {FormattedMessage, injectIntl } from "react-intl";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import {SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {getIntlTextOrKey, IntlProps} from "../../../../nav-soknad/utils";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {SkattbarInntekt} from "./inntektTypes";
import {Panel} from "nav-frontend-paneler";
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import SkattbarinntektForskuddstrekk from "./SkattbarinntektForskuddstrekk";

type Props = SoknadsdataContainerProps & IntlProps;

class Skatt extends React.Component<Props, {}> {


    componentDidMount() {
        const {behandlingsId} = this.props;
        if (behandlingsId){
            this.props.hentSoknadsdata(behandlingsId, SoknadsSti.SKATTBARINNTEKT);
        }
    }

	render() {
		const {soknadsdata, intl} = this.props;
		const restStatus = soknadsdata.restStatus.inntekt.skattbarinntektogforskuddstrekk;
		const visAnimerteStreker = restStatus !== REST_STATUS.OK;

		// TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt
		const skattbarinntektogforskuddstrekk: SkattbarInntekt[] = soknadsdata.inntekt.skattbarinntektogforskuddstrekk;
		const tittel = getIntlTextOrKey(intl, "utbetalinger.inntekt.skattbar.tittel");

		return (
			<div className={"skatt-wrapper"}>
				{!visAnimerteStreker && skattbarinntektogforskuddstrekk && skattbarinntektogforskuddstrekk.length > 0 && (
					<Lesmerpanel
						apneTekst={"Se detaljer"}
						lukkTekst={"Lukk"}
						intro={
							<div>
								<h4>{tittel}</h4>
								<FormattedMessage id="utbetalinger.inntekt.skattbar.beskrivelse"/>
							</div>
						}
						border={true}
					>
						<div className="utbetalinger">
							<SkattbarinntektForskuddstrekk
								skattbarinntektogforskuddstrekk={skattbarinntektogforskuddstrekk}
							/>
						</div>
					</Lesmerpanel>)
				}
				{!visAnimerteStreker && skattbarinntektogforskuddstrekk && skattbarinntektogforskuddstrekk.length === 0 && (
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
