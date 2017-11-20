import * as React from "react";
import { connect } from "react-redux";
import { State } from "../../redux/reducers";
import Infoblokk from "../../../nav-soknad/components/infoblokk/index";
import { FormattedHTMLMessage } from "react-intl";
import { SynligeFaktaProps } from "../../redux/synligefakta/synligeFaktaTypes";
import InformasjonBolk from "./InformasjonBolk";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import { injectIntl, InjectedIntlProps } from "react-intl";

import NavFrontendSpinner from "nav-frontend-spinner";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { hentSynligeFakta } from "../../redux/synligefakta/synligeFaktaActions";
import { REST_STATUS } from "../../../nav-soknad/types/restTypes";
import { hentVedleggsForventning } from "../../redux/vedlegg/vedleggActions";
import { FeatureToggles } from "../../../featureToggles";

interface OwnProps {
	featureToggleBeOmLonnslippVedlegg: boolean;
}

type Props = OwnProps & SynligeFaktaProps & DispatchProps & InjectedIntlProps;

class EkstraInformasjon extends React.Component<Props, {}> {
	componentDidMount() {
		if (Object.keys(this.props.synligefakta.data).length === 0) {
			this.props.dispatch(hentSynligeFakta());
			if (this.props.featureToggleBeOmLonnslippVedlegg) {
				this.props.dispatch(hentVedleggsForventning());
			}
		}
	}

	render() {
		const { data, restStatus } = this.props.synligefakta;
		const intl = this.props.intl;
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
					{restStatus === REST_STATUS.OK ? (
						Object.keys(data).map(key => (
							<InformasjonBolk
								id={key}
								key={key}
								tittel={intl.formatMessage({ id: `${key}.sporsmal` })}
								faktumstrukturer={data[key]}
							/>
						))
					) : (
						<div className="ekstrainfo__spinner">
							<NavFrontendSpinner type="XXL" />
						</div>
					)}
				</DigisosSkjemaSteg>
			</div>
		);
	}
}

export default connect((state: State) => {
	return {
		synligefakta: state.synligefakta,
		featureToggleBeOmLonnslippVedlegg:
			state.miljovariabler.data[FeatureToggles.beOmLonnslippVedlegg]
	};
})(injectIntl(EkstraInformasjon));
