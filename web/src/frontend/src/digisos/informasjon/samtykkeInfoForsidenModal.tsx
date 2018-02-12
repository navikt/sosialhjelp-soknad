import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import { InjectedIntlProps, injectIntl, FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { setVisSamtykkeInfo } from "../../nav-soknad/redux/init/initActions";
import { State } from "../redux/reducers";

interface StateProps {
	modalSynlig: boolean;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class SamtykkeInfoForsidenModal extends React.Component<Props, {}> {

	render() {

		return (
			<NavFrontendModal
				isOpen={this.props.modalSynlig || false}
				contentLabel={this.props.intl.formatMessage({id: "avbryt.avbryt"})}
				closeButton={true}
				onRequestClose={() => this.props.dispatch(setVisSamtykkeInfo(false))}
			>
				<div className="samtykke_info">
					<h1 className="typo-innholdstittel">
						<FormattedMessage id={"soknadsosialhjelp.forstesiden.bekreftInfoModal.title"}/>
					</h1>
					<FormattedHTMLMessage
						id={"soknadsosialhjelp.forstesiden.bekreftInfoModal.body"}
						values={{}}
					/>
				</div>
			</NavFrontendModal>
		);
	}
}

export default connect((state: State, props: any): StateProps => {
	return {
		modalSynlig: state.init.visSamtykkeInfo
	};
})(injectIntl(SamtykkeInfoForsidenModal));
