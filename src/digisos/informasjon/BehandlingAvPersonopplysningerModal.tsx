import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
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

type Props = StateProps & InjectedIntlProps & DispatchProps;

class BehandlingAvPersonopplysningerModal extends React.Component<Props, {}> {

	getText() {
		let valgtEnhetsNavn = finnValgtEnhetsNavn(this.props.soknadsdata);
		if (!valgtEnhetsNavn) {
			valgtEnhetsNavn = "$1";
		}
		let text = this.props.intl.messages["soknadsosialhjelp.forstesiden.bekreftInfoModal.body"];
		text = text.replace(/{navkontor:(.*)}/g, valgtEnhetsNavn);
		return text;
	}

	render() {
		return (
			<NavFrontendModal
				isOpen={this.props.modalSynlig || false}
				contentLabel={this.props.intl.formatMessage({id: "avbryt.avbryt"})}
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
})(injectIntl(BehandlingAvPersonopplysningerModal));
