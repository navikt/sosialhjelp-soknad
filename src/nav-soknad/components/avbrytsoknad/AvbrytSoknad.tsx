import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { fortsettSoknad, slettSoknad } from "../../redux/soknad/soknadActions";
import { FormattedMessage, useIntl } from "react-intl";
import { connect } from "react-redux";
import {DispatchProps} from "../../redux/reduxTypes";
import { AVBRYT_DESTINASJON } from "../../redux/soknad/soknadActionTypes";
import { navigerTilDittNav } from "../../redux/navigasjon/navigasjonActions";
import {getContextPathForStaticContent} from "../../../configuration";
import {State} from "../../../digisos/redux/reducers";

interface StateProps {
	avbrytDialogSynlig: boolean;
	destinasjon: AVBRYT_DESTINASJON | null | undefined;
	brukerBehandlingId: string;
}

type Props = StateProps & DispatchProps;

const TEKSTNOKLER_VANLIG = {
	overskrift: "avbryt.overskrift",
	tekst: "avbryt.forklaring"
};

const TEKSTNOKLER_NAVIGASJON = {
	overskrift: "avbryt.navigasjon.overskrift",
	tekst: "avbryt.navigasjon.forklaring"
};

class AvbrytSoknad extends React.Component<Props, {}> {
	onAvbryt() {
		this.props.dispatch(
			slettSoknad(this.props.brukerBehandlingId, this.props.destinasjon ? this.props.destinasjon : "MINSIDE")
		);
	}

	onFortsett() {
		this.props.dispatch(fortsettSoknad());
	}

	onFortsettSenere() {
		this.props.dispatch(navigerTilDittNav());
	}

	render() {
		const tekst = {
			...this.props.destinasjon === "MINSIDE"
				? TEKSTNOKLER_VANLIG
				: TEKSTNOKLER_NAVIGASJON
		};
		const intl = useIntl();
		return (
			<NavFrontendModal
				isOpen={this.props.avbrytDialogSynlig || false}
				contentLabel={intl.formatMessage({ id: "avbryt.avbryt" })}
				closeButton={false}
				onRequestClose={() => this.onFortsett()}
				shouldCloseOnOverlayClick={true}
				style={{overflow: "visible"}}
			>
				<div className="avbrytmodal">
					<div className="avbrytmodal__infoikon_wrapper">
						<img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_ark.svg`} alt={""}/>
					</div>

					<Innholdstittel className="blokk-s avbrytmodal__overskrift">
						<FormattedMessage id={tekst.overskrift} />
					</Innholdstittel>
					<Normaltekst className="blokk-xxs avbrytmodal__tekst">
						<FormattedMessage id={tekst.tekst} />
					</Normaltekst>
					<div className="timeoutbox__knapperad">
						<Hovedknapp
							type="hoved"
							onClick={() => this.onFortsettSenere()}
						>
							<FormattedMessage id={"avbryt.fortsettsenere"} />
						</Hovedknapp>
						<Knapp
							type="hoved"
							onClick={() => this.onAvbryt()}
							className="avbrytmodal__slettknapp"
						>
							<FormattedMessage id={"avbryt.slett"} />
						</Knapp>
					</div>
				</div>
			</NavFrontendModal>
		);
	}
}

export default connect((state: State, props: any): StateProps => {
	return {
		avbrytDialogSynlig: state.soknad.avbrytDialog.synlig,
		destinasjon: state.soknad.avbrytDialog.destinasjon,
		brukerBehandlingId: state.soknad.data.brukerBehandlingId
	};
})(AvbrytSoknad);
