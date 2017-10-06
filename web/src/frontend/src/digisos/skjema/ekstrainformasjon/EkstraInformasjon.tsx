import * as React from "react";
import { connect } from "react-redux";
import { State } from "../../redux/reducers";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import Infoblokk from "../../../nav-soknad/components/infoblokk/index";
import { FormattedHTMLMessage } from "react-intl";
import { SynligeFaktaProps } from "../../redux/synligefakta/synligeFaktaReducer";
import InformasjonBolk from "./InformasjonBolk";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";

type Props = FaktumComponentProps & SynligeFaktaProps;

class EkstraInformasjon extends React.Component<Props, {}> {
	render() {
		const { synligefakta } = this.props;
		return (
			<div className="steg-ekstrainformasjon">
				<div className="skjema-content">
					<div className="ekstrainfo-melding">
						<Infoblokk>
							<FormattedHTMLMessage id="ekstrainfo.informasjon" />
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
