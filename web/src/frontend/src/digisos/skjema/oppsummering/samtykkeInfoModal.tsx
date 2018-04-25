import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import { InjectedIntlProps, injectIntl, FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { setVisBekreftInfo } from "../../../nav-soknad/redux/oppsummering/oppsummeringActions";
import { Faktum } from "../../../nav-soknad/types";
import { State } from "../../redux/reducers";
import { finnFaktum } from "../../../nav-soknad/utils";
import { getBydel, getKommune, NavEnhet } from "../../data/kommuner";
import { lesKommuner } from "../../../nav-soknad/redux/kommuner/kommuneActions";

interface StateProps {
	modalSynlig: boolean;
	fakta: Faktum[];
	navEnheter: NavEnhet[];
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class SamtykkeInfoModal extends React.Component<Props, {}> {

	componentDidMount() {
		console.warn("ant: " + this.props.navEnheter.length);
		if (this.props.navEnheter.length === 0) {
			this.props.dispatch(lesKommuner());
		}
	}

	render() {
		const { kommuneNavn, navKontorNavn } = this.finnStedsnavn();
		return (
			<NavFrontendModal
				isOpen={this.props.modalSynlig || false}
				contentLabel={this.props.intl.formatMessage({ id: "avbryt.avbryt" })}
				closeButton={true}
				onRequestClose={() => this.props.dispatch(setVisBekreftInfo(false))}
			>
				<div className="samtykke_info">
					<h1 className="typo-innholdstittel">
						<FormattedMessage id={"soknadsosialhjelp.oppsummering.bekreftInfoModal.title"} />
					</h1>
					<FormattedHTMLMessage
						id={"soknadsosialhjelp.oppsummering.bekreftInfoModal.body"}
						values={{
							kommuneNavn,
							navKontorNavn
						}}
					/>
				</div>
			</NavFrontendModal>
		);
	}

	private finnStedsnavn() {
		const kommune: Faktum = finnFaktum("personalia.kommune", this.props.fakta);
		const kommuneId: string = (kommune && kommune.lagret && kommune.lagret.value) || "";
		const kommuneNavn: string = getKommune(kommuneId, this.props.navEnheter);

		const bydel: Faktum = finnFaktum("personalia.bydel", this.props.fakta);
		const bydelId: string = (bydel && bydel.lagret && bydel.lagret.value) || "";
		let bydelsNavn = getBydel(kommuneId, bydelId, this.props.navEnheter);

		if (bydelsNavn === "") {
			bydelsNavn = kommuneNavn;
		}
		return { kommuneNavn, navKontorNavn: bydelsNavn };
	}

}

export default connect((state: State, props: any): StateProps => {
	return {
		fakta: state.fakta.data,
		modalSynlig: state.oppsummering.visBekreftInfo,
		navEnheter: state.kommuner.data,
	};
})(injectIntl(SamtykkeInfoModal));
