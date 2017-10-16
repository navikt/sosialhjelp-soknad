import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import Icon from "nav-frontend-ikoner-assets";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { Hovedknapp } from "nav-frontend-knapper";
import { fortsettSoknad, slettSoknad } from "../../../digisos/redux/soknad/soknadActions";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { DispatchProps } from "../../redux/reduxTypes";

interface OwnProps {
	avbrytDialogSynlig: boolean;
	brukerBehandlingId: string;
	miljovariabler: string;
}

type Props = OwnProps & InjectedIntlProps & DispatchProps;

class AvbrytSoknad extends React.Component<Props, {}> {

	onAvbryt() {
		this.props.dispatch(slettSoknad(this.props.brukerBehandlingId)).then(() => {
			const dittnavKey = "dittnav.link.url";
			const dittnavUrl = this.props.miljovariabler[dittnavKey];
			window.location.href = dittnavUrl;
		});
	}

	onFortsett() {
		this.props.dispatch(fortsettSoknad());
	}

	render() {
		return (
			<NavFrontendModal
				isOpen={this.props.avbrytDialogSynlig || false}
				contentLabel={"Avbryt"}
				closeButton={false}
				onRequestClose={() => null}
			>
				<div className="avbrytmodal">
					<div className="avbrytmodal__infoikon_wrapper">
						<Icon kind="info-sirkel-orange" />
					</div>
					<div className="avbrytmodal__infoikon_wrapper">
						<div className="avbrytmodal__infoikon"/>
					</div>
					<Innholdstittel className="blokk-s avbrytmodal__overskrift">
						<FormattedMessage id={"avbryt.overskrift"} />
					</Innholdstittel>
					<div className="avbrytmodal__understrek_wrapper">
						<div className="avbrytmodal__understrek"/>
					</div>
					<Normaltekst className="blokk-xxs avbrytmodal__tekst">
						<FormattedMessage id={"avbryt.tekst"} />
					</Normaltekst>
					<Normaltekst className="blokk-xxs avbrytmodal__uthevet_tekst">
						<FormattedMessage id={"avbryt.uthevet.tekst"} />
					</Normaltekst>
					<div className="timeoutbox__knapperad">
						<Hovedknapp onClick={() => this.onAvbryt()}>
							<FormattedMessage id={"avbryt.ja"} />
						</Hovedknapp>
						<Hovedknapp onClick={() => this.onFortsett()} className="avbrytmodal__neiknapp">
							<FormattedMessage id={"avbryt.nei"} />
						</Hovedknapp>
					</div>

				</div>
			</NavFrontendModal>
		);
	}
}

export default connect((state: any, props: any) => {
	return {
		avbrytDialogSynlig: state.soknad.data.avbrytDialogSynlig,
		brukerBehandlingId: state.soknad.data.brukerBehandlingId,
		miljovariabler: state.miljovariabler.data
	};
})(injectIntl(AvbrytSoknad));
