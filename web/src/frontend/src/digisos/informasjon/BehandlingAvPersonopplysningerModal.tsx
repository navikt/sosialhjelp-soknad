import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { setVisSamtykkeInfo } from "../../nav-soknad/redux/init/initActions";
import { State } from "../redux/reducers";
import { Hovedknapp } from "nav-frontend-knapper";
import { Faktum } from "../../nav-soknad/types/navSoknadTypes";
import { finnValgtEnhetsNavn, NavEnhet } from "../data/kommuner";

interface StateProps {
	fakta: Faktum[];
	modalSynlig: boolean;
	navEnheter: NavEnhet[];
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class BehandlingAvPersonopplysningerModal extends React.Component<Props, {}> {

	getText() {
		let valgtEnhetsNavn = finnValgtEnhetsNavn(this.props.fakta, this.props.navEnheter);

		if (!valgtEnhetsNavn) {
			valgtEnhetsNavn = "$1";
		}

		let string = this.props.intl.messages["soknadsosialhjelp.forstesiden.bekreftInfoModal.body"];
		string = string.replace(/{navkontor:(.*)}/g, valgtEnhetsNavn);
		return string;
	}

	render() {
		return (
			<NavFrontendModal
				isOpen={this.props.modalSynlig || false}
				contentLabel={this.props.intl.formatMessage({id: "avbryt.avbryt"})}
				closeButton={true}
				onRequestClose={() => this.props.dispatch(setVisSamtykkeInfo(false))}
			>
				<div className="personopplysning_info">
					<div dangerouslySetInnerHTML={{__html: this.getText()}}/>
				</div>

				<div className="timeoutbox__knapperad">
					<Hovedknapp
						onClick={() => this.props.dispatch(setVisSamtykkeInfo(false))}
					>
						<FormattedMessage id={"soknadsosialhjelp.forstesiden.bekreftInfoModal.lukk"}/>
					</Hovedknapp>
				</div>
			</NavFrontendModal>
		);
	}
}

export default connect((state: State, props: any): StateProps => {
	return {
		fakta: state.fakta.data,
		modalSynlig: state.init.visSamtykkeInfo,
		navEnheter: state.kommuner.data
	};
})(injectIntl(BehandlingAvPersonopplysningerModal));
