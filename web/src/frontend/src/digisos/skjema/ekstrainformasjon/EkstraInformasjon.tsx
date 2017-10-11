import * as React from "react";
import { connect } from "react-redux";
import { State } from "../../redux/reducers";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import Infoblokk from "../../../nav-soknad/components/infoblokk/index";
import { FormattedHTMLMessage } from "react-intl";
import { SynligeFaktaProps } from "../../redux/synligefakta/synligeFaktaTypes";
import InformasjonBolk from "./InformasjonBolk";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";

import "./ekstrainfo.css";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { hentSynligeFakta } from "../../redux/synligefakta/synligeFaktaActions";

type Props = FaktumComponentProps & SynligeFaktaProps & DispatchProps;

class EkstraInformasjon extends React.Component<Props, {}> {

	componentDidMount() {
		this.props.dispatch(hentSynligeFakta());
	}

	render() {
		const {synligefakta} = this.props;
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
					{Object.keys(synligefakta).map(key => (
						<InformasjonBolk id={key} key={key} faktumstrukturer={synligefakta[key]}/>
					))}
				</DigisosSkjemaSteg>
			</div>
		);
	}
}

export default connect((state: State) => {
	return {
		fakta: state.fakta.data,
		synligefakta: state.synligefakta.data,
	};
})(EkstraInformasjon);
