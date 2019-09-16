import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {FormattedMessage, injectIntl} from "react-intl";
import {connect} from "react-redux";
import {DispatchProps} from "../../redux/reduxTypes";
import {visSoknadAlleredeSendtPrompt} from "../../redux/ettersendelse/ettersendelseActions";
import {getContextPathForStaticContent} from "../../../configuration";
import {State} from "../../../digisos/redux/reducers";
import {IntlProps} from "../../utils";

interface StateProps {
    brukerBehandlingId: string;
    visPrompt: boolean;
}

type Props = StateProps & DispatchProps & IntlProps;

const KEY = "visSoknadAlleredeSendtPrompt";

class SoknadAlleredeSendtPromt extends React.Component<Props, {}> {
    onClose() {
        this.props.dispatch(visSoknadAlleredeSendtPrompt(false));
    }

    render() {
        const intl = this.props.intl;
        return (
            <NavFrontendModal
                isOpen={this.props.visPrompt}
                contentLabel={intl.formatMessage({id: "avbryt.avbryt"})}
                closeButton={true}
                onRequestClose={() => this.onClose()}
                shouldCloseOnOverlayClick={true}
            >
                <div className="avbrytmodal">
                    <div className="avbrytmodal__infoikon_wrapper">
                        <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_ark.svg`} alt={""}/>
                    </div>

                    <Innholdstittel className="blokk-s avbrytmodal__overskrift">
                        <FormattedMessage id={KEY + ".overskrift"}/>
                    </Innholdstittel>
                    <Normaltekst className="blokk-xxs avbrytmodal__tekst">
                        <FormattedMessage id={KEY + ".tekst"}/>
                    </Normaltekst>
                </div>
            </NavFrontendModal>
        );
    }
}

export default connect((state: State, props: any): StateProps => {
    return {
        brukerBehandlingId: state.soknad.data.brukerBehandlingId,
        visPrompt: state.ettersendelse.visSoknadAlleredeSendtPromt
    };
})(injectIntl(SoknadAlleredeSendtPromt));
