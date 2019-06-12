import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { fortsettSoknad, slettSoknad } from "../../redux/soknad/soknadActions";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { DispatchProps, SoknadAppState } from "../../redux/reduxTypes";
import { AVBRYT_DESTINASJON } from "../../redux/soknad/soknadActionTypes";
import { navigerTilDittNav } from "../../redux/navigasjon/navigasjonActions";
import {getAbsoluteBasename} from "../../../index";

interface StateProps {
	avbrytDialogSynlig: boolean;
	destinasjon: AVBRYT_DESTINASJON;
	brukerBehandlingId: string;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

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
			slettSoknad(this.props.brukerBehandlingId, this.props.destinasjon)
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

		return (
			<NavFrontendModal
				isOpen={this.props.avbrytDialogSynlig || false}
				contentLabel={this.props.intl.formatMessage({ id: "avbryt.avbryt" })}
				closeButton={false}
				onRequestClose={() => this.onFortsett()}
				shouldCloseOnOverlayClick={true}
			>
				<div className="avbrytmodal">
					<div className="avbrytmodal__infoikon_wrapper">
						<img src={`/${getAbsoluteBasename()}/statisk/bilder/ikon_ark.svg`}/>
					</div>

					<Innholdstittel className="blokk-s avbrytmodal__overskrift">
						<FormattedMessage id={tekst.overskrift} />
					</Innholdstittel>
					<Normaltekst className="blokk-xxs avbrytmodal__tekst">
						<FormattedMessage id={tekst.tekst} />
					</Normaltekst>
					<div className="timeoutbox__knapperad">
						<Hovedknapp
							onClick={() => this.onFortsettSenere()}
						>
							<FormattedMessage id={"avbryt.fortsettsenere"} />
						</Hovedknapp>
						<Knapp onClick={() => this.onAvbryt()} type="standard" className="avbrytmodal__slettknapp">
							<FormattedMessage id={"avbryt.slett"} />
						</Knapp>
					</div>
				</div>
			</NavFrontendModal>
		);
	}
}

export default connect((state: SoknadAppState, props: any): StateProps => {
	return {
		avbrytDialogSynlig: state.soknad.avbrytDialog.synlig,
		destinasjon: state.soknad.avbrytDialog.destinasjon,
		brukerBehandlingId: state.soknad.data.brukerBehandlingId
	};
})(injectIntl(AvbrytSoknad));
