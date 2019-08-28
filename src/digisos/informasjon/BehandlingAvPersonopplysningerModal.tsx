import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import { FormattedMessage, useIntl } from "react-intl";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { setVisSamtykkeInfo } from "../../nav-soknad/redux/init/initActions";
import { Knapp } from "nav-frontend-knapper";
import { finnValgtEnhetsNavn } from "../data/kommuner";
import {Soknadsdata} from "../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import {State} from "../redux/reducers";

interface StateProps {
	modalSynlig: boolean;
	soknadsdata: Soknadsdata;
}

type Props = StateProps & DispatchProps;

class BehandlingAvPersonopplysningerModal extends React.Component<Props, {}> {

	intl = useIntl();

	getText() {
		let valgtEnhetsNavn = finnValgtEnhetsNavn(this.props.soknadsdata);
		if (!valgtEnhetsNavn) {
			valgtEnhetsNavn = "$1";
		}
		let text = this.intl.messages["soknadsosialhjelp.forstesiden.bekreftInfoModal.body"].toString();
		text = text.replace(/{navkontor:(.*)}/g, valgtEnhetsNavn);
		return text;
	}

	render() {
		return (
			<NavFrontendModal
				isOpen={this.props.modalSynlig || false}
				contentLabel={this.intl.formatMessage({id: "avbryt.avbryt"})}
				closeButton={true}
				onRequestClose={() => this.props.dispatch(setVisSamtykkeInfo(false))}
				style={{
					content: {
						overflowY: 'auto'
					}
				}}
			>
				<div className="personopplysning_info">
					<div dangerouslySetInnerHTML={{__html: this.getText()}}/>
				</div>

				<div className="behandlingAvPersonopplysningerModal--lukke-knapp">
					<Knapp
						type="hoved"
						htmlType="button"
						onClick={() => this.props.dispatch(setVisSamtykkeInfo(false))}
					>
						<FormattedMessage id={"soknadsosialhjelp.forstesiden.bekreftInfoModal.lukk"}/>
					</Knapp>
				</div>
			</NavFrontendModal>
		);
	}
}

export default connect((state: State): StateProps => {
	return {
		modalSynlig: state.init.visSamtykkeInfo,
		soknadsdata: state.soknadsdata
	};
})(BehandlingAvPersonopplysningerModal);
