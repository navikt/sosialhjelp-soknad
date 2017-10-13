import * as React from "react";
import { connect } from "react-redux";
import { State } from "../../redux/reducers";
import Infoblokk from "../../../nav-soknad/components/infoblokk/index";
import { FormattedHTMLMessage } from "react-intl";
import { SynligeFaktaProps } from "../../redux/synligefakta/synligeFaktaTypes";
import InformasjonBolk from "./InformasjonBolk";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";

import NavFrontendSpinner from "nav-frontend-spinner";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { hentSynligeFakta } from "../../redux/synligefakta/synligeFaktaActions";
import { REST_STATUS } from "../../../nav-soknad/types/restTypes";

type Props = SynligeFaktaProps & DispatchProps;

class EkstraInformasjon extends React.Component<Props, {}> {

	componentDidMount() {
		this.props.dispatch(hentSynligeFakta());
	}

	render() {
		const {data, restStatus} = this.props.synligefakta;
		return (
			<div className="steg-ekstrainformasjon">
				<div className="skjema-content">
					<div className="ekstrainfo-melding">
						<Infoblokk>
							<FormattedHTMLMessage id="ekstrainfo.informasjon"/>
						</Infoblokk>
					</div>
				</div>

				<DigisosSkjemaSteg steg={DigisosSteg.ekstrainfo}>
					{
						restStatus === REST_STATUS.OK ?
							Object.keys(data).map(key => (
								<InformasjonBolk id={key} key={key} faktumstrukturer={data[key]}/>
							))
							:
							<div className="ekstrainfo__spinner">
								<NavFrontendSpinner storrelse="xxl"/>
							</div>
					}
				</DigisosSkjemaSteg>
			</div>
		);
	}
}

export default connect((state: State) => {
	return {
		synligefakta: state.synligefakta,
	};
})(EkstraInformasjon);
