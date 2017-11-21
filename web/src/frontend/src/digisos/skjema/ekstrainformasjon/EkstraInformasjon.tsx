import * as React from "react";
import { connect } from "react-redux";
import { State } from "../../redux/reducers";
import Infoblokk from "../../../nav-soknad/components/infoblokk/index";
import { FormattedHTMLMessage } from "react-intl";
import { SynligeFaktaProps } from "../../redux/synligefakta/synligeFaktaTypes";
import InformasjonBolk from "./InformasjonBolk";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import LoadContainer from "../../../nav-soknad/components/loadContainer/LoadContainer";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { hentSynligeFakta } from "../../redux/synligefakta/synligeFaktaActions";
import { REST_STATUS } from "../../../nav-soknad/types/restTypes";
import { hentVedleggsForventning } from "../../redux/vedlegg/vedleggActions";
import { FeatureToggles } from "../../../featureToggles";
import { getIntlText, harBrukerSvartFaktum } from "../../../nav-soknad/utils";
import { Faktum } from "../../../nav-soknad/types";

interface OwnProps {
	featureToggleBeOmLonnslippVedlegg: boolean;
	fakta: Faktum[];
}

type Props = OwnProps & SynligeFaktaProps & DispatchProps & InjectedIntlProps;

class EkstraInformasjon extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.renderIkkeBesvart = this.renderIkkeBesvart.bind(this);
		this.renderEkstrasporsmal = this.renderEkstrasporsmal.bind(this);
	}

	componentDidMount() {
		if (Object.keys(this.props.synligefakta.data).length === 0) {
			this.props.dispatch(hentSynligeFakta());
			if (this.props.featureToggleBeOmLonnslippVedlegg) {
				this.props.dispatch(hentVedleggsForventning());
			}
		}
	}

	renderIkkeBesvart() {
		return (
			<div className="steg-ekstrainformasjon">
				<DigisosSkjemaSteg steg={DigisosSteg.opplysningerbolk}>
					<div className="skjema-content">
						<div className="ekstrainfo-melding">
							<Infoblokk>
								<FormattedHTMLMessage id="opplysninger.ikkesvart" />
							</Infoblokk>
						</div>
					</div>
				</DigisosSkjemaSteg>
			</div>
		);
	}

	renderEkstrasporsmal() {
		const { data } = this.props.synligefakta;
		return (
			<div className="steg-ekstrainformasjon">
				<DigisosSkjemaSteg steg={DigisosSteg.opplysningerbolk}>
					<div className="skjema-content">
						<div className="ekstrainfo-melding">
							<Infoblokk>
								<FormattedHTMLMessage id="opplysninger.informasjon" />
							</Infoblokk>
						</div>
					</div>
					{Object.keys(data).map(key => (
						<InformasjonBolk
							id={key}
							key={key}
							tittel={this.props.intl.formatMessage({
								id: `${key}.sporsmal`
							})}
							beskrivelse={getIntlText(this.props.intl, `${key}.beskrivelse`)}
							faktumstrukturer={data[key]}
						/>
					))}
				</DigisosSkjemaSteg>
			</div>
		);
	}

	render() {
		const { data, restStatus } = this.props.synligefakta;
		let content;
		if (restStatus === REST_STATUS.OK) {
			const harBesvartFaktum = harBrukerSvartFaktum(this.props.fakta);
			if (!harBesvartFaktum && Object.keys(data).length === 0) {
				content = this.renderIkkeBesvart();
			} else {
				content = this.renderEkstrasporsmal();
			}
		}
		return <LoadContainer restStatus={restStatus}>{content}</LoadContainer>;
	}
}

export default connect((state: State) => {
	return {
		fakta: state.fakta.data,
		synligefakta: state.synligefakta,
		featureToggleBeOmLonnslippVedlegg:
			state.miljovariabler.data[FeatureToggles.beOmLonnslippVedlegg]
	};
})(injectIntl(EkstraInformasjon));
